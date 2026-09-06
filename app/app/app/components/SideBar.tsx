"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";

const genres = [
  "Trap",
  "Hip-Hop",
  "Lo-Fi",
  "House",
  "Drill",
  "Boom Bap",
  "R&B",
  "Experimental",
];

const modes = ["Full Beat", "Drum Pattern", "Bass Pattern", "Variation"];

export default function SideBar() {
  const [genre, setGenre] = useState("Trap");
  const [prompt, setPrompt] = useState(
    "Dark atmospheric trap beat with punchy drums and deep bass"
  );

  const [bpm, setBpm] = useState(139);
  const [energy, setEnergy] = useState(68);
  const [complexity, setComplexity] = useState(46);
  const [swing, setSwing] = useState(38);
  const [variation, setVariation] = useState(49);

  const [mode, setMode] = useState("Full Beat");

  return (
    <aside className="w-[338px] min-w-[338px] bg-[#0b0d0f] p-[7px] text-white">
      <div className="rounded-[12px] border border-[#292d31] bg-[#111417] px-[19px] pb-5 pt-[16px] shadow-[0_0_0_1px_rgba(255,255,255,0.01)]">

        {/* Header */}
        <div className="mb-[18px] flex items-center gap-2">
          <Sparkles
            size={14}
            strokeWidth={1.8}
            className="text-[#00e6a3]"
          />

          <span className="font-mono text-[10px] font-medium tracking-[2px] text-[#9b9da2]">
            AI BEAT GENERATOR
          </span>
        </div>

        {/* Prompt */}
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="
              h-[111px]
              w-full
              resize-none
              rounded-[14px]
              border
              border-[#2b2f34]
              bg-[#191c20]
              px-3
              py-[13px]
              text-[13px]
              leading-[21px]
              text-[#e4e5e7]
              outline-none
              placeholder:text-[#777a80]
              focus:border-[#3b4447]
            "
          />

          {/* small character indicator */}
          <span className="absolute bottom-[8px] right-[10px] font-mono text-[8px] text-[#55595f]">
            96
          </span>
        </div>

        {/* Genres */}
        <div className="mt-[17px] flex flex-wrap gap-[6px]">
          {genres.map((item) => {
            const active = genre === item;

            return (
              <button
                key={item}
                onClick={() => setGenre(item)}
                className={`
                  h-[27px]
                  rounded-full
                  border
                  px-[10px]
                  text-[11px]
                  transition
                  ${
                    active
                      ? "border-[#00b987] bg-[#0b3026] text-[#00e5a4]"
                      : "border-[#30343a] bg-[#15181c] text-[#858990] hover:border-[#41464d] hover:text-[#b7b9bd]"
                  }
                `}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-[20px] h-px bg-[#292d31]" />

        {/* BPM */}
        <SliderControl
          label="BPM"
          value={bpm}
          display={`${bpm}`}
          min={60}
          max={200}
          leftLabel=""
          rightLabel=""
          onChange={setBpm}
        />

        {/* Energy */}
        <SliderControl
          label="ENERGY"
          value={energy}
          display={`${energy}%`}
          min={0}
          max={100}
          leftLabel="LOW"
          rightLabel="HIGH"
          onChange={setEnergy}
        />

        {/* Complexity */}
        <SliderControl
          label="COMPLEXITY"
          value={complexity}
          display={`${complexity}%`}
          min={0}
          max={100}
          leftLabel="SIMPLE"
          rightLabel="COMPLEX"
          onChange={setComplexity}
        />

        {/* Swing */}
        <SliderControl
          label="SWING"
          value={swing}
          display={`${swing}%`}
          min={0}
          max={100}
          leftLabel="0%"
          rightLabel="100%"
          onChange={setSwing}
        />

        {/* Variation */}
        <SliderControl
          label="VARIATION"
          value={variation}
          display={`${variation}%`}
          min={0}
          max={100}
          leftLabel="LOW"
          rightLabel="HIGH"
          onChange={setVariation}
        />

        {/* Generate button */}
        <button
          className="
            mt-[23px]
            flex
            h-[44px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-[12px]
            border
            border-[#009d72]
            bg-[#0b382c]
            text-[13px]
            font-medium
            text-[#00e6a3]
            transition
            hover:bg-[#0d4638]
            active:scale-[0.99]
          "
        >
          <Sparkles size={16} strokeWidth={1.8} />
          Generate Beat
        </button>

        {/* Generate Mode */}
        <div className="mt-[22px]">
          <div className="mb-[9px] font-mono text-[10px] tracking-[1.8px] text-[#8a8d92]">
            GENERATE MODE
          </div>

          <div className="grid grid-cols-2 gap-[6px]">
            {modes.map((item) => {
              const active = mode === item;

              return (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={`
                    h-[35px]
                    rounded-[9px]
                    border
                    text-[11px]
                    transition
                    ${
                      active
                        ? "border-[#5369a8] bg-[#20283f] text-[#e3e6ef]"
                        : "border-[#292d32] bg-[#15181c] text-[#777b83] hover:border-[#3b4047] hover:text-[#aaaeb5]"
                    }
                  `}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────
   Slider Component
───────────────────────────────────────────── */

type SliderControlProps = {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  leftLabel: string;
  rightLabel: string;
  onChange: (value: number) => void;
};

function SliderControl({
  label,
  value,
  display,
  min,
  max,
  leftLabel,
  rightLabel,
  onChange,
}: SliderControlProps) {
  const percentage =
    ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-[18px]">

      {/* Label + Value */}
      <div className="mb-[7px] flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[1.6px] text-[#85888e]">
          {label}
        </span>

        <span className="text-[10px] text-[#c4c6ca]">
          {display}
        </span>
      </div>

      {/* Slider */}
      <div className="relative h-[6px]">
        {/* Track */}
        <div className="absolute top-[1px] h-[5px] w-full rounded-full bg-[#073e32]" />

        {/* Progress */}
        <div
          className="absolute top-[1px] h-[5px] rounded-full bg-[#00d99b]"
          style={{ width: `${percentage}%` }}
        />

        {/* Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            absolute
            top-[-5px]
            h-[16px]
            w-full
            cursor-pointer
            appearance-none
            bg-transparent
            outline-none

            [&::-webkit-slider-runnable-track]:h-[5px]
            [&::-webkit-slider-runnable-track]:bg-transparent

            [&::-webkit-slider-thumb]:mt-[-5px]
            [&::-webkit-slider-thumb]:h-[16px]
            [&::-webkit-slider-thumb]:w-[16px]
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-[#00b987]
            [&::-webkit-slider-thumb]:bg-[#111417]

            [&::-moz-range-track]:h-[5px]
            [&::-moz-range-track]:bg-transparent

            [&::-moz-range-thumb]:h-[15px]
            [&::-moz-range-thumb]:w-[15px]
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border
            [&::-moz-range-thumb]:border-[#00b987]
            [&::-moz-range-thumb]:bg-[#111417]
          "
        />
      </div>

      {/* Range labels */}
      {(leftLabel || rightLabel) && (
        <div className="mt-[5px] flex justify-between">
          <span className="font-mono text-[8px] tracking-[1px] text-[#65696f]">
            {leftLabel}
          </span>

          <span className="font-mono text-[8px] tracking-[1px] text-[#65696f]">
            {rightLabel}
          </span>
        </div>
      )}
    </div>
  );
}