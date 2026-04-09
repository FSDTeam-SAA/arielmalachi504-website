"use client";

import React, { useRef, useState } from "react";
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
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAiGenerateFields } from "../hooks/usePosterDesign";
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
  },
  {
    title: "9:16 Story",
    description: "Instagram/FB Story",
    bg: "bg-[#f4f8df]",
  },
  {
    title: "16:9 Square",
    description: "Facebook/Twitter",
    bg: "bg-[#f8ece5]",
  },
  {
    title: "4:5 Portrait",
    description: "Instagram Portrait",
    bg: "bg-[#e8f0ff]",
  },
];

export default function PosterDesign() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [brandKitEnabled, setBrandKitEnabled] = useState(true);
  const [creditsEnabled, setCreditsEnabled] = useState(true);
  const [isBrandKitModalOpen, setIsBrandKitModalOpen] = useState(false);

  const [selectedStyle, setSelectedStyle] = useState("Modern Minimal");
  const [selectedFormat, setSelectedFormat] = useState("1:1 Square");

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

  const aiGenerateMutation = useAiGenerateFields((data) => {
    setFormData((prev) => ({
      ...prev,
      headline: data.title || prev.headline,
      subHeadline: data.subtitle || prev.subHeadline,
      designStylePrompt: data.design_style || prev.designStylePrompt,
    }));
  });

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

    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }

    setUploadedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const handleRemoveImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setUploadedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    if (!formData.businessDescription.trim()) {
      return;
    }
    aiGenerateMutation.mutate({ idea: formData.businessDescription });
  };

  const handleGenerate = () => {
    console.log("Poster Design Data:", {
      uploadedFile,
      uploadedImage,
      brandKitEnabled,
      creditsEnabled,
      selectedStyle,
      selectedFormat,
      ...formData,
    });
  };

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
                    placeholder="e.g. Vibrant Friday night promo with warm red-orange gradient, bold typography, rustic Italian feel, suitable for Facebook feed."
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
                      placeholder="Dhaka, Bangladesh"
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
                  placeholder="e.g. I own an Italian pizza restaurant in New York. I want to promote a Friday night special — Buy 2 large pizzas and get 1 free. Target audience: families and office workers. Warm, exciting mood."
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
                    onClick={() => setSelectedFormat(format.title)}
                    className={`rounded-xl p-4 text-left transition hover:scale-[1.01] hover:shadow-sm ${
                      format.bg
                    } ${
                      selectedFormat === format.title
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
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                    Width
                  </label>
                  <input
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    type="text"
                    // placeholder="400px"
                    className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-medium text-[#9aa1a8]">
                    Height
                  </label>
                  <input
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    type="text"
                    // placeholder="600px"
                    className="h-[42px] w-full rounded-lg border border-transparent bg-[#f6f7f9] px-3 text-[13px] text-[#555] outline-none placeholder:text-[#c0c4c9] focus:border-[#b8d2f3] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Credits */}
            <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-[13px] font-semibold text-[#6b63ff]">
                    Credits used = Quantity selected
                  </h4>
                  <p className="mt-1 text-[11px] text-[#8a939a]">
                    (e.g. 1 post = 1 credit, 15 posts = 15 credits).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="min-w-[90px] rounded-lg bg-[#f6f7f9] px-3 py-2 text-center text-[12px] text-[#a2a9b0]">
                    Quantity
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

            {/* Regenerate Button */}
            <button
              type="button"
              onClick={handleGenerate}
              className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1fd2ea] via-[#39a9f5] to-[#5d72ff] text-[16px] font-semibold text-white shadow-[0_10px_20px_rgba(80,130,255,0.22)] transition hover:scale-[1.01] hover:opacity-95"
            >
              <Sparkles className="h-4 w-4" />
              Regenerate Design 1/3
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-2xl border border-[#d7e7f3] bg-white p-4 shadow-[0_10px_25px_rgba(33,74,135,0.06)]">
            <div className="mb-3 text-[14px] font-medium text-[#6b7280]">
              Preview Output
            </div>

            <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-[#dce6ef] bg-gradient-to-br from-[#fbfdff] to-[#f7fafc] sm:min-h-[520px] xl:min-h-[760px]">
              {uploadedImage ? (
                <div className="relative h-full min-h-[420px] w-full sm:min-h-[520px] xl:min-h-[760px]">
                  <Image
                    src={uploadedImage}
                    alt="Preview poster"
                    fill
                    className="rounded-2xl object-contain p-4"
                  />
                </div>
              ) : (
                <div className="text-center text-[#b8bcc2]">
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
          </div>
        </div>
      </div>

      <CustomizeBrandKit
        isOpen={isBrandKitModalOpen}
        onClose={() => setIsBrandKitModalOpen(false)}
      />
    </section>
  );
}
