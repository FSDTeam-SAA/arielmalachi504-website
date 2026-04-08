"use client";

import Image from "next/image";
import {
  Download,
  Trash2,
  X,
  Wand2,
  CalendarDays,
  Tag,
  Monitor,
  Crop,
} from "lucide-react";
import { useState } from "react";

type DesignItem = {
  id: number;
  title: string;
  time: string;
  image: string;
  type: string;
  prompt: string;
  style: string;
  platform: string;
  format: string;
  variants: string[];
};

const designs: DesignItem[] = [
  {
    id: 1,
    title: "Pizza House Special Deal",
    time: "Today, 2:30 PM",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    type: "Poster",
    prompt:
      "Vibrant pizza promotional design with warm red and orange colors, bold headline, tasty product focus, and eye-catching restaurant advertising style.",
    style: "Bold & Vibrant",
    platform: "Facebook",
    format: "1:1 Square (1080×1080px)",
    variants: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    title: "Pizza House Special Deal",
    time: "Yesterday, 2:30 PM",
    image:
      "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1200&auto=format&fit=crop",
    type: "Poster",
    prompt:
      "Modern grand opening restaurant design with dynamic composition, promotional text, warm colors, and strong visual hierarchy.",
    style: "Modern Promo",
    platform: "Instagram",
    format: "4:5 Portrait (1080×1350px)",
    variants: [
      "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    title: "Pizza House Special Deal",
    time: "Yesterday, 10:30 AM",
    image:
      "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=1200&auto=format&fit=crop",
    type: "Poster",
    prompt:
      "High-energy sale poster with bold yellow typography, red background burst, and strong promotional retail advertisement feeling.",
    style: "Sales Campaign",
    platform: "Facebook",
    format: "1:1 Square (1080×1080px)",
    variants: [
      "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

export default function MyDesign() {
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string>("");

  const handleOpenPreview = (design: DesignItem) => {
    setSelectedDesign(design);
    setSelectedPreviewImage(design.image);
  };

  const handleClosePreview = () => {
    setSelectedDesign(null);
    setSelectedPreviewImage("");
  };

  const handleDownload = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Image download failed:", error);
    }
  };

  return (
    <>
      <section className="min-h-screen p-4 md:p-6">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[30px] font-medium text-[#5f6673]">
              My Designs <span className="text-[#7c8594]">(last 3 days)</span>
            </h2>

            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#18c7df] to-[#4f8df7] px-5 text-sm font-medium text-white shadow-sm transition hover:opacity-95">
              <span className="text-lg leading-none">+</span>
              New Design
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {designs.map((design) => (
              <div
                key={design.id}
                className="overflow-hidden rounded-lg border border-[#d9e7f2] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.06)]"
              >
                <div className="relative h-[180px] w-full overflow-hidden">
                  <Image
                    src={design.image}
                    alt={design.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-[24px] font-medium leading-tight text-[#5d6573]">
                    {design.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#9aa3af]">{design.time}</p>

                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => handleOpenPreview(design)}
                      className="h-10 min-w-[138px] rounded-md bg-gradient-to-r from-[#16c8df] to-[#4f8df7] px-6 text-sm font-medium text-white transition hover:opacity-95"
                    >
                      Preview
                    </button>

                    <button
                      onClick={() => handleDownload(design.image, design.title)}
                      className="flex h-10 w-10 items-center justify-center text-[#4b5563] transition hover:text-[#111827]"
                    >
                      <Download className="h-[18px] w-[18px]" />
                    </button>

                    <button className="flex h-10 w-10 items-center justify-center text-[#ff3b30] transition hover:opacity-80">
                      <Trash2 className="h-[18px] w-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]">
          <div className="relative max-h-[95vh] w-full max-w-[1020px] overflow-y-auto rounded-[24px] bg-white p-5 shadow-2xl md:p-7">
            <button
              onClick={handleClosePreview}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-[#667085] transition hover:bg-gray-100"
            >
              <X className="h-7 w-7" />
            </button>

            <div className="mb-6 flex flex-col gap-4 pr-10 md:flex-row md:items-center">
              <div className="relative h-[60px] w-[60px] overflow-hidden rounded-xl">
                <Image
                  src={selectedDesign.image}
                  alt={selectedDesign.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-[28px] font-medium leading-tight text-[#111827]">
                  {selectedDesign.title}
                </h3>
                <span className="inline-flex h-10 items-center rounded-xl bg-[#eef2ff] px-4 text-[16px] font-medium text-[#5468ff]">
                  {selectedDesign.type}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[370px_minmax(0,1fr)]">
              <div>
                <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-[#f4f7fb]">
                  <Image
                    src={selectedPreviewImage}
                    alt={selectedDesign.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="mt-4 flex gap-3">
                  {selectedDesign.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPreviewImage(variant)}
                      className={`relative h-[82px] w-[110px] overflow-hidden rounded-xl border-2 transition ${
                        selectedPreviewImage === variant
                          ? "border-[#4f46e5]"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={variant}
                        alt={`Variant ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                <p className="mt-4 text-center text-[16px] text-[#667085]">
                  {selectedDesign.variants.length} variants available
                </p>
              </div>

              <div>
                <h4 className="mb-4 text-[18px] font-medium uppercase tracking-wide text-[#5f6880]">
                  Design Details
                </h4>

                <div className="rounded-2xl border border-[#dbe7f5] bg-[#edf5ff] p-5">
                  <div className="mb-3 flex items-center gap-2 text-[#2196f3]">
                    <Wand2 className="h-5 w-5" />
                    <span className="text-[16px] font-medium">
                      AI Prompt Used
                    </span>
                  </div>
                  <p className="text-[15px] leading-8 text-[#5f6880]">
                    {selectedDesign.prompt}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <DetailBox
                    icon={<CalendarDays className="h-5 w-5" />}
                    title="Created"
                    value={selectedDesign.time}
                  />
                  <DetailBox
                    icon={<Tag className="h-5 w-5" />}
                    title="Design Style"
                    value={selectedDesign.style}
                  />
                  <DetailBox
                    icon={<Monitor className="h-5 w-5" />}
                    title="Platform"
                    value={selectedDesign.platform}
                  />
                  <DetailBox
                    icon={<Crop className="h-5 w-5" />}
                    title="Format / Size"
                    value={selectedDesign.format}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                onClick={() =>
                  handleDownload(selectedPreviewImage, selectedDesign.title)
                }
                className="h-16 rounded-[20px] bg-gradient-to-r from-[#19c5df] to-[#5a6df8] text-[18px] font-medium text-white transition hover:opacity-95"
              >
                Download
              </button>

              <button className="h-16 rounded-[20px] border border-[#d6dbe4] bg-white text-[18px] font-medium text-[#4f46e5] transition hover:bg-gray-50">
                Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DetailBox({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#f7f7fa] p-5">
      <div className="mb-4 flex items-center gap-2 text-[#98a2b3]">
        {icon}
        <span className="text-[16px] font-medium text-[#667085]">{title}</span>
      </div>
      <p className="text-[16px] leading-7 text-[#344054]">{value}</p>
    </div>
  );
}
