"use client";

import React, { useRef, useState } from "react";
import {
  Type,
  Sparkles,
  Palette,
  Paintbrush,
  Check,
  ArrowLeft,
  ImagePlus,
  X,
  UploadCloud,
  Download,
  Languages,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useInitiateLogo, useLogoResult } from "../hooks/useLogo";

type FormDataType = {
  brandName: string;
  tagline: string;
  logoVision: string;
};

const industries = [
  "Restaurant / Food",
  "Fashion & Beauty",
  "Technology",
  "Fitness & Health",
  "Real Estate",
  "Education",
  "Finance",
  "Creative Agency",
  "Retail / Shop",
  "Other",
];

const logoStyles = [
  {
    title: "Wordmark",
    subtitle: "Text-based logo",
    icon: "Aa",
    bg: "bg-[#e8f5f3]",
  },
  {
    title: "Lettermark",
    subtitle: "Initials only",
    icon: "AB",
    bg: "bg-[#fdeff4]",
  },
  {
    title: "Icon + Text",
    subtitle: "Symbol with name",
    icon: "⚡ T",
    bg: "bg-[#f4f8df]",
  },
  {
    title: "Emblem",
    subtitle: "Badge/seal style",
    icon: "✹",
    bg: "bg-[#fff4ec]",
  },
  {
    title: "Abstract",
    subtitle: "Geometric shape",
    icon: "✦",
    bg: "bg-[#e8f0ff]",
  },
  {
    title: "Mascot",
    subtitle: "Character-based",
    icon: "◫",
    bg: "bg-[#f7eef9]",
  },
];

const palettePresets = [
  {
    name: "Ocean Blue",
    colors: ["#2B50B8", "#4C8CF0", "#BFD8FF"],
  },
  {
    name: "Sunset",
    colors: ["#E52420", "#FF7A00", "#F3D35B"],
  },
  {
    name: "Forest",
    colors: ["#147A3D", "#2EBE5A", "#A8D94D"],
  },
  {
    name: "Royal",
    colors: ["#4C229A", "#7A56E0", "#C9BFF5"],
  },
  {
    name: "Monochrome",
    colors: ["#C40039", "#D93C7F", "#E765B2"],
  },
  {
    name: "Monochrome",
    colors: ["#0F172A", "#6B7280", "#E5E7EB"],
  },
];

