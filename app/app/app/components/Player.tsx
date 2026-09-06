"use client";

import {
  Play,
  Square,
  Repeat2,
  Volume2,
  Cpu,
  LockKeyhole,
} from "lucide-react";
import { useState } from "react";

export default function Player() {
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [volume, setVolume] = useState(78);
  const [cpu, setCpu] = useState(22);

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50
        h-[58px]
        border-t border-[#292d32]
        bg-[#0d0f12]
        text-white
      "
    >
      <div className="relative flex h-full items-center px-3">

        {/* =====================================================
            LEFT — TRANSPORT
        ====================================================== */}

        <div className="flex items-center gap-[7px]">

          {/* Play */}
          <button
            onClick={() => setPlaying(!playing)}
            className={`
              flex h-[36px] w-[36px]
              items-center justify-center
              rounded-[9px]
              border
              transition
              ${
                playing
                  ? "border-[#00d99b] bg-[#09352a] text-[#00e5a4]"
                  : "border-[#00b987] bg-[#092c24] text-[#00d99b]"
              }
            `}
          >
            <Play
              size={15}
              fill="currentColor"
              strokeWidth={1.5}
            />
          </button>

          {/* Stop */}
          <button
            onClick={() => setPlaying(false)}
            className="
              flex h-[36px] w-[36px]
              items-center justify-center
              rounded-[9px]
              border border-[#292e34]
              bg-[#15181c]
              text-[#777b82]
              transition
              hover:border-[#3c4249]
              hover:text-white
            "
          >
            <Square
              size={11}
              fill="currentColor"
              strokeWidth={1}
            />
          </button>

          {/* Loop */}
          <button
            onClick={() => setLoop(!loop)}
            className={`
              flex h-[36px] w-[36px]
              items-center justify-center
              rounded-[9px]
              border
              transition
              ${
                loop
                  ? "border-[#00a97c] bg-[#09372b] text-[#00dfa0]"
                  : "border-[#292e34] bg-[#15181c] text-[#73777e]"
              }
            `}
          >
            <Repeat2 size={16} strokeWidth={1.6} />
          </button>
        </div>

        {/* =====================================================
            CENTER — BPM / TIME
        ====================================================== */}

        <div
          className="
            absolute
            left-1/2
            flex
            -translate-x-1/2
            items-center
          "
        >
          {/* BPM */}
          <div className="flex items-baseline">
            <span className="text-[18px] font-medium tracking-[0.5px] text-[#e6e7e9]">
              128
            </span>

            <span className="ml-[7px] font-mono text-[9px] tracking-[1.5px] text-[#7d8188]">
              BPM
            </span>
          </div>

          {/* Divider */}
          <div className="mx-[22px] h-[20px] w-px bg-[#292d32]" />

          {/* Time */}
          <div className="font-mono text-[12px] tracking-[0.5px]">
            <span className="text-[#e0e2e5]">
              00:00.00
            </span>

            <span className="mx-[10px] text-[#51555c]">
              /
            </span>

            <span className="text-[#777b82]">
              00:16.00
            </span>
          </div>
        </div>

        {/* =====================================================
            RIGHT — OUTPUT / VOLUME / CPU
        ====================================================== */}

        <div className="ml-auto flex items-center gap-[18px]">

          {/* Volume */}
          <div className="flex items-center gap-[8px]">

            <Volume2
              size={13}
              strokeWidth={1.5}
              className="text-[#777b82]"
            />

            <div className="relative h-[4px] w-[111px]">
              {/* Track */}
              <div className="absolute inset-0 rounded-full bg-[#164b3f]" />

              {/* Progress */}
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-[#00d99b]"
                style={{
                  width: `${volume}%`,
                }}
              />

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) =>
                  setVolume(Number(e.target.value))
                }
                className="
                  absolute
                  -top-[6px]
                  left-0
                  h-[16px]
                  w-full
                  cursor-pointer
                  appearance-none
                  bg-transparent

                  [&::-webkit-slider-runnable-track]:bg-transparent

                  [&::-webkit-slider-thumb]:mt-[-5px]
                  [&::-webkit-slider-thumb]:h-[15px]
                  [&::-webkit-slider-thumb]:w-[15px]
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:border
                  [&::-webkit-slider-thumb]:border-[#00b987]
                  [&::-webkit-slider-thumb]:bg-[#111417]

                  [&::-moz-range-track]:bg-transparent

                  [&::-moz-range-thumb]:h-[14px]
                  [&::-moz-range-thumb]:w-[14px]
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:border
                  [&::-moz-range-thumb]:border-[#00b987]
                  [&::-moz-range-thumb]:bg-[#111417]
                "
              />
            </div>

            <span className="w-[18px] font-mono text-[9px] text-[#777b82]">
              {volume}
            </span>
          </div>

          {/* CPU */}
          <div className="flex items-center gap-[8px]">

            <Cpu
              size={14}
              strokeWidth={1.4}
              className="text-[#777b82]"
            />

            <div className="relative h-[4px] w-[58px]">
              <div className="absolute inset-0 rounded-full bg-[#292e34]" />

              <div
                className="absolute left-0 top-0 h-full rounded-full bg-[#00b987]"
                style={{
                  width: `${cpu}%`,
                }}
              />
            </div>

            <span className="font-mono text-[9px] text-[#777b82]">
              {cpu}%
            </span>
          </div>

          {/* Output */}
          <div className="flex items-center gap-[6px]">

            <LockKeyhole
              size={12}
              strokeWidth={1.4}
              className="text-[#777b82]"
            />

            <span className="font-mono text-[9px] text-[#888c93]">
              Studio Out · 48k
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}