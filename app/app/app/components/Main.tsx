"use client";

import {
  Play,
  Pause,
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
import { useEffect, useState } from "react";
import { useBeats } from "../context/BeatsContext";

const STEPS = 13;
const ROWS = 64;
const STEP_SECONDS = 0.15;
const TOTAL_SECONDS = +(STEPS * STEP_SECONDS * 2).toFixed(2);

const tracks = [
  { name: "SNARE", color: "cyan" },
  { name: "TOM-MID", color: "purple" },
  { name: "CLAP", color: "orange" },
  { name: "KICK", color: "green" },
  { name: "HIHAT-CLOSED", color: "lime" },
  { name: "BONGO", color: "indigo" },
  { name: "BASS", color: "blue" },
  { name: "HIHAT", color: "yellow" },
  { name: "HIHAT-OPEN", color: "teal" },
  { name: "TAMBOURINE", color: "coral" },
  { name: "TOM-HIGH", color: "red" },
  { name: "TOM-LOW", color: "violet" },
  { name: "SAMPLE", color: "pink" },
];

const colorClasses: Record<string, string> = {
  green: "bg-[#12cf8e] border-[#16e0a0] shadow-[0_0_10px_rgba(0,220,150,0.18)]",
  cyan: "bg-[#089da5] border-[#0bbbc3] shadow-[0_0_10px_rgba(0,190,200,0.15)]",
  yellow: "bg-[#c6bd5b] border-[#d3ca69] shadow-[0_0_10px_rgba(210,200,80,0.12)]",
  blue: "bg-[#607fca] border-[#7696e5] shadow-[0_0_10px_rgba(90,120,210,0.15)]",
  pink: "bg-[#9d5b9d] border-[#b66bb6] shadow-[0_0_10px_rgba(180,80,180,0.15)]",
  orange: "bg-[#d97736] border-[#f08b45] shadow-[0_0_10px_rgba(240,130,50,0.18)]",
  red: "bg-[#c74759] border-[#e35c70] shadow-[0_0_10px_rgba(230,70,100,0.16)]",
  purple: "bg-[#7957c8] border-[#9673e8] shadow-[0_0_10px_rgba(140,100,230,0.18)]",
  lime: "bg-[#78a832] border-[#91c443] shadow-[0_0_10px_rgba(140,200,50,0.16)]",
  indigo: "bg-[#4e5db5] border-[#6978d9] shadow-[0_0_10px_rgba(90,100,220,0.16)]",
  coral: "bg-[#cf6654] border-[#ed806c] shadow-[0_0_10px_rgba(230,110,90,0.16)]",
  teal: "bg-[#168c79] border-[#20b49b] shadow-[0_0_10px_rgba(20,180,150,0.16)]",
  violet: "bg-[#a052cc] border-[#bc70e8] shadow-[0_0_10px_rgba(170,80,220,0.18)]",
};

const dotColors: Record<string, string> = {
  green: "bg-[#13d99a]",
  cyan: "bg-[#13d0d7]",
  yellow: "bg-[#d7d067]",
  blue: "bg-[#7195ec]",
  pink: "bg-[#dc8cdb]",
  orange: "bg-[#ff994f]",
  red: "bg-[#f06479]",
  purple: "bg-[#a184f5]",
  lime: "bg-[#a5d957]",
  indigo: "bg-[#8290f0]",
  coral: "bg-[#ff8d79]",
  teal: "bg-[#32cbb0]",
  violet: "bg-[#d184f5]",
};

const GRID_STYLE = {
  display: "grid",
  gridTemplateColumns: `repeat(${STEPS}, minmax(0, 1fr))`,
  gap: 4,
};

const isBeat = (i: number) => i % 4 === 0;

export default function Main() {
  const { beats } = useBeats();

  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [current, setCurrent] = useState(-1);

  const [steps, setSteps] = useState<number[][]>(() =>
    Array.from({ length: ROWS }, (_, row) =>
      Array.from(
        { length: STEPS },
        (_, col) => Number(beats?.[row]?.[col] ?? 0)
      )
    )
  );

  useEffect(() => {
    setSteps(
      Array.from({ length: ROWS }, (_, row) =>
        Array.from(
          { length: STEPS },
          (_, col) => Number(beats?.[row]?.[col] ?? 0)
        )
      )
    );
  }, [beats]);

  useEffect(() => {
    if (!playing) return;

    const id = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + 1;
        if (next < STEPS) return next;
        if (loop) return 0;

        setPlaying(false);
        return -1;
      });
    }, STEP_SECONDS * 1000);

    return () => clearInterval(id);
  }, [playing, loop]);

  const stop = () => {
    setPlaying(false);
    setCurrent(-1);
  };

  const toggleStep = (row: number, col: number) => {
    setSteps((prev) =>
      prev.map((values, r) =>
        r === row
          ? values.map((value, c) =>
              c === col ? (value ? 0 : 1) : value
            )
          : values
      )
    );
  };

  const clearAll = () => {
    setSteps(
      Array.from({ length: ROWS }, () => Array(STEPS).fill(0))
    );
  };

  return (
    <div className="w-full min-w-0 bg-[#090b0e] p-2 text-white">
      <section className="rounded-xl border border-[#292d32] bg-[#111417] p-4">
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.75">
            <button
              onClick={() => setPlaying(!playing)}
              className={`flex h-9 items-center gap-2 rounded-[9px] border px-3.5 text-[11px] transition ${
                playing
                  ? "border-[#00b987] bg-[#093b2d] text-[#00e4a2]"
                  : "border-[#00a97c] bg-[#092d25] text-[#00dfa0]"
              }`}
            >
              {playing ? (
                <Pause size={13} fill="currentColor" strokeWidth={1.5} />
              ) : (
                <Play size={13} fill="currentColor" strokeWidth={1.5} />
              )}
              {playing ? "Pause" : "Play"}
            </button>

            <button
              onClick={stop}
              className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#292e34] bg-[#14171b] text-[#777c84] transition hover:border-[#3c4148] hover:text-white"
            >
              <Square size={11} fill="currentColor" />
            </button>

            <button
              onClick={() => setLoop(!loop)}
              className={`flex h-[36px] w-[36px] items-center justify-center rounded-[9px] border transition ${
                loop
                  ? "border-[#009e77] bg-[#09342a] text-[#00d99b]"
                  : "border-[#292e34] bg-[#14171b] text-[#73777e]"
              }`}
            >
              <Repeat2 size={16} strokeWidth={1.6} />
            </button>

            <button className="flex h-[36px] w-[36px] items-center justify-center rounded-[9px] border border-[#292e34] bg-[#14171b] text-[#73777e] hover:text-white">
              <Timer size={15} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex h-[30px] items-center rounded-[9px] border border-[#292e34] bg-[#15181c] px-[10px] font-mono text-[9px] text-[#b4b7bc]">
              {ROWS} × {STEPS}
            </div>

            <button
              onClick={clearAll}
              className="ml-2 flex h-[30px] items-center rounded-[8px] border border-[#292d32] bg-[#15181c] px-[10px] text-[10px] text-[#8a8e95] transition hover:text-white"
            >
              Clear
            </button>

            <button className="ml-1 flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border border-[#292d32] bg-[#15181c] text-[#686c74]">
              <Search size={14} strokeWidth={1.5} />
            </button>

            <span className="px-2 font-mono text-[9px] text-[#777b83]">
              100%
            </span>

            <button className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border border-[#292d32] bg-[#15181c] text-[#686c74]">
              <ZoomIn size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="mb-[6px] flex">
          <div className="w-[145px] shrink-0" />

          <div className="min-w-0 flex-1" style={GRID_STYLE}>
            {Array.from({ length: STEPS }).map((_, i) => (
              <span
                key={i}
                className={`text-center font-mono text-[9px] ${
                  current === i
                    ? "text-[#00e4a2]"
                    : isBeat(i)
                    ? "text-[#c3c6cb]"
                    : "text-[#5c6068]"
                }`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="max-h-[650px] space-y-[5px] overflow-y-auto overflow-x-hidden pr-1">
          {steps.map((row, rowIndex) => {
            const track = tracks[rowIndex % tracks.length];

            return (
              <div key={rowIndex} className="flex items-center">
                <div className="flex w-[145px] shrink-0 items-center gap-2">
                  <span
                    className={`h-[5px] w-[5px] shrink-0 rounded-full ${dotColors[track.color]}`}
                  />

                  <div className="min-w-0">
                    <span className="mr-2 font-mono text-[9px] text-[#777b83]">
                      {String(rowIndex + 1).padStart(2, "0")}
                    </span>

                    <span className="font-mono text-[9px] tracking-[1px] text-[#a4a7ad]">
                      {track.name}
                    </span>
                  </div>
                </div>

                <div className="min-w-0 flex-1" style={GRID_STYLE}>
                  {row.map((value, index) => {
                    const active = value === 1;
                    const isNow = current === index;

                    return (
                      <button
                        key={index}
                        onClick={() => toggleStep(rowIndex, index)}
                        aria-label={`Row ${rowIndex + 1} ${track.name} step ${index + 1}`}
                        aria-pressed={active}
                        className={`h-[34px] min-w-0 rounded-[6px] border transition-all ${
                          active
                            ? colorClasses[track.color]
                            : isBeat(index)
                            ? "border-[#33383f] bg-[#20242a] hover:border-[#4a5058] hover:bg-[#262b32]"
                            : "border-[#292e34] bg-[#191c20] hover:border-[#41464c] hover:bg-[#20242a]"
                        } ${isNow ? "brightness-150 ring-1 ring-[#00e4a2]/60" : ""}`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <GeneratedBeatPlayer current={current} />
    </div>
  );
}

function GeneratedBeatPlayer({ current }: { current: number }) {
  const elapsed = current < 0 ? 0 : current * STEP_SECONDS;
  const mm = "00";
  const ss = elapsed.toFixed(2).padStart(5, "0");

  return (
    <section className="mt-6 mb-20 rounded-[12px] border border-[#292d32] bg-[#111417] p-[16px]">
      <div className="mb-[14px] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-[10px]">
          <span className="text-[12px] font-medium text-[#e3e4e7]">
            Generated Beat
          </span>

          <span className="font-mono text-[9px] text-[#777b83]">
            {mm}:{ss} / {TOTAL_SECONDS.toFixed(2)}s
          </span>
        </div>

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

          <button className="flex h-[33px] items-center gap-2 rounded-[9px] border border-[#009d73] bg-[#08382c] px-[12px] text-[11px] text-[#00d99b] transition hover:bg-[#0a4638]">
            <Download size={13} />
            Export WAV
          </button>
        </div>
      </div>

      <Waveform current={current} />

      <div className="mt-[11px] font-mono text-[9px] tracking-[1.2px] text-[#72767d]">
        LOOP 1 → {STEPS} · {STEPS} STEPS
      </div>
    </section>
  );
}

const BARS_PER_STEP = 8;

function Waveform({ current }: { current: number }) {
  const source = [
    28, 48, 35, 42, 25, 32, 55, 37, 22, 30, 43, 28, 49, 34,
    25, 44, 60, 32, 41, 27, 38, 52, 30, 22, 48, 35, 26, 44,
    29, 53, 36, 46, 24, 38, 51, 29, 43, 34, 55, 30, 25, 47,
    36, 41, 23, 33, 57, 39, 30, 45, 27, 52, 36, 43, 26, 49,
    33, 58, 30, 45, 25, 37, 50, 29, 42, 34, 55, 27, 39, 48,
    30, 22, 44, 36, 53, 31, 42, 26, 49, 33, 45, 29, 54, 37,
    25, 44, 31, 50, 28, 39, 55, 34, 46, 27, 42, 31, 52, 36,
  ];

  return (
    <div className="relative h-[104px] overflow-hidden rounded-[12px] border border-[#292e34] bg-[#191c22]">
      <div
        className="absolute inset-x-[12px] bottom-[22px] top-[10px]"
        style={GRID_STYLE}
      >
        {Array.from({ length: STEPS }).map((_, step) => (
          <div
            key={step}
            className={`flex min-w-0 items-center justify-between rounded-[4px] px-[1px] ${
              current === step
                ? "bg-[#00d99b]/10"
                : isBeat(step)
                ? "bg-white/[0.025]"
                : ""
            }`}
          >
            {Array.from({ length: BARS_PER_STEP }).map((_, b) => {
              const h = source[(step * BARS_PER_STEP + b) % source.length];

              return (
                <div
                  key={b}
                  className={`w-[2px] shrink-0 rounded-full ${
                    current === step ? "bg-[#00d99b]" : "bg-[#41464e]"
                  }`}
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div
        className="absolute inset-x-[12px] bottom-[5px] font-mono text-[8px] text-[#5c6068]"
        style={GRID_STYLE}
      >
        {Array.from({ length: STEPS }).map((_, i) => (
          <span key={i} className="text-center">
            {isBeat(i) ? i + 1 : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex h-8.25 w-9 items-center justify-center rounded-[9px] border border-[#292e34] bg-[#15181c] text-[#858990] transition hover:border-[#41464a] hover:text-white">
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
    <button className="flex h-8.25 items-center gap-2 rounded-[9px] border border-[#30353b] bg-[#181b20] px-2.75 text-[11px] text-[#b4b7bc] transition hover:border-[#444950] hover:text-white">
      {icon}
      {children}
    </button>
  );
}