"use client";

import { useState } from "react";

interface ChoiceChipsProps {
  options: string[];
  multiselect?: boolean;
  allowOther?: boolean;
  onSelect: (value: string | string[]) => void;
}

export default function ChoiceChips({
  options,
  multiselect = false,
  allowOther = false,
  onSelect,
}: ChoiceChipsProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");

  const handleDone = () => {
    if (multiselect) {
      const val = [...selected];
      if (allowOther && otherText.trim()) val.push("Other: " + otherText.trim());
      if (val.length === 0) return;
      onSelect(val);
    } else {
      if (selected.length > 0) {
        onSelect(selected[0]);
      } else if (allowOther && otherText.trim()) {
        onSelect("Other: " + otherText.trim());
      }
    }
  };

  const canSubmit = multiselect
    ? selected.length > 0 || (allowOther && otherText.trim() !== "")
    : selected.length > 0 || (allowOther && otherText.trim() !== "");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isChecked = selected.includes(opt);
          return (
            <label
              key={opt}
              className="choice-chip cursor-pointer inline-flex items-center"
            >
              <input
                type={multiselect ? "checkbox" : "radio"}
                name={multiselect ? "choices" : "choice"}
                value={opt}
                className="sr-only"
                checked={isChecked}
                onChange={() => {
                  if (multiselect) {
                    setSelected((prev) =>
                      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
                    );
                  } else {
                    setSelected([opt]);
                  }
                }}
              />
              <span className="inline-block px-4 py-2.5 rounded-xl border-2 border-pop-sage/60 text-pop-forest text-sm font-medium transition-all duration-200">
                {opt}
              </span>
            </label>
          );
        })}
      </div>
      {allowOther && (
        <input
          type="text"
          placeholder="Something else? (optional)"
          value={otherText}
          onChange={(e) => setOtherText(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 rounded-xl border-2 border-pop-sage/40 bg-white/80 text-pop-forest placeholder:text-pop-forest/50 focus:outline-none focus:border-pop-sage"
        />
      )}
      <button
        type="button"
        onClick={handleDone}
        disabled={!canSubmit}
        className="mt-1 px-5 py-2.5 rounded-xl bg-pop-forest text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pop-forest/90 transition-colors w-fit"
      >
        Continue
      </button>
    </div>
  );
}
