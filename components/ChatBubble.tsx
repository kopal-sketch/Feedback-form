"use client";

import { useEffect, useRef } from "react";

interface ChatBubbleProps {
  text: string;
  isUser?: boolean;
  meta?: string;
}

export default function ChatBubble({ text, isUser = false, meta }: ChatBubbleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  return (
    <div
      ref={ref}
      className={`bubble-enter flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-pop-forest text-white rounded-br-md"
            : "bg-white text-pop-forest shadow-sm border border-pop-mint/50 rounded-bl-md"
        }`}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{text}</p>
        {meta && (
          <p className="mt-1 text-xs opacity-80">{meta}</p>
        )}
      </div>
    </div>
  );
}
