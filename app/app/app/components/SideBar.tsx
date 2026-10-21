"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useBeats } from "../context/BeatsContext";

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

  const { setbeats } = useBeats()

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

  const generateBeat = async ()=>{
    try {

    const response = await fetch(
        "https://my-ai-worker.chrahulofficial.workers.dev/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt
          }),
        }
      );

    const data = await response.json();

    console.log(data);

      // const getBeats = await axios.get("http://127.0.0.1:8000/get-beats")
      // setbeats(getBeats.data)
      // return getBeats.data
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <aside className="w-84.5 min-w-84.5 bg-[#0b0d0f] p-1.75 text-white">
      <div className="rounded-xl border border-[#292d31] bg-[#111417] px-4.75 pb-5 pt-4 shadow-[0_0_0_1px_rgba(255,255,255,0.01)]">

        <div className="mb-4.5 flex items-center gap-2">
          <Sparkles
            size={14}
            strokeWidth={1.8}
            className="text-[#00e6a3]"
          />

          <span className="font-mono text-[10px] font-medium tracking-[2px] text-[#9b9da2]">
            AI BEAT GENERATOR
          </span>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="
              h-27.75
              w-full
              resize-none
              rounded-[14px]
              border
              border-[#2b2f34]
              bg-[#191c20]
              px-3
              py-3.25
              text-[13px]
              leading-5.25
              text-[#e4e5e7]
              outline-none
              placeholder:text-[#777a80]
              focus:border-[#3b4447]
            "
          />
          <span className="absolute bottom-2 right-2.5 font-mono text-[8px] text-[#55595f]">
            96
          </span>
        </div>

        <div className="mt-4.25 flex flex-wrap gap-1.5">
          {genres.map((item) => {
            const active = genre === item;

            return (
              <button
                key={item}
                onClick={() => setGenre(item)}
                className={`
                  h-6.75
                  rounded-full
                  border
                  px-2.5
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

        <div className="my-5 h-px bg-[#292d31]" />

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

        <button
          onClick={generateBeat}
          className="
            mt-5.75
            flex
            h-11
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
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

        <div className="mt-5.5">
          <div className="mb-2.25 font-mono text-[10px] tracking-[1.8px] text-[#8a8d92]">
            GENERATE MODE
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {modes.map((item) => {
              const active = mode === item;

              return (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={`
                    h-8.75
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
    <div className="mb-4.5">

      <div className="mb-1.75 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[1.6px] text-[#85888e]">
          {label}
        </span>

        <span className="text-[10px] text-[#c4c6ca]">
          {display}
        </span>
      </div>

      <div className="relative h-1.5">
        <div className="absolute top-px h-1.25 w-full rounded-full bg-[#073e32]" />

        <div
          className="absolute top-px h-1.25 rounded-full bg-[#00d99b]"
          style={{ width: `${percentage}%` }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            absolute
            -top-1.25
            h-4
            w-full
            cursor-pointer
            appearance-none
            bg-transparent
            outline-none

            [&::-webkit-slider-runnable-track]:h-1.25
            [&::-webkit-slider-runnable-track]:bg-transparent

            [&::-webkit-slider-thumb]:-mt-1.25
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-[#00b987]
            [&::-webkit-slider-thumb]:bg-[#111417]

            [&::-moz-range-track]:h-1.25
            [&::-moz-range-track]:bg-transparent

            [&::-moz-range-thumb]:h-3.75
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border
            [&::-moz-range-thumb]:border-[#00b987]
            [&::-moz-range-thumb]:bg-[#111417]
          "
        />
      </div>

      {(leftLabel || rightLabel) && (
        <div className="mt-1.25 flex justify-between">
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