export default function LogoDesign() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);

  const { mutate: initiateLogo, isPending: isInitiating } = useInitiateLogo();
  const { data: resultData, isError } = useLogoResult(generationId);
  const generationStatus = resultData?.data?.status;
  const isSuccessful = !!resultData?.data?.success;
  const isProcessing =
    !!generationId &&
    !isError &&
    !isSuccessful &&
    (!generationStatus || generationStatus === "processing");
  const resultUrls: string[] = useMemo(
    () => resultData?.data?.resultUrls || [],
    [resultData],
  );
  const [userSelectedLogoUrl, setUserSelectedLogoUrl] = useState<string | null>(
    null,
  );

  // Derive selectedLogoUrl from results and user selection
  const selectedLogoUrl = useMemo(() => {
    if (userSelectedLogoUrl && resultUrls.includes(userSelectedLogoUrl)) {
      return userSelectedLogoUrl;
    }
    return resultUrls[0] || null;
  }, [userSelectedLogoUrl, resultUrls]);

  const handleDownload = async () => {
    if (!selectedLogoUrl) return;
    try {
      const response = await fetch(selectedLogoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `logo-${generationId || "design"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const [language, setLanguage] = useState("en");

  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [referenceImagePreview, setReferenceImagePreview] = useState<
    string | null
  >(null);

  const [formData, setFormData] = useState<FormDataType>({
    brandName: "",
    tagline: "",
    logoVision: "",
  });

  const [selectedIndustry, setSelectedIndustry] = useState("Restaurant / Food");
  const [selectedStyle, setSelectedStyle] = useState("Wordmark");
  const [selectedPalette, setSelectedPalette] = useState("Ocean Blue");

  const [customColors, setCustomColors] = useState([
    { color: "#4C8CF0", hex: "#4695FA" },
    { color: "#E52420", hex: "#E52420" },
    { color: "#7A56E0", hex: "#7A56E0" },
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (referenceImagePreview) {
      URL.revokeObjectURL(referenceImagePreview);
    }

    setReferenceImage(file);
    const imageUrl = URL.createObjectURL(file);
    setReferenceImagePreview(imageUrl);
  };

  const handleRemoveImage = () => {
    if (referenceImagePreview) {
      URL.revokeObjectURL(referenceImagePreview);
    }
    setReferenceImage(null);
    setReferenceImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveColor = (index: number) => {
    setCustomColors((prev) => prev.filter((_, i) => i !== index));
  };
  const handleAddColor = () => {
    if (customColors.length < 3) {
      setCustomColors((prev) => [
        ...prev,
        { color: "#4C8CF0", hex: "#4695FA" },
      ]);
    }
  };

  const handleColorChange = (index: number, value: string) => {
    setCustomColors((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              color: value,
              hex: value.toUpperCase(),
            }
          : item,
      ),
    );
  };

  const handleGenerateLogo = () => {
    const palette = palettePresets.find((p) => p.name === selectedPalette);
    const paletteColors = palette ? palette.colors.join(",") : "";

    const enabledCustomColors = customColors.map((c) => c.color).join(",");

    const colorPalette = enabledCustomColors || paletteColors;

    const formDataObj = new FormData();
    formDataObj.append("brand_name", formData.brandName);
    formDataObj.append("tagline", formData.tagline);
    formDataObj.append("vision", formData.logoVision);
    formDataObj.append("industry", selectedIndustry);
    formDataObj.append("logo_style", selectedStyle);
    formDataObj.append("color_palette", colorPalette);
    formDataObj.append("language", language);

    if (referenceImage) {
      formDataObj.append("reference_image", referenceImage);
    }

    setGenerationId(null);
    initiateLogo(formDataObj, {
      onSuccess: (response) => {
        if (response?.data?.generationId) {
          setGenerationId(response.data.generationId);
        }
      },
    });
  };

  return (
    <section className="min-h-screen  p-4 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-5 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6b7280] shadow-sm transition hover:bg-[#f1f5f9] hover:text-[#4f79e8] hover:shadow-md"
          >
            <ArrowLeft className="h-5 w-5 cursor-pointer" />
          </button>
          <h1 className="text-[24px] font-bold text-[#1f2a44]">Logo Maker</h1>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1fr]">
          {/* LEFT SIDE */}
          <div className="space-y-4">
            {/* Upload Image */}

            {/* <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
                            <div className="mb-3 flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                                <ImagePlus className="h-4 w-4 text-[#5b8def]" />
                                <span>Upload Reference Image (Optional)</span>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />

                            <div className="relative overflow-hidden rounded-xl border border-dashed border-[#cfe1f0] bg-gradient-to-br from-[#f4f9fd] to-[#eef6ff]">
                                {referenceImagePreview ? (
                                    <div className="relative h-[180px] sm:h-[220px]">
                                        <Image
                                            src={referenceImagePreview}
                                            alt="Reference logo"
                                            fill
                                            className="object-contain p-4"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#0b2c34]/80 text-white transition hover:bg-[#0b2c34]"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex h-[180px] w-full flex-col items-center justify-center gap-3 sm:h-[220px]"
                                    >
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
                                            <UploadCloud className="h-6 w-6 text-[#5b8def]" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-[#51606d]">
                                                Click to upload a reference image
                                            </p>
                                            <p className="mt-1 text-xs text-[#91a0ae]">
                                                PNG, JPG, JPEG supported
                                            </p>
                                        </div>
                                    </button>
                                )}
                            </div>

                            {referenceImagePreview && (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#eef5ff] px-4 py-2 text-sm font-medium text-[#4f79e8] transition hover:bg-[#e3eeff]"
                                >
                                    <UploadCloud className="h-4 w-4" />
                                    Change Image
                                </button>
                            )}
                        </div> */}

            {/* Brand Information */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                <Type className="h-4 w-4 text-[#c185ff]" />
                <span>Brand Information</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                    Company / Brand Name
                  </label>
                  <input
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. Marco's Pizza"
                    className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                    Tagline
                  </label>
                  <input
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. Authentic Italian Taste"
                    className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Describe Your Logo Vision */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                <Sparkles className="h-4 w-4 text-[#65d67f]" />
                <span>Describe Your Logo Vision</span>
              </div>

              <div>
                <textarea
                  name="logoVision"
                  value={formData.logoVision}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="e.g. A modern, sleek logo for an Italian pizza restaurant. Use warm red and orange tones. Include a pizza slice icon. The typography should be bold and welcoming. Make it suitable for social media profiles."
                  className="w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 py-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                />
              </div>

              <p className="mt-3 text-[11px] text-[#8d9399]">
                Be as specific as possible for best results.
              </p>
            </div>

            {/* Industry */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                <Sparkles className="h-4 w-4 text-[#ff8a65]" />
                <span>Industry</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    type="button"
                    onClick={() => setSelectedIndustry(industry)}
                    className={`rounded-lg px-3 py-2 text-[12px] transition ${
                      selectedIndustry === industry
                        ? "bg-[#eef5ff] text-[#4f79e8] ring-1 ring-[#b7d0ff]"
                        : "bg-[#f7f7f7] text-[#848b92] hover:bg-[#f1f5f9]"
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
            {/* Target Language */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                <Languages className="h-4 w-4 text-[#4f79e8]" />
                <span>Target Language</span>
              </div>

              <div className="grid grid-cols-2 gap-3 cursor-pointer">
                {[
                  { id: "en", label: "English", icon: "" },
                  { id: "he", label: "Hebrew (עברית)", icon: "" },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setLanguage(lang.id)}
                    className={`flex items-center justify-between rounded-xl p-3 px-4 transition cursor-pointer ${
                      language === lang.id
                        ? "bg-[#eef5ff] text-[#4f79e8] ring-1 ring-[#b7d0ff]"
                        : "bg-[#f7f7f7] text-[#848b92] hover:bg-[#f1f5f9]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[18px]">{lang.icon}</span>
                      <span className="text-[13px] font-medium">
                        {lang.label}
                      </span>
                    </div>
                    {language === lang.id && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4f79e8] text-white">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Logo Style */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                  <Paintbrush className="h-4 w-4 text-[#c185ff]" />
                  <span>Logo Style</span>
                </div>
                <span className="text-[12px] font-medium text-[#b7bec6]">
                  Optional
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {logoStyles.map((style) => (
                  <button
                    key={style.title}
                    type="button"
                    onClick={() => setSelectedStyle(style.title)}
                    className={`rounded-xl p-4 text-left transition hover:scale-[1.01] hover:shadow-sm ${
                      style.bg
                    } ${
                      selectedStyle === style.title
                        ? "ring-2 ring-[#5d72ff]"
                        : "ring-1 ring-transparent"
                    }`}
                  >
                    <p className="text-[13px] font-semibold text-[#555]">
                      {style.icon}
                    </p>
                    <h4 className="mt-2 text-[14px] font-semibold text-[#3d4a54]">
                      {style.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-[#7f8a93]">
                      {style.subtitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color palette */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                  <Palette className="h-4 w-4 text-[#f265a8]" />
                  <span>Color palette</span>
                </div>
                <span className="text-[12px] font-medium text-[#b7bec6]">
                  Optional
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {palettePresets.map((preset) => (
                  <button
                    key={preset.name + preset.colors.join("")}
                    type="button"
                    onClick={() => setSelectedPalette(preset.name)}
                    className={`rounded-xl border bg-white p-3 text-left shadow-[0_6px_16px_rgba(44,87,140,0.04)] transition hover:shadow-[0_8px_18px_rgba(44,87,140,0.08)] ${
                      selectedPalette === preset.name
                        ? "border-[#8cb7ff] ring-2 ring-[#cfe0ff]"
                        : "border-[#dbe6f0]"
                    }`}
                  >
                    <p className="mb-3 text-[13px] font-medium text-[#4b5563]">
                      {preset.name}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {preset.colors.map((color) => (
                        <div
                          key={color}
                          className="h-6 rounded-md"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-[#dbe6f0] bg-white p-4 shadow-[0_6px_16px_rgba(44,87,140,0.04)]">
                <div className="flex flex-col gap-3">
                  {customColors.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="color"
                        value={item.color}
                        onChange={(e) =>
                          handleColorChange(index, e.target.value)
                        }
                        className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                      />

                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={item.hex}
                          onChange={(e) =>
                            handleColorChange(index, e.target.value)
                          }
                          className="h-[42px] w-full rounded-lg border border-[#dbe6f0] bg-[#fafbfc] px-4 text-[13px] font-medium text-[#444] outline-none transition focus:border-[#4b8df8] focus:bg-white"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-[#b0b8c1]">
                          HEX
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveColor(index)}
                        className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-lg border border-[#fee2e2] bg-[#fff5f5] text-[#f87171] transition hover:bg-[#fee2e2] hover:text-[#ef4444]"
                      >
                        <Trash2 className="h-4 w-4 cursor-pointer" />
                      </button>
                    </div>
                  ))}

                  {customColors.length < 3 && (
                    <button
                      type="button"
                      onClick={handleAddColor}
                      className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#dbe6f0] py-4 text-[13px] font-medium text-[#7c8691] transition hover:border-[#4b8df8] hover:bg-[#f0f7ff] hover:text-[#4b8df8]"
                    >
                      <Plus className="h-4 w-4" />
                      Add Another Color
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="button"
              onClick={handleGenerateLogo}
              disabled={
                isInitiating ||
                generationStatus === "processing" ||
                !formData.brandName
              }
              className={`inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1fd2ea] via-[#39a9f5] to-[#5d72ff] text-[16px] font-semibold text-white shadow-[0_10px_20px_rgba(80,130,255,0.22)] transition hover:scale-[1.01] hover:opacity-95 ${
                isInitiating ||
                generationStatus === "processing" ||
                !formData.brandName
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer"
              }`}
            >
              {isInitiating || generationStatus === "processing" ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isInitiating || generationStatus === "processing"
                ? "Generating..."
                : "Generate Logo"}
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
            <div className="mb-4 text-[14px] font-medium text-[#6b7280]">
              Preview Output
            </div>

            <div className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[#dce6ef] bg-white sm:min-h-[520px] xl:min-h-[760px]">
              {/* Main Preview */}
              <div className="relative flex-1 bg-[#f8fafc] overflow-hidden">
                {selectedLogoUrl ? (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedLogoUrl}
                        alt="Generated logo"
                        fill
                        priority
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-10 text-center text-[#b8bcc2]">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                      <Palette className="h-8 w-8 opacity-40" />
                    </div>
                    <p className="text-[14px] font-medium text-[#8a8f96]">
                      Your logo will appear here
                    </p>
                    <p className="mt-1 text-[12px] text-[#c0c4ca]">
                      Enter your company name and click Generate
                    </p>
                  </div>
                )}
              </div>

              {/* Actions & Gallery */}
              {resultUrls.length > 0 && (
                <div className="border-t border-[#edf2f7] p-5">
                  <button
                    onClick={handleDownload}
                    className="mb-4 flex w-full items-center justify-center gap-2 cursor-pointer rounded-xl bg-[#4b8df8] py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#3b7de8]"
                  >
                    Download
                    <Download className="h-4 w-4" />
                  </button>

                  {/* <p className="mb-6 text-center text-[13px] text-[#8a939a]">
                                        You can regenerate this design up to 3 times.
                                    </p> */}

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {resultUrls.map((url, idx) => (
                      <button
                        key={idx}
                        onClick={() => setUserSelectedLogoUrl(url)}
                        className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                          selectedLogoUrl === url
                            ? "border-[#4b8df8] ring-2 ring-[#4b8df8]/20"
                            : "border-[#e2e8f0] hover:border-[#cbd5e0]"
                        }`}
                      >
                        <Image
                          src={url}
                          alt={`Logo option ${idx + 1}`}
                          fill
                          className="object-contain p-2"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Modal Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-[420px] rounded-3xl bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#39a9f5] border-t-transparent"></div>
                <div className="absolute inset-2 animate-spin-reverse rounded-full border-[3px] border-[#1fd2ea] border-t-transparent opacity-60"></div>
                <Sparkles className="h-8 w-8 text-[#39a9f5]" />
              </div>

              <h3 className="text-[20px] font-bold text-[#1f2a44]">
                Generating your logo
              </h3>
              <p className="mt-2 text-[14px] text-[#6b7280]">
                Our AI is crafting your brand identity...
              </p>

              <div className="mt-8 overflow-hidden rounded-full bg-[#f1f5f9]">
                <div className="h-1.5 animate-progress-loading rounded-full bg-gradient-to-r from-[#1fd2ea] to-[#5d72ff]"></div>
              </div>

              <p className="mt-4 text-[12px] text-[#94a3b8]">
                This usually takes about 30-60 seconds.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
