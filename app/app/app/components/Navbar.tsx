"use client";

import {
  Upload,
  Music2,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-13.5 w-full border-b border-[#292b30] bg-[#0d0f12] text-white">
      <div className="relative flex h-full items-center px-3">

        <div className="flex items-center gap-3">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-[9px] bg-[#19d3a2]">
            <div className="relative flex h-4.5 w-4.5 items-center justify-center">
              <Music2
                size={17}
                strokeWidth={2.5}
                className="text-[#07100d]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold tracking-[3px] text-[#e8e8ea]">
              BEATLAB
            </span>

            <span className="rounded-sm border border-[#087c62] bg-[#0d2922] px-1.25 py-px text-[9px] font-medium tracking-[1px] text-[#20d7a7]">
              AI
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1">


          <button
            className="
              ml-1 flex h-8.5 items-center gap-2
              rounded-[9px]
              border border-[#36383e]
              bg-[#17191d]
              px-3
              text-[11px] font-medium text-[#e4e5e7]
              transition hover:bg-[#1d2025]
            "
          >
            <Upload size={14} strokeWidth={1.7} />
            Export
          </button>

          <button
            className="
              ml-2 flex h-8.5 w-8.5
              items-center justify-center
              rounded-full
              bg-[#1d2025]
              text-[10px] font-medium
              text-[#bfc1c6]
            "
          >
            NV
          </button>
        </div>
      </div>
    </header>
  );
}