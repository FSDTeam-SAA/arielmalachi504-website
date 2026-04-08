"use client";

import { CreditCard, CalendarDays, Coins, CheckCircle2 } from "lucide-react";
import { useUserProfile } from "../hooks/useBillingPayments";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import {
  getSubscriptionPlans,
  ISubscriptionPlan,
} from "../api/billingPayments.api";

export default function BillingPayments() {
  const { data: profileResponse, isLoading, isError } = useUserProfile();
  const profile = profileResponse?.data;

  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [plansLoading, setPlansLoading] = useState<boolean>(true);
  const [plansError, setPlansError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getSubscriptionPlans();
        if (response.status) {
          setPlans(response.data);
        } else {
          setPlansError(true);
        }
      } catch (error) {
        setPlansError(true);
      } finally {
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#edf4f8] p-4 md:p-6">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[460px] w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#edf4f8]">
        <div className="text-center">
          <p className="text-lg font-medium text-red-500">
            Failed to load billing information.
          </p>
          <p className="text-sm text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#edf4f8] p-4 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card
            icon={CreditCard}
            title={profile.isSubscribed ? "Active" : "Inactive"}
            label="Subscription Status"
            subtitle={profile.isSubscribed ? "Subscribed" : "Not Subscribed"}
            color="#3b82f6"
          />

          <Card
            icon={Coins}
            title={profile.credits?.toLocaleString() || "0"}
            label="Available Credits"
            subtitle="Ready to use"
            color="#10b981"
          />

          <Card
            icon={CalendarDays}
            title={
              profile.subscribedDate
                ? format(new Date(profile.subscribedDate), "MMM d, yyyy")
                : "N/A"
            }
            label="Start Date"
            subtitle="Initial subscription"
            color="#6366f1"
          />

          <Card
            icon={CalendarDays}
            title={
              profile.expiryDate
                ? format(new Date(profile.expiryDate), "MMM d, yyyy")
                : "N/A"
            }
            label="Expiry Date"
            subtitle="Renews/Expires on"
            color="#f59e0b"
          />
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <h2 className="text-[26px] font-semibold text-[#4f46e5]">
              Subscription Plans
            </h2>
            <p className="mt-1 text-sm text-[#7f8a9a]">
              Upgrade or downgrade your plan anytime
            </p>
          </div>

          {plansLoading && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[460px] w-full rounded-2xl" />
              ))}
            </div>
          )}

          {plansError && (
            <p className="text-sm font-medium text-red-500">
              Failed to load subscription plans.
            </p>
          )}

          {!plansLoading && !plansError && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <PlanCard
                  key={plan._id}
                  title={plan.name}
                  credits={plan.credits}
                  subtitle={plan.description}
                  price={`$${plan.monthlyPrice}`}
                  period="/month"
                  features={plan.features}
                  buttonText="Generate Your Design"
                  highlighted={index === 1}
                  badge={index === 1 ? "Most Popular" : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  label: string;
  subtitle?: string;
  color: string;
}

function Card({ icon: Icon, title, label, subtitle, color }: CardProps) {
  return (
    <div className="rounded-xl border border-[#d9e7f2] bg-white p-5 shadow-[0_6px_18px_rgba(39,93,143,0.08)]">
      <div className="mb-4 flex items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f3f7ff]">
          <Icon className="h-4 w-4 text-[#5d72ff]" />
        </div>
      </div>

      <h3 className="text-[22px] font-medium leading-none" style={{ color }}>
        {title}
      </h3>

      <div className="mt-3">
        <p className="text-[15px] font-medium text-[#6b7280]">{label}</p>
        {subtitle && (
          <p className="mt-1 text-[12px] text-[#9ca3af]">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

interface PlanCardProps {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  badge?: string;
  credits: number;
}

function PlanCard({
  title,
  subtitle,
  price,
  period,
  features,
  credits,
  buttonText,
  highlighted = false,
  badge,
}: PlanCardProps) {
  return (
    <div
      className={[
        "relative rounded-[18px] border p-5 md:p-6 transition-all duration-300",
        highlighted
          ? "border-transparent bg-gradient-to-b from-[#5a5af6] to-[#3d39c9] text-white shadow-[0_24px_50px_rgba(79,70,229,0.32)] lg:scale-[1.03]"
          : "border-[#8f90ff] bg-white text-[#1f2937] shadow-sm",
      ].join(" ")}
    >
      {highlighted && badge && (
        <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
          {badge}
        </div>
      )}

      <div>
        <h3
          className={`text-[30px] font-semibold leading-none ${
            highlighted ? "text-white" : "text-[#4f46e5]"
          }`}
        >
          {title}
        </h3>

        <p
          className={`mt-3 text-sm leading-6 ${
            highlighted ? "text-white/80" : "text-[#7f8a9a]"
          }`}
        >
          {subtitle}
        </p>
      </div>

      <div className="mt-8 flex items-end gap-1">
        <span
          className={`text-[54px] font-semibold leading-none ${
            highlighted ? "text-white" : "text-[#4f46e5]"
          }`}
        >
          {price}
        </span>
        <span
          className={`mb-1 text-[20px] font-medium ${
            highlighted ? "text-white" : "text-[#4f46e5]"
          }`}
        >
          {period}
        </span>
      </div>

      <p
        className={`mt-4 text-[16px] font-medium ${
          highlighted ? "text-white" : "text-[#4f46e5]"
        }`}
      >
        {credits} Credits included
      </p>

      <div className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle2
              className={`mt-1 h-4 w-4 shrink-0 ${
                highlighted ? "text-white" : "text-[#6b6dff]"
              }`}
            />
            <p
              className={`text-sm leading-6 ${
                highlighted ? "text-white/90" : "text-[#6b7280]"
              }`}
            >
              {feature}
            </p>
          </div>
        ))}
      </div>

      <button
        className={[
          "mt-8 h-12 w-full rounded-lg text-sm font-medium transition-all duration-300",
          highlighted
            ? "bg-white text-[#4f46e5] hover:bg-white/90"
            : "bg-gradient-to-r from-[#11c5df] to-[#5d74f8] text-white hover:opacity-95",
        ].join(" ")}
      >
        {buttonText}
      </button>
    </div>
  );
}
