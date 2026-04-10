"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  ImagePlus,
  Sparkles,
  Wand2,
  Palette,
  RotateCcw,
  X,
  UploadCloud,
  ArrowLeft,
  Loader2,
  Download,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useAiGenerateFields,
  useInitiatePoster,
  usePosterResult,
} from "../hooks/usePosterDesign";
import CustomizeBrandKit from "./CustomizeBrandKit";

type FormDataType = {
  headline: string;
  subHeadline: string;
  designStylePrompt: string;
  cta: string;
  phoneNumber: string;
  address: string;
  website: string;
  businessDescription: string;
  width: string;
  height: string;
};

type ColorEntry = { color: string; hex: string };

const stylePresets = [
  {
    title: "Modern Minimal",
    description: "Clean lines, lots of white space",
    bg: "bg-[#eef7f4]",
  },
  {
    title: "Bold & Vibrant",
    description: "Strong colors, high contrast",
    bg: "bg-[#fdeff4]",
  },
  {
    title: "Dark Tech",
    description: "Futuristic, sleek dark theme",
    bg: "bg-[#f5f8e8]",
  },
  {
    title: "Fun & Playful",
    description: "Bright colors, rounded shapes",
    bg: "bg-[#fff4ec]",
  },
  {
    title: "Corporate Blue",
    description: "Professional, trustworthy",
    bg: "bg-[#edf4ff]",
  },
  {
    title: "Luxury Premium",
    description: "Dark tones, gold accents",
    bg: "bg-[#f7eef9]",
  },
];

const outputFormats = [
  {
    title: "1:1 Square",
    description: "Instagram Feed",
    bg: "bg-[#e8f5f3]",
    value: "1:1 square",
  },
  {
    title: "9:16 Story",
    description: "Instagram/FB Story",
    bg: "bg-[#f4f8df]",
    value: "9:16 story",
  },
  {
    title: "16:9 Square",
    description: "Facebook/Twitter",
    bg: "bg-[#f8ece5]",
    value: "16:9 landscape",
  },
  {
    title: "4:5 Portrait",
    description: "Instagram Portrait",
    bg: "bg-[#e8f0ff]",
    value: "4:5 portrait",
  },
];

const languageOptions = [
  { id: "hebrew", label: "Hebrew" },
  { id: "english", label: "English" },
];

