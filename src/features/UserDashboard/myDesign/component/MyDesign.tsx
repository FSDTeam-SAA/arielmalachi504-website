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
import { format } from "date-fns";
import { useMyDesign, useDeleteDesign } from "../hooks/useMyDesign";
import { IDesignHistoryItem } from "../types/myDesign.types";
import { Loader2 } from "lucide-react";

export default function MyDesign() {
  const { data, isLoading, error } = useMyDesign("all", 20);
  const deleteMutation = useDeleteDesign();
  const [selectedDesign, setSelectedDesign] =
    useState<IDesignHistoryItem | null>(null);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string>("");

  const handleOpenPreview = (design: IDesignHistoryItem) => {
    setSelectedDesign(design);
    setSelectedPreviewImage(design.resultUrls[0] || "");
  };

  const handleClosePreview = () => {
    setSelectedDesign(null);
    setSelectedPreviewImage("");
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleDownload = async (imageUrl: string, title: string) => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Image download failed:", error);
    }
  };

  if (error) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center gap-4 rounded-xl border border-red-100 bg-red-50/30 p-8 text-center">
        <div className="rounded-full bg-red-100 p-3 text-red-600">
          <Trash2 className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-red-900">
          Failed to load designs
        </h3>
        <p className="max-w-md text-red-600/80">
          There was an error fetching your design history. Please try refreshing
          the page.
        </p>
      </div>
    );
  }

  const designs = data?.data || [];

  return (
    <>
      <section className="min-h-screen p-4 md:p-6">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[30px] font-medium text-[#5f6673]">
              My Designs <span className="text-[#7c8594]">(last 3 days)</span>
            </h2>

            {/* <button className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#18c7df] to-[#4f8df7] px-5 text-sm font-medium text-white shadow-sm transition hover:opacity-95">
              <span className="text-lg leading-none">+</span>
              New Design
            </button> */}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-lg border border-[#d9e7f2] bg-white"
                >
                  <div className="h-[180px] w-full bg-gray-200" />
                  <div className="p-4">
                    <div className="h-6 w-3/4 rounded bg-gray-200" />
                    <div className="mt-2 h-4 w-1/4 rounded bg-gray-200" />
                    <div className="mt-4 flex gap-4">
                      <div className="h-10 w-32 rounded bg-gray-200" />
                      <div className="h-10 w-10 rounded bg-gray-200" />
                      <div className="h-10 w-10 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))
            ) : designs.length === 0 ? (
              <div className="col-span-full flex h-[400px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center text-gray-500">
                <div className="rounded-full bg-gray-100 p-4">
                  <Wand2 className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    No designs yet
                  </h3>
                  <p className="mt-1">
                    Start creating your first AI masterpiece!
                  </p>
                </div>
              </div>
            ) : (
              designs.map((design) => (
                <div
                  key={design._id}
                  className="overflow-hidden rounded-lg border border-[#d9e7f2] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.06)]"
                >
                  <div className="relative h-[180px] w-full overflow-hidden bg-gray-50">
                    {design.status === "completed" && design.resultUrls[0] ? (
                      <Image
                        src={design.resultUrls[0]}
                        alt={design.generationType}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#f8fafc] text-[#94a3b8]">
                        {design.status === "processing" ? (
                          <>
                            <Loader2 className="h-8 w-8 animate-spin text-[#4f8df7]" />
                            <span className="text-sm font-medium">
                              Processing...
                            </span>
                          </>
                        ) : (
                          <>
                            <X className="h-8 w-8 text-red-400" />
                            <span className="text-sm font-medium text-red-400">
                              Failed
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-[24px] font-medium leading-tight text-[#5d6573]">
                      {design.generationType.charAt(0).toUpperCase() +
                        design.generationType.slice(1)}
                    </h3>
                    <p className="mt-1 text-sm text-[#9aa3af]">
                      {format(
                        new Date(design.createdAt),
                        "MMM d, yyyy • h:mm a",
                      )}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <button
                        disabled={design.status !== "completed"}
                        onClick={() => handleOpenPreview(design)}
                        className="h-10 min-w-[138px] cursor-pointer rounded-md bg-gradient-to-r from-[#16c8df] to-[#4f8df7] px-6 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Preview
                      </button>

                      <button
                        disabled={design.status !== "completed"}
                        onClick={() =>
                          handleDownload(
                            design.resultUrls[0],
                            design.generationType,
                          )
                        }
                        className="flex h-10 w-10 cursor-pointer items-center justify-center text-[#4b5563] transition hover:text-[#111827] disabled:opacity-30"
                      >
                        <Download className="h-[18px] w-[18px]" />
                      </button>

                      <button
                        disabled={deleteMutation.isPending}
                        onClick={() => handleDelete(design._id)}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center text-[#ff3b30] transition hover:opacity-80 disabled:opacity-30"
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="h-[18px] w-[18px] animate-spin" />
                        ) : (
                          <Trash2 className="h-[18px] w-[18px]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
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
              <div className="relative h-[60px] w-[60px] overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={selectedDesign.resultUrls[0] || ""}
                  alt={selectedDesign.generationType}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-[28px] font-medium leading-tight text-[#111827]">
                  {selectedDesign.generationType.charAt(0).toUpperCase() +
                    selectedDesign.generationType.slice(1)}
                </h3>
                <span className="inline-flex h-10 items-center rounded-xl bg-[#eef2ff] px-4 text-[16px] font-medium text-[#5468ff]">
                  {selectedDesign.generationType}
                </span>
                <span
                  className={`inline-flex h-10 items-center rounded-xl px-4 text-[16px] font-medium ${
                    selectedDesign.status === "completed"
                      ? "bg-green-50 text-green-600"
                      : "bg-orange-50 text-orange-600"
                  }`}
                >
                  {selectedDesign.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[370px_minmax(0,1fr)]">
              <div>
                <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-[#f4f7fb]">
                  <Image
                    src={selectedPreviewImage}
                    alt={selectedDesign.generationType}
                    fill
                    className="object-cover"
                  />
                </div>

                {selectedDesign.resultUrls.length > 1 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                    {selectedDesign.resultUrls.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPreviewImage(variant)}
                        className={`relative h-[82px] w-[110px] flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
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
                )}

                <p className="mt-4 text-center text-[16px] text-[#667085]">
                  {selectedDesign.resultUrls.length} variants available
                </p>
              </div>

              <div>
                <h4 className="mb-4 text-[18px] font-medium uppercase tracking-wide text-[#5f6880]">
                  Design Details
                </h4>

                {/* <div className="rounded-2xl border border-[#dbe7f5] bg-[#edf5ff] p-5">
                  <div className="mb-3 flex items-center gap-2 text-[#2196f3]">
                    <Wand2 className="h-5 w-5" />
                    <span className="text-[16px] font-medium">
                      AI Prompt Used
                    </span>
                  </div>
                  <p className="text-[15px] leading-8 text-[#5f6880]">
                    {selectedDesign.prompt ||
                      "No prompt details available for this generation."}
                  </p>
                </div> */}

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <DetailBox
                    icon={<CalendarDays className="h-5 w-5" />}
                    title="Created"
                    value={format(
                      new Date(selectedDesign.createdAt),
                      "MMM d, yyyy • h:mm a",
                    )}
                  />
                  {/* <DetailBox
                    icon={<Tag className="h-5 w-5" />}
                    title="Credit Cost"
                    value={`${selectedDesign.creditCost} Credits`}
                  /> */}
                  <DetailBox
                    icon={<Monitor className="h-5 w-5" />}
                    title="Platform"
                    value={selectedDesign.platform || "Web Application"}
                  />
                  <DetailBox
                    icon={<Crop className="h-5 w-5" />}
                    title="Format / Size"
                    value={selectedDesign.format || "High Definition"}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                onClick={() =>
                  handleDownload(
                    selectedPreviewImage,
                    selectedDesign.generationType,
                  )
                }
                disabled={selectedDesign.status !== "completed"}
                className="h-16 rounded-[20px] cursor-pointer bg-gradient-to-r from-[#19c5df] to-[#5a6df8] text-[18px] font-medium text-white transition hover:opacity-95 disabled:opacity-50"
              >
                Download
              </button>

              <button
                onClick={handleClosePreview}
                className="h-16 rounded-[20px] cursor-pointer border border-[#d6dbe4] bg-white text-[18px] font-medium text-[#4f46e5] transition hover:bg-gray-50"
              >
                Close
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
