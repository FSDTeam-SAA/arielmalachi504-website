"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  useUserProfileSettings,
  useUpdateUserName,
} from "../hooks/useSettings";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export default function EditInformation() {
  const { data, isLoading, isError } = useUserProfileSettings();

  if (isLoading) {
    return (
      <section className="min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-[#5f6673] font-medium animate-pulse">
          Loading profile...
        </div>
      </section>
    );
  }

  if (isError || !data?.data) {
    return (
      <section className="min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-red-500 font-medium">
          Failed to load profile information.
        </div>
      </section>
    );
  }

  // Use a key to ensure the form resets if the data ID changes
  return <InformationForm key={data.data._id} initialData={data.data} />;
}

interface InformationFormProps {
  initialData: {
    name: string;
    email: string;
  };
}

function InformationForm({ initialData }: InformationFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateNameMutation = useUpdateUserName();

  const [name, setName] = useState(initialData.name || "");
  const [email] = useState(initialData.email || "");

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    updateNameMutation.mutate(name, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
      },
      onError: (error: unknown) => {
        if (isAxiosError(error)) {
          const message =
            error.response?.data?.message || "Failed to update profile";
          toast.error(message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      },
    });
  };

  return (
    <section className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <h1 className="mb-5 text-[34px] font-medium leading-none text-[#5f6673]">
          Edit Information
        </h1>

        <div className="space-y-5">
          {/* Personal Information */}
          <div className="rounded-lg border border-[#d9e7f2] bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)] md:p-5">
            <h2 className="mb-4 text-[28px] font-medium leading-none text-[#5f6673]">
              Personal Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[15px] font-medium text-[#7b8494]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Dow"
                  className="h-12 w-full rounded-md border border-transparent bg-[#f5f5f5] px-4 text-sm text-[#5f6673] outline-none placeholder:text-[#c1c7d0] focus:border-[#7aa7ff]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[15px] font-medium text-[#7b8494]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  placeholder="e.g. dowjohn44@gmail.com"
                  className="h-12 w-full rounded-md border border-transparent bg-[#e5e5e5] px-4 text-sm text-[#7b8494] cursor-not-allowed outline-none placeholder:text-[#c1c7d0]"
                />
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={updateNameMutation.isPending}
                className="flex h-12 w-full items-center justify-center rounded-md bg-gradient-to-r from-[#18c7df] to-[#4f8df7] text-sm font-medium text-white transition hover:opacity-95 disabled:opacity-50"
              >
                {updateNameMutation.isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="rounded-lg border border-[#d9e7f2] bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)] md:p-5">
            <h2 className="mb-4 text-[28px] font-medium leading-none text-[#5f6673]">
              Change Password
            </h2>

            <div className="space-y-4">
              <PasswordField
                label="Current Password"
                placeholder="........"
                showPassword={showCurrentPassword}
                togglePassword={() => setShowCurrentPassword((prev) => !prev)}
              />

              <PasswordField
                label="New Password"
                placeholder="........"
                showPassword={showNewPassword}
                togglePassword={() => setShowNewPassword((prev) => !prev)}
              />

              <PasswordField
                label="Confirm New Password"
                placeholder="........"
                showPassword={showConfirmPassword}
                togglePassword={() => setShowConfirmPassword((prev) => !prev)}
              />

              <button className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-gradient-to-r from-[#18c7df] to-[#4f8df7] text-sm font-medium text-white transition hover:opacity-95">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  showPassword: boolean;
  togglePassword: () => void;
}

function PasswordField({
  label,
  placeholder,
  showPassword,
  togglePassword,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-[15px] font-medium text-[#7b8494]">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="h-12 w-full rounded-md border border-transparent bg-[#f5f5f5] px-4 pr-12 text-sm text-[#5f6673] outline-none placeholder:text-[#9aa3af] focus:border-[#7aa7ff]"
        />

        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7b8494] transition hover:text-[#4b5563]"
        >
          {showPassword ? (
            <EyeOff className="h-[18px] w-[18px]" />
          ) : (
            <Eye className="h-[18px] w-[18px]" />
          )}
        </button>
      </div>
    </div>
  );
}
