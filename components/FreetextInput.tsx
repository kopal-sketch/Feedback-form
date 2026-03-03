"use client";

import { useState } from "react";

interface FreetextInputProps {
  placeholder?: string;
  onSubmit: (value: string) => void;
}

export default function FreetextInput({
  placeholder = "Share your thoughts...",
  onSubmit,
}: FreetextInputProps) {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 rounded-xl border-2 border-pop-sage/40 bg-white/80 text-pop-forest placeholder:text-pop-forest/50 focus:outline-none focus:border-pop-sage resize-none"
      />
      <button
        type="button"
        onClick={() => {
          onSubmit(value.trim());
          setValue("");
        }}
        className="px-5 py-2.5 rounded-xl bg-pop-forest text-white font-medium hover:bg-pop-forest/90 transition-colors w-fit"
      >
        Continue
      </button>
    </div>
  );
}
