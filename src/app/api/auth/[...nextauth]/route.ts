import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ILoginResponse } from "@/features/auth/types/auth.types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
    error?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    token: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data: ILoginResponse = await res.json();
          console.log("API Login Response:", JSON.stringify(data, null, 2));

          if (!res.ok || !data.status) {
            throw new Error(data.message || "Login failed");
          }

          const userData = data.data?.user;
          const accessToken = data.data?.accessToken;

          if (!userData || !accessToken) {
            throw new Error("Invalid response from server");
          }

          // Return the object that NextAuth will use as 'user' in the jwt callback
          return {
            id: userData._id,
            name: userData.email.split("@")[0], // Fallback name if missing
            email: userData.email,
            image: userData.profileImage,
            role: userData.role,
            token: accessToken,
            refreshToken: userData.refreshToken,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Invalid email or password";
          throw new Error(errorMessage);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 60 * 60 * 1000, // Default 1 hour expiry
        };
      }

      // Update session trigger
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      try {
        const refreshedTokens = await refreshAccessToken(token.refreshToken);

        if (!refreshedTokens.status) {
          throw refreshedTokens;
        }

        return {
          ...token,
          accessToken: refreshedTokens.data.accessToken,
          accessTokenExpires: Date.now() + 60 * 60 * 1000, // Update expiration
          refreshToken: refreshedTokens.data.refreshToken || token.refreshToken, // Fallback to old refresh token
        };
      } catch (error) {
        console.error("Error refreshing access token", error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          role: token.role,
        };
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.error = token.error as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error("RefreshAccessTokenError", error);
    return {
      status: false,
      message: "Failed to refresh access token",
    };
  }
}

export { handler as GET, handler as POST };
