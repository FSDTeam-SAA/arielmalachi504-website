"use client";

import React, { useRef, useState } from "react";
import {
  UploadCloud,
  ChevronDown,
  Save,
  Palette,
  Check,
  X,
} from "lucide-react";
import Image from "next/image";

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

const fontOptions = [
  "Plus Jakarta Sans",
  "Inter",
  "Manrope",
  "Poppins",
  "Montserrat",
];

export default function CustomizeBrandKit({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [brandName, setBrandName] = useState("BrandFlowLabs");
  const [tagLine, setTagLine] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [selectedPreset, setSelectedPreset] = useState("Ocean Blue");
  const [customColors, setCustomColors] = useState([
    { enabled: true, color: "#4C8CF0", hex: "#4695FA" },
    { enabled: true, color: "#4C8CF0", hex: "#4695FA" },
    { enabled: true, color: "#7A56E0", hex: "#4695FA" },
  ]);

  const [language, setLanguage] = useState("Hebrew");
  const [headlineFont, setHeadlineFont] = useState("Plus Jakarta Sans");
  const [subHeadlineFont, setSubHeadlineFont] = useState("Manrope");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
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

  const handleToggleColor = (index: number) => {
    setCustomColors((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const handleDiscard = () => {
    setBrandName("BrandFlowLabs");
    setTagLine("");
    setSelectedPreset("Ocean Blue");
    setLanguage("Hebrew");
    setHeadlineFont("Plus Jakarta Sans");
    setSubHeadlineFont("Manrope");
    setCustomColors([
      { enabled: true, color: "#4C8CF0", hex: "#4695FA" },
      { enabled: true, color: "#4C8CF0", hex: "#4695FA" },
      { enabled: true, color: "#7A56E0", hex: "#4695FA" },
    ]);

    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }
    setLogoPreview(null);
    setLogoFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const handleSave = () => {
    console.log("Brand Kit Data:", {
      brandName,
      tagLine,
      selectedPreset,
      customColors,
      language,
      headlineFont,
      subHeadlineFont,
      logoFile,
      logoPreview,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#1f2a44]/60 p-4 md:p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-[1200px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#d8e4ef] bg-[#f7fbff] p-4 shadow-[0_20px_60px_rgba(44,87,140,0.15)] md:p-5">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#edf6fb] text-[#6f7d8b] transition hover:bg-[#d8e4ef] hover:text-[#1f2a44]"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[30px] font-bold text-[#1f2a44]">
              Customize Brand Kit
            </h1>
            <p className="mt-2 max-w-[620px] text-[15px] leading-6 text-[#6f7d8b]">
              Define your visual identity. These settings will be automatically
              applied to all your new designs and templates
            </p>
          </div>

          {/* Top Section */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_1fr]">
            {/* Left */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[14px] font-medium text-[#24324a]">
                    Brand Name
                  </label>
                  <input
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    type="text"
                    className="h-[48px] w-full rounded-lg border border-transparent bg-white px-4 text-[14px] text-[#4b5563] outline-none ring-1 ring-[#e5edf4] focus:ring-[#8cb7ff]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[14px] font-medium text-[#24324a]">
                    Tag Line
                  </label>
                  <input
                    value={tagLine}
                    onChange={(e) => setTagLine(e.target.value)}
                    type="text"
                    placeholder="Your tagline here"
                    className="h-[48px] w-full rounded-lg border border-transparent bg-white px-4 text-[14px] text-[#4b5563] outline-none placeholder:text-[#b7c0c9] ring-1 ring-[#e5edf4] focus:ring-[#8cb7ff]"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[#d8e4ef] bg-white p-3 shadow-[0_8px_20px_rgba(44,87,140,0.04)]">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg"
                  onChange={handleLogoUpload}
                  className="hidden"
                />

                <div className="rounded-xl border-2 border-dashed border-[#c6d3df] bg-[#fcfcfd] p-4">
                  {logoPreview ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-6">
                      <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-[#e4ebf2] bg-white">
                        <Image
                          src={logoPreview}
                          alt="Brand logo preview"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-lg bg-[#eef4ff] px-5 py-2 text-[13px] font-medium text-[#5b6eff] transition hover:bg-[#e3ecff]"
                      >
                        Change Logo
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f3ff]">
                        <UploadCloud className="h-6 w-6 text-[#5d72ff]" />
                      </div>

                      <p className="text-[15px] font-medium text-[#5d72ff]">
                        Upload Your Brand Logo (Optional)
                      </p>
                      <p className="mt-2 text-[11px] text-[#a0a8b0]">
                        Recommended size: 2MB max
                      </p>
                      <p className="mt-1 text-[11px] text-[#a0a8b0]">
                        SVG or PNG, at least 500x500px
                      </p>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-5 rounded-lg bg-[#f1f1f4] px-6 py-2.5 text-[13px] font-medium text-[#5d72ff] transition hover:bg-[#e8e8ee]"
                      >
                        Brows
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[15px] font-medium text-[#24324a]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#ffe7f3]">
                    <Palette className="h-4 w-4 text-[#f265a8]" />
                  </div>
                  <span>Color palette</span>
                </div>
                <span className="text-[12px] text-[#b7bec6]">Optional</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {palettePresets.map((preset) => (
                  <button
                    key={preset.name + preset.colors.join("")}
                    type="button"
                    onClick={() => setSelectedPreset(preset.name)}
                    className={`rounded-xl border bg-white p-3 text-left shadow-[0_6px_16px_rgba(44,87,140,0.04)] transition hover:shadow-[0_8px_18px_rgba(44,87,140,0.08)] ${
                      selectedPreset === preset.name
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
                <p className="mb-4 text-[14px] font-medium text-[#4b5563]">
                  Choose Colors
                </p>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {customColors.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleColor(index)}
                        className={`flex h-4 w-4 items-center justify-center rounded-[4px] border text-white ${
                          item.enabled
                            ? "border-[#7c6cff] bg-[#7c6cff]"
                            : "border-[#cfd6dd] bg-white"
                        }`}
                      >
                        {item.enabled && <Check className="h-3 w-3" />}
                      </button>

                      <input
                        type="color"
                        value={item.color}
                        onChange={(e) =>
                          handleColorChange(index, e.target.value)
                        }
                        className="h-8 w-8 cursor-pointer rounded-md border-0 bg-transparent p-0"
                      />

                      <input
                        type="text"
                        value={item.hex}
                        onChange={(e) =>
                          handleColorChange(index, e.target.value)
                        }
                        className="h-[38px] w-full rounded-lg border border-[#dbe6f0] bg-[#fafbfc] px-3 text-[13px] text-[#666] outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="mt-5 rounded-2xl border border-[#d8e4ef] bg-white p-4 shadow-[0_8px_20px_rgba(44,87,140,0.04)] md:p-5">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-[16px] font-semibold text-[#24324a]">
                Brand Typography
              </h2>

              <div className="relative w-full sm:w-[130px]">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-[42px] w-full appearance-none rounded-lg border border-[#e2e9f0] bg-[#f8fafc] px-4 text-[13px] text-[#4b5563] outline-none"
                >
                  <option>Hebrew</option>
                  <option>English</option>
                  <option>Arabic</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a8793]" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#24324a]">
                  Headline / Title
                </label>

                <div className="relative mb-3">
                  <select
                    value={headlineFont}
                    onChange={(e) => setHeadlineFont(e.target.value)}
                    className="h-[42px] w-full appearance-none rounded-lg border border-[#e2e9f0] bg-[#f8fafc] px-4 text-[13px] text-[#4b5563] outline-none"
                  >
                    {fontOptions.map((font) => (
                      <option key={font}>{font}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a8793]" />
                </div>

                <div className="rounded-xl bg-[#f6f7f9] p-5 text-[18px] leading-[1.35] text-[#111827]">
                  The quick brown fox
                  <br />
                  jumps over the lazy dog
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[14px] font-medium text-[#24324a]">
                  Sub-Headline
                </label>

                <div className="relative mb-3">
                  <select
                    value={subHeadlineFont}
                    onChange={(e) => setSubHeadlineFont(e.target.value)}
                    className="h-[42px] w-full appearance-none rounded-lg border border-[#e2e9f0] bg-[#f8fafc] px-4 text-[13px] text-[#4b5563] outline-none"
                  >
                    {fontOptions.map((font) => (
                      <option key={font}>{font}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a8793]" />
                </div>

                <div className="rounded-xl bg-[#f6f7f9] p-5 text-[13px] leading-6 text-[#6b7280]">
                  Creativity is intelligence having fun. Design is not just what
                  it looks like and feels like. Design is how it works. Every
                  great design begins with an even better story.
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-5 flex flex-col justify-end gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleDiscard}
              className="rounded-xl border border-[#74d0ff] bg-[#eef8ff] px-6 py-3 text-[14px] font-medium text-[#3aa4f8] transition hover:bg-[#e4f4ff]"
            >
              Discard Changes
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2ac8f4] to-[#5d72ff] px-6 py-3 text-[14px] font-medium text-white shadow-[0_10px_20px_rgba(80,130,255,0.18)] transition hover:opacity-95"
            >
              <Save className="h-4 w-4" />
              Save Brand Kit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
