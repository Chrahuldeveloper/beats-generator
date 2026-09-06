"use client";

import {
  Play,
  Square,
  Repeat2,
  Timer,
  Search,
  ZoomIn,
  Volume2,
  Headphones,
  RefreshCw,
  Save,
  Download,
} from "lucide-react";
import { useState } from "react";

const tracks = [
  {
    name: "KICK",
    color: "green",
    active: [0, 8],
  },
  {
    name: "SNARE",
    color: "cyan",
    active: [4, 12],
  },
  {
    name: "HI-HAT",
    color: "yellow",
    active: [0, 2, 4, 6, 8, 10, 12, 14],
  },
  {
    name: "BASS",
    color: "blue",
    active: [0, 6, 8],
  },
  {
    name: "SAMPLE",
    color: "pink",
    active: [12],
  },
];

const colorClasses: Record<string, string> = {
  green:
    "bg-[#12cf8e] border-[#16e0a0] shadow-[0_0_10px_rgba(0,220,150,0.18)]",
  cyan:
    "bg-[#089da5] border-[#0bbbc3] shadow-[0_0_10px_rgba(0,190,200,0.15)]",
  yellow:
    "bg-[#c6bd5b] border-[#d3ca69] shadow-[0_0_10px_rgba(210,200,80,0.12)]",
  blue:
    "bg-[#607fca] border-[#7696e5] shadow-[0_0_10px_rgba(90,120,210,0.15)]",
  pink:
    "bg-[#9d5b9d] border-[#b66bb6] shadow-[0_0_10px_rgba(180,80,180,0.15)]",
};

const dotColors: Record<string, string> = {
  green: "bg-[#13d99a]",
  cyan: "bg-[#13d0d7]",
  yellow: "bg-[#d7d067]",
  blue: "bg-[#7195ec]",
  pink: "bg-[#dc8cdb]",
};