export default function PosterDesign() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [userSelectedPosterUrl, setUserSelectedPosterUrl] = useState<
    string | null
  >(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [brandKitEnabled, setBrandKitEnabled] = useState(true);
  const [creditsEnabled, setCreditsEnabled] = useState(true);
  const [isBrandKitModalOpen, setIsBrandKitModalOpen] = useState(false);
  const [language, setLanguage] = useState("hebrew");
  const [variations, setVariations] = useState(1);

  const [selectedStyle, setSelectedStyle] = useState("Modern Minimal");
  const [selectedFormat, setSelectedFormat] = useState(outputFormats[0]);

  // Brand Kit state — lifted so generate can use them
  const [brandName, setBrandName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [colors, setColors] = useState<ColorEntry[]>([
    { color: "#4C8CF0", hex: "#4C8CF0" },
    { color: "#E52420", hex: "#E52420" },
  ]);

  const [formData, setFormData] = useState<FormDataType>({
    headline: "",
    subHeadline: "",
    designStylePrompt: "",
    cta: "",
    phoneNumber: "",
    address: "",
    website: "",
    businessDescription: "",
    width: "400px",
    height: "600px",
  });

  // Poster result polling
  const { data: resultData, isError } = usePosterResult(generationId);
  const isSuccessful = !!resultData?.data?.success;
  const isProcessing = !!generationId && !isError && !isSuccessful;

  const resultUrls: string[] = useMemo(
    () => resultData?.data?.resultUrls || [],
    [resultData],
  );

  const selectedPosterUrl = useMemo(() => {
    if (userSelectedPosterUrl && resultUrls.includes(userSelectedPosterUrl)) {
      return userSelectedPosterUrl;
    }
    return resultUrls[0] || null;
  }, [userSelectedPosterUrl, resultUrls]);

  // Hooks
  const aiGenerateMutation = useAiGenerateFields((data) => {
    setFormData((prev) => ({
      ...prev,
      headline: data.title || prev.headline,
      subHeadline: data.subtitle || prev.subHeadline,
      designStylePrompt: data.design_style || prev.designStylePrompt,
    }));
  });

  const { mutate: initiatePoster, isPending: isInitiating } =
    useInitiatePoster();

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    setUploadedFile(file);
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    setUploadedImage(null);
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleResetFields = () => {
    setFormData((prev) => ({
      ...prev,
      headline: "",
      subHeadline: "",
      designStylePrompt: "",
      cta: "",
      phoneNumber: "",
      address: "",
      website: "",
      businessDescription: "",
    }));
  };

  const handleAiGenerate = () => {
    if (!formData.businessDescription.trim()) return;
    aiGenerateMutation.mutate({ idea: formData.businessDescription });
  };

  const handleGenerate = () => {
    const primaryColor = colors[0]?.color || "#000000";
    const secondaryColor = colors[1]?.color || "#ffffff";

    const formDataObj = new FormData();
    formDataObj.append("title", formData.headline);
    formDataObj.append("subtitle", formData.subHeadline);
    formDataObj.append("brand_name", brandName || "My Brand");
    formDataObj.append("primary_color", primaryColor);
    formDataObj.append("secondary_color", secondaryColor);
    if (tagLine) formDataObj.append("tagline", tagLine);
    if (formData.cta) formDataObj.append("cta", formData.cta);
    if (formData.phoneNumber) formDataObj.append("phone", formData.phoneNumber);
    if (formData.address) formDataObj.append("address", formData.address);
    if (formData.website) formDataObj.append("website", formData.website);
    if (formData.designStylePrompt)
      formDataObj.append("design_style_prompt", formData.designStylePrompt);
    formDataObj.append("style_preset", selectedStyle);
    formDataObj.append("output_format", selectedFormat.value);
    formDataObj.append("language", language);
    formDataObj.append("variations", String(variations));
    if (uploadedFile) formDataObj.append("image", uploadedFile);

    setGenerationId(null);
    initiatePoster(formDataObj, {
      onSuccess: (response) => {
        if (response?.data?.generationId) {
          setGenerationId(response.data.generationId);
        }
      },
    });
  };

  const handleDownload = async () => {
    if (!selectedPosterUrl) return;
    try {
      const response = await fetch(selectedPosterUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `poster-${generationId || "design"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const isGenerating = isInitiating || isProcessing;

  return (
    <section className="min-h-screen bg-[#edf6fb] p-4 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6b7280] shadow-sm transition hover:bg-[#f1f5f9] hover:text-[#4f79e8] hover:shadow-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-[24px] font-bold text-[#1f2a44]">
            Poster Design
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1fr]">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            {/* Upload Image */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-3 flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                <ImagePlus className="h-4 w-4 text-[#5b8def]" />
                <span>Upload Image</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="relative overflow-hidden rounded-xl border border-dashed border-[#cfe1f0] bg-gradient-to-br from-[#f4f9fd] to-[#eef6ff]">
                {uploadedImage ? (
                  <div className="relative h-[180px] sm:h-[220px]">
                    <Image
                      src={uploadedImage}
                      alt="Uploaded poster"
                      fill
                      className="object-cover"
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
                        Click to upload an image
                      </p>
                      <p className="mt-1 text-xs text-[#91a0ae]">
                        PNG, JPG, JPEG supported
                      </p>
                    </div>
                  </button>
                )}
              </div>

              {uploadedImage && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#eef5ff] px-4 py-2 text-sm font-medium text-[#4f79e8] transition hover:bg-[#e3eeff]"
                >
                  <UploadCloud className="h-4 w-4" />
                  Change Image
                </button>
              )}
            </div>

            {/* Brand Kit */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[14px] font-semibold text-[#6a63ff]">
                    <Palette className="h-4 w-4" />
                    <span>Brand Kit</span>
                  </div>
                  <p className="mt-1 text-[12px] text-[#8a939a]">
                    Manage your brand&apos;s unique assets.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setBrandKitEnabled((prev) => !prev)}
                    className={`relative h-6 w-11 rounded-full transition ${
                      brandKitEnabled ? "bg-[#635bff]" : "bg-[#d1d5db]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        brandKitEnabled ? "right-1" : "right-6"
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsBrandKitModalOpen(true)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#635bff] px-4 py-2 text-[12px] font-medium text-white transition hover:bg-[#574ff2]"
                  >
                    Customize
                    <Sparkles className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Fields */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                  <Wand2 className="h-4 w-4 text-[#4cc56a]" />
                  <span>Content Fields — (all optional)</span>
                </div>

                <button
                  type="button"
                  onClick={handleResetFields}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#ffd7d7] px-2.5 py-1.5 text-[10px] text-[#ff5e5e] transition hover:bg-[#fff7f7]"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset Fields
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                    Headline / Title
                  </label>
                  <input
                    name="headline"
                    value={formData.headline}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. Buy 2 Get 1 Free — This Friday Only!"
                    className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                    Sub-Headline
                  </label>
                  <input
                    name="subHeadline"
                    value={formData.subHeadline}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. Limited time offer. Valid in-store and online."
                    className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                    Design Style Prompt
                  </label>
                  <textarea
                    name="designStylePrompt"
                    value={formData.designStylePrompt}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="e.g. Vibrant Friday night promo with warm red-orange gradient, bold typography, rustic Italian feel."
                    className="w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 py-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                  />
                </div>
              </div>

              <p className="mt-3 text-[11px] text-[#8d9399]">
                Be specific about colors, mood, and target platform for best
                results.
              </p>
            </div>

            {/* Additional Information */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                <Sparkles className="h-4 w-4 text-[#6b8eff]" />
                <span>Additional Information</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                    Call to Action (CTA)
                  </label>
                  <input
                    name="cta"
                    value={formData.cta}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g. Order Now | Call Us | Visit Today"
                    className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                      Phone Number
                    </label>
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="+1 800 555 0199"
                      className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                      Address
                    </label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="USA, New York."
                      className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                      Website / URL
                    </label>
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="www.yourbrand.com"
                      className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Content Assistant */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                <Sparkles className="h-4 w-4 text-[#6adf7d]" />
                <span>AI Content Assistant</span>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                  Describe your business, offer, or campaign idea
                </label>
                <textarea
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="e.g. I own an Italian pizza restaurant in New York. I want to promote a Friday night special — Buy 2 large pizzas and get 1 free."
                  className="w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 py-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                />
              </div>

              <button
                type="button"
                disabled={aiGenerateMutation.isPending}
                onClick={handleAiGenerate}
                className="mt-4 inline-flex h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1fd2ea] via-[#39a9f5] to-[#5d72ff] text-[16px] font-semibold text-white shadow-[0_10px_20px_rgba(80,130,255,0.22)] transition hover:scale-[1.01] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {aiGenerateMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {aiGenerateMutation.isPending
                  ? "Generating Content..."
                  : "Generate Content with AI"}
              </button>
            </div>

            {/* Style Preset */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                  <Palette className="h-4 w-4 text-[#ff8a65]" />
                  <span>Style Preset</span>
                </div>
                <span className="text-[12px] font-medium text-[#7c83ff]">
                  Optional
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {stylePresets.map((style) => (
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
                    <h4 className="text-[14px] font-semibold text-[#3d4a54]">
                      {style.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-[#7f8a93]">
                      {style.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Output Format */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                <ImagePlus className="h-4 w-4 text-[#6b8eff]" />
                <span>Output Format</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {outputFormats.map((format) => (
                  <button
                    key={format.title}
                    type="button"
                    onClick={() => setSelectedFormat(format)}
                    className={`rounded-xl p-4 text-left transition hover:scale-[1.01] hover:shadow-sm ${
                      format.bg
                    } ${
                      selectedFormat.title === format.title
                        ? "ring-2 ring-[#5d72ff]"
                        : "ring-1 ring-transparent"
                    }`}
                  >
                    <h4 className="text-[14px] font-semibold text-[#3d4a54]">
                      {format.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-[#7f8a93]">
                      {format.description}
                    </p>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setSelectedFormat({
                      title: "Custom Size",
                      description: "Enter your own dimensions",
                      bg: "bg-[#f5f0ff]",
                      value: "custom",
                    })
                  }
                  className={`col-span-1 rounded-xl p-4 text-left transition hover:scale-[1.01] hover:shadow-sm bg-[#f5f0ff] sm:col-span-2 ${
                    selectedFormat.title === "Custom Size"
                      ? "ring-2 ring-[#5d72ff]"
                      : "ring-1 ring-transparent"
                  }`}
                >
                  <h4 className="text-[14px] font-semibold text-[#3d4a54]">
                    Custom Size
                  </h4>
                  <p className="mt-1 text-[11px] text-[#7f8a93]">
                    Enter your own width &amp; height
                  </p>
                </button>
              </div>

              {selectedFormat.title === "Custom Size" && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                      Width (px)
                    </label>
                    <input
                      name="width"
                      value={formData.width}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="e.g. 400px"
                      className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                      Height (px)
                    </label>
                    <input
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="e.g. 600px"
                      className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none transition placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Language */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="mb-4 flex items-center gap-2 text-[14px] font-medium text-[#6b7280]">
                <Sparkles className="h-4 w-4 text-[#4f79e8]" />
                <span>Language</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setLanguage(lang.id)}
                    className={`rounded-lg px-3 py-2.5 text-[12px] font-medium transition ${
                      language === lang.id
                        ? "bg-[#eef5ff] text-[#4f79e8] ring-1 ring-[#b7d0ff]"
                        : "bg-[#f7f7f7] text-[#848b92] hover:bg-[#f1f5f9]"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Credits / Variations */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-[13px] font-semibold text-[#6b63ff]">
                    Credits used = Quantity selected
                  </h4>
                  <p className="mt-1 text-[11px] text-[#8a939a]">
                    (e.g. 1 post = 1 credit, 3 posts = 3 credits).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end gap-1">
                    <label className="text-[10px] font-medium text-[#9aa1a8]">
                      Variations
                    </label>
                    <input
                      id="poster-variations"
                      type="number"
                      min={1}
                      max={10}
                      value={variations}
                      onChange={(e) =>
                        setVariations(
                          Math.max(
                            1,
                            Math.min(10, parseInt(e.target.value) || 1),
                          ),
                        )
                      }
                      className="h-[38px] w-[80px] rounded-lg border border-[#dbe6f0] bg-[#f6f7f9] px-3 text-center text-[14px] font-semibold text-[#4b5563] outline-none transition focus:border-[#635bff] focus:bg-white"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setCreditsEnabled((prev) => !prev)}
                    className={`relative h-6 w-11 rounded-full transition ${
                      creditsEnabled ? "bg-[#635bff]" : "bg-[#d1d5db]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        creditsEnabled ? "right-1" : "right-6"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !brandName}
              className={`inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1fd2ea] via-[#39a9f5] to-[#5d72ff] text-[16px] font-semibold text-white shadow-[0_10px_20px_rgba(80,130,255,0.22)] transition hover:scale-[1.01] hover:opacity-95 ${
                isGenerating || !brandName
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer"
              }`}
            >
              {isGenerating ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isGenerating ? "Generating..." : "Generate Poster"}
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
            <div className="mb-3 text-[14px] font-medium text-[#6b7280]">
              Preview Output
            </div>

            <div className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[#dce6ef] bg-white sm:min-h-[520px] xl:min-h-[760px]">
              {/* Main Preview */}
              <div className="relative flex-1 overflow-hidden bg-[#f8fafc]">
                {selectedPosterUrl ? (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative h-full w-full">
                      <Image
                        src={selectedPosterUrl}
                        alt="Generated poster"
                        fill
                        priority
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full w-full min-h-[420px] flex-col items-center justify-center p-10 text-center text-[#b8bcc2] sm:min-h-[520px] xl:min-h-[760px]">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                      <ImagePlus className="h-8 w-8 opacity-40" />
                    </div>
                    <p className="text-[14px] font-medium text-[#8a8f96]">
                      Your generated poster will appear here
                    </p>
                    <p className="mt-1 text-[12px] text-[#c0c4ca]">
                      Fill in the details and click Generate
                    </p>
                  </div>
                )}
              </div>

              {/* Download & Gallery */}
              {resultUrls.length > 0 && (
                <div className="border-t border-[#edf2f7] p-5">
                  <button
                    onClick={handleDownload}
                    className="mb-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#4b8df8] py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#3b7de8]"
                  >
                    Download
                    <Download className="h-4 w-4" />
                  </button>

                  {resultUrls.length > 1 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {resultUrls.map((url, idx) => (
                        <button
                          key={idx}
                          onClick={() => setUserSelectedPosterUrl(url)}
                          className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                            selectedPosterUrl === url
                              ? "border-[#4b8df8] ring-2 ring-[#4b8df8]/20"
                              : "border-[#e2e8f0] hover:border-[#cbd5e0]"
                          }`}
                        >
                          <Image
                            src={url}
                            alt={`Poster option ${idx + 1}`}
                            fill
                            className="object-contain p-2"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CustomizeBrandKit
        isOpen={isBrandKitModalOpen}
        onClose={() => setIsBrandKitModalOpen(false)}
        brandName={brandName}
        setBrandName={setBrandName}
        tagLine={tagLine}
        setTagLine={setTagLine}
        colors={colors}
        setColors={setColors}
      />

      {/* Loading Modal Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a]/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-[420px] rounded-3xl bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#39a9f5] border-t-transparent"></div>
                <div className="absolute inset-2 animate-spin rounded-full border-[3px] border-[#1fd2ea] border-t-transparent opacity-60 [animation-direction:reverse]"></div>
                <Sparkles className="h-8 w-8 text-[#39a9f5]" />
              </div>

              <h3 className="text-[20px] font-bold text-[#1f2a44]">
                Generating your poster
              </h3>
              <p className="mt-2 text-[14px] text-[#6b7280]">
                Our AI is crafting your design...
              </p>

              <div className="mt-8 overflow-hidden rounded-full bg-[#f1f5f9]">
                <div className="h-1.5 animate-pulse rounded-full bg-gradient-to-r from-[#1fd2ea] to-[#5d72ff]"></div>
              </div>

              <p className="mt-4 text-[12px] text-[#94a3b8]">
                This usually takes about 30–60 seconds.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
