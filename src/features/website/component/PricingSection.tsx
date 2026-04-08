"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { useSubscriptionPlans } from "@/features/UserDashboard/billingPayments/hooks/useBillingPayments";

export default function PricingSection() {
  const { data, isLoading } = useSubscriptionPlans();

  const getMappedPlans = () => {
    if (!data?.data) return [];

    return data.data.map((plan, index) => {
      // Basic highlighting logic: middle plan
      const isMiddle = index === Math.floor(data.data.length / 2);

      // Translation mapping for common plan names (case-insensitive)
      const nameMapping: { [key: string]: string } = {
        basic: "חבילה בסיסית",
        standard: "חבילה סטנדרטית",
        pro: "חבילת פרו",
        premium: "חבילת פרימיום",
      };

      const translatedName = nameMapping[plan.name.toLowerCase()] || plan.name;

      // Construct feature list
      const features = [`${plan.credits} נקודות זכות כלולים`, ...plan.features];

      return {
        name: translatedName,
        tagline: plan.description || "התחילו ליצור בקלות",
        price: `$${plan.monthlyPrice}`,
        period: "לחודש",
        features: features,
        highlight: isMiddle,
        badge: isMiddle ? "הכי פופולרי" : undefined,
        buttonStyle: isMiddle
          ? "bg-white text-[#4F46E5] shadow-xl"
          : "bg-gradient-to-r from-[#00F6FF] to-[#4481EB] text-white shadow-[0_10px_20px_rgba(0,246,255,0.2)]",
      };
    });
  };

  const activePlans = getMappedPlans();

  return (
    <section id="pricing" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}

        <div className="text-center mb-16">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-[#6c63ff] px-5 py-2 text-sm font-medium text-[#6c63ff]">
            <Sparkles className="w-4 h-4" /> תמחור
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1a2b4b] mb-6 leading-tight">
            תמחור פשוט ושקוף
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl font-medium text-[#6b7280] max-w-2xl mx-auto leading-relaxed">
            התחל בחינם, שדרג כשתהיה מוכן. ללא עמלות נסתרות.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto items-stretch px-4">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-[#4F46E5]" />
              <p className="text-xl font-bold text-gray-500">
                טוען חבילות תמחור...
              </p>
            </div>
          ) : activePlans.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-xl font-bold text-gray-400">
                לא נמצאו חבילות תמחור זמינות כרגע.
              </p>
            </div>
          ) : (
            activePlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col rounded-[3rem] p-10 md:p-12 transition-all duration-500 overflow-hidden ${
                  plan.highlight
                    ? "bg-[#4F46E5] text-white shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)] scale-105 z-10"
                    : "bg-white text-[#1a2b4b] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)]"
                }`}
              >
                {/* Most Popular Badge */}
                {plan.highlight && (
                  <div className="absolute top-8 left-1/2 -translate-x-1/2">
                    <div className="bg-white/20 backdrop-blur-md text-white text-xs font-black px-5 py-1.5 rounded-full border border-white/30 tracking-tight">
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Plan Info */}
                <div className="mt-10 mb-12 text-center">
                  <h3
                    className={`text-2xl font-black mb-3 ${plan.highlight ? "text-white" : "text-[#4F46E5]"}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm font-bold min-h-[40px] leading-relaxed ${plan.highlight ? "text-indigo-100/80" : "text-gray-400"}`}
                  >
                    {plan.tagline}
                  </p>
                  <div className="mt-10 flex flex-col items-center">
                    <span className="text-5xl font-black tracking-tighter">
                      {plan.price}
                    </span>
                    <span
                      className={`text-xl font-bold mt-3 ${plan.highlight ? "text-indigo-100" : "text-[#4F46E5]"}`}
                    >
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Feature List */}
                <div className="flex-grow mb-14">
                  <ul className="space-y-6 text-right">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex flex-row-reverse items-start gap-4"
                      >
                        <div
                          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                            plan.highlight
                              ? "bg-white/10 border-white/30"
                              : "bg-indigo-50 border-indigo-100"
                          }`}
                        >
                          <Check
                            className={`w-3.5 h-3.5 ${plan.highlight ? "text-white" : "text-[#4F46E5]"}`}
                          />
                        </div>
                        <span
                          className={`flex-1 text-right font-bold text-[15px] leading-snug ${plan.highlight ? "text-white" : "text-gray-600"}`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-5 rounded-[1.5rem] font-black text-xl transition-all duration-300 ${plan.buttonStyle}`}
                >
                  צור את העיצוב שלך
                </motion.button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