export default function Main() {
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);

  const [steps, setSteps] = useState<Record<string, number[]>>(
    Object.fromEntries(
      tracks.map((track) => [track.name, track.active])
    )
  );

  const toggleStep = (trackName: string, index: number) => {
    setSteps((prev) => {
      const current = prev[trackName] || [];

      return {
        ...prev,
        [trackName]: current.includes(index)
          ? current.filter((i) => i !== index)
          : [...current, index],
      };
    });
  };

  return (
    <div className="w-full min-w-0 bg-[#090b0e] p-[8px] text-white">

      {/* =====================================================
          SEQUENCER
      ====================================================== */}

      <section className="rounded-[12px] border border-[#292d32] bg-[#111417] p-[16px]">

        {/* Top controls */}
        <div className="mb-[13px] flex items-center justify-between">

          {/* Left controls */}
          <div className="flex items-center gap-[7px]">

            {/* Play */}
            <button
              onClick={() => setPlaying(!playing)}
              className={`
                flex h-[36px] items-center gap-2 rounded-[9px]
                border px-[14px] text-[11px]
                transition
                ${
                  playing
                    ? "border-[#00b987] bg-[#093b2d] text-[#00e4a2]"
                    : "border-[#00a97c] bg-[#092d25] text-[#00dfa0]"
                }
              `}
            >
              <Play
                size={13}
                fill="currentColor"
                strokeWidth={1.5}
              />
              Play
            </button>

            {/* Stop */}
            <button
              className="
                flex h-[36px] w-[36px] items-center justify-center
                rounded-[9px]
                border border-[#292e34]
                bg-[#14171b]
                text-[#777c84]
                transition
                hover:border-[#3c4148]
                hover:text-white
              "
            >
              <Square size={11} fill="currentColor" />
            </button>

            {/* Loop */}
            <button
              onClick={() => setLoop(!loop)}
              className={`
                flex h-[36px] w-[36px] items-center justify-center
                rounded-[9px] border transition
                ${
                  loop
                    ? "border-[#009e77] bg-[#09342a] text-[#00d99b]"
                    : "border-[#292e34] bg-[#14171b] text-[#73777e]"
                }
              `}
            >
              <Repeat2 size={16} strokeWidth={1.6} />
            </button>

            {/* Timer */}
            <button
              className="
                flex h-[36px] w-[36px] items-center justify-center
                rounded-[9px] border border-[#292e34]
                bg-[#14171b]
                text-[#73777e]
                hover:text-white
              "
            >
              <Timer size={15} strokeWidth={1.5} />
            </button>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">

            {/* Steps */}
            <div className="flex h-[30px] items-center rounded-[9px] border border-[#292e34] bg-[#15181c] p-[2px]">
              {["16", "32", "64"].map((value, index) => (
                <button
                  key={value}
                  className={`
                    h-[24px] min-w-[34px] rounded-[6px]
                    font-mono text-[9px]
                    ${
                      index === 0
                        ? "bg-[#25292f] text-[#e5e6e8]"
                        : "text-[#676b73]"
                    }
                  `}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Zoom out */}
            <button className="ml-2 flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border border-[#292d32] bg-[#15181c] text-[#686c74]">
              <Search size={14} strokeWidth={1.5} />
            </button>

            <span className="px-2 font-mono text-[9px] text-[#777b83]">
              100%
            </span>

            {/* Zoom in */}
            <button className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border border-[#292d32] bg-[#15181c] text-[#686c74]">
              <ZoomIn size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Beat numbers */}
        <div className="ml-[98px] flex h-[24px]">

          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className="flex w-[136px] items-center"
            >
              <span className="font-mono text-[9px] text-[#92969d]">
                {bar}
              </span>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="space-y-[5px]">

          {tracks.map((track) => (
            <div
              key={track.name}
              className="flex items-center"
            >

              {/* Track name */}
              <div className="flex w-[98px] shrink-0 items-center gap-2">
                <span
                  className={`h-[5px] w-[5px] rounded-full ${dotColors[track.color]}`}
                />

                <span className="font-mono text-[9px] tracking-[1.5px] text-[#a4a7ad]">
                  {track.name}
                </span>
              </div>

              {/* Steps */}
              <div className="flex gap-[5px]">
                {Array.from({ length: 16 }).map((_, index) => {
                  const active =
                    steps[track.name]?.includes(index);

                  return (
                    <button
                      key={index}
                      onClick={() =>
                        toggleStep(track.name, index)
                      }
                      className={`
                        h-[30px]
                        w-[30px]
                        rounded-[6px]
                        border
                        transition-all
                        ${
                          active
                            ? colorClasses[track.color]
                            : "border-[#292e34] bg-[#191c20] hover:border-[#41464c] hover:bg-[#20242a]"
                        }
                      `}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          GENERATED BEAT
      ====================================================== */}

      <GeneratedBeatPlayer />
    </div>
  );
}

/* ============================================================
   GENERATED BEAT PLAYER
============================================================ */

function GeneratedBeatPlayer() {
  return (
    <section className="mt-[11px] rounded-[12px] border border-[#292d32] bg-[#111417] p-[16px]">

      {/* Header */}
      <div className="mb-[14px] flex items-center justify-between">

        <div className="flex items-center gap-[10px]">
          <span className="text-[12px] font-medium text-[#e3e4e7]">
            Generated Beat
          </span>

          <span className="font-mono text-[9px] text-[#777b83]">
            — 00:16 | 00:00.00
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-[6px]">

          <IconButton>
            <Volume2 size={15} strokeWidth={1.5} />
          </IconButton>

          <IconButton>
            <Headphones size={15} strokeWidth={1.5} />
          </IconButton>

          <ActionButton icon={<RefreshCw size={13} />}>
            Regenerate
          </ActionButton>

          <ActionButton icon={<Save size={13} />}>
            Save Pattern
          </ActionButton>

          <button
            className="
              flex h-[33px] items-center gap-2
              rounded-[9px]
              border border-[#009d73]
              bg-[#08382c]
              px-[12px]
              text-[11px]
              text-[#00d99b]
              transition
              hover:bg-[#0a4638]
            "
          >
            <Download size={13} />
            Export WAV
          </button>
        </div>
      </div>

      {/* Waveform */}
      <Waveform />

      {/* Footer */}
      <div className="mt-[11px] font-mono text-[9px] tracking-[1.2px] text-[#72767d]">
        LOOP REGION · 1.1.1 → 4.4.4 · 16 BARS QUANTIZED
      </div>
    </section>
  );
}

/* ============================================================
   WAVEFORM
============================================================ */

function Waveform() {
  const bars = [
    28, 48, 35, 42, 25, 32, 55, 37, 22, 30, 43, 28, 49, 34,
    25, 44, 60, 32, 41, 27, 38, 52, 30, 22, 48, 35, 26, 44,
    29, 53, 36, 46, 24, 38, 51, 29, 43, 34, 55, 30, 25, 47,
    36, 41, 23, 33, 57, 39, 30, 45, 27, 52, 36, 43, 26, 49,
    33, 58, 30, 45, 25, 37, 50, 29, 42, 34, 55, 27, 39, 48,
    30, 22, 44, 36, 53, 31, 42, 26, 49, 33, 45, 29, 54, 37,
    25, 44, 31, 50, 28, 39, 55, 34, 46, 27, 42, 31, 52, 36,
    29, 48, 34, 41, 25, 55, 32, 46, 29, 39, 51, 28, 44, 35,
    24, 49, 31, 43, 26, 56, 34, 45, 30, 40, 53, 29, 47, 36,
    25, 42, 31, 51, 28, 44, 34, 48,
  ];

  return (
    <div className="relative h-[104px] overflow-hidden rounded-[12px] border border-[#292e34] bg-[#191c22]">

      {/* Playhead */}
      <div className="absolute bottom-[18px] left-[12px] top-[18px] z-10 w-[4px] rounded-full bg-[#00d99b]" />

      {/* Waveform bars */}
      <div className="absolute inset-x-[12px] bottom-[20px] top-[13px] flex items-center gap-[3px]">
        {bars.map((height, index) => (
          <div
            key={index}
            className={`
              w-[4px] shrink-0 rounded-full
              ${index === 0 ? "bg-[#00d99b]" : "bg-[#41464e]"}
            `}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      {/* Timeline */}
      <div className="absolute bottom-[5px] left-[13px] right-[12px] flex justify-between font-mono text-[8px] text-[#5c6068]">
        <span>00:00</span>
        <span>00:04</span>
        <span>00:08</span>
        <span>00:12</span>
        <span>00:16</span>
      </div>

      {/* End marker */}
      <div className="absolute bottom-0 right-[74px] top-0 w-px bg-[#50618a]" />
    </div>
  );
}

/* ============================================================
   SMALL BUTTONS
============================================================ */

function IconButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      className="
        flex h-[33px] w-[36px]
        items-center justify-center
        rounded-[9px]
        border border-[#292e34]
        bg-[#15181c]
        text-[#858990]
        transition
        hover:border-[#41464a]
        hover:text-white
      "
    >
      {children}
    </button>
  );
}

function ActionButton({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <button
      className="
        flex h-[33px] items-center gap-2
        rounded-[9px]
        border border-[#30353b]
        bg-[#181b20]
        px-[11px]
        text-[11px]
        text-[#b4b7bc]
        transition
        hover:border-[#444950]
        hover:text-white
      "
    >
      {icon}
      {children}
    </button>
  );
}