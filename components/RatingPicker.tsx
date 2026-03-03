"use client";

import { useState } from "react";

const EMOJI_MAP: Record<number, string> = {
  1: "😞",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😊",
};

interface RatingPickerProps {
  onSelect: (rating: number) => void;
  label?: string;
}

export default function RatingPicker({
  onSelect,
  label = "Tap one — 1 is rough, 5 is great",
}: RatingPickerProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-pop-forest/80 font-medium">{label}</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className="rating-btn cursor-pointer flex items-center justify-center"
          >
            <input
              type="radio"
              name="rating"
              value={n}
              className="sr-only"
              checked={selected === n}
              onChange={() => setSelected(n)}
            />
            <span className="rating-num w-12 h-12 rounded-xl border-2 border-pop-sage/60 flex items-center justify-center text-2xl transition-all duration-200">
              {EMOJI_MAP[n]}
            </span>
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={() => selected != null && onSelect(selected)}
        disabled={selected == null}
        className="mt-2 px-5 py-2.5 rounded-xl bg-pop-forest text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pop-forest/90 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
