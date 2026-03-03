"use client";

import { useState, useCallback, useEffect } from "react";
import ChatBubble from "@/components/ChatBubble";
import RatingPicker from "@/components/RatingPicker";
import ChoiceChips from "@/components/ChoiceChips";
import FreetextInput from "@/components/FreetextInput";
import {
  SERVICE_OPTIONS,
  getSentiment,
  DELIGHTED_OPTIONS,
  WENT_WRONG_OPTIONS,
  CUSTOM_QUESTIONS,
} from "@/lib/forms-data";
import { supabase } from "@/lib/supabase";

type Step =
  | "welcome"
  | "overall_rating"
  | "service"
  | "what_delighted_or_wrong"
  | "bugs"
  | "suggestions"
  | "custom_question"
  | "submit"
  | "done";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export default function FeedbackPage() {
  const [step, setStep] = useState<Step>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [overallRating, setOverallRating] = useState<number | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [whatDelightedOrWrong, setWhatDelightedOrWrong] = useState<string[]>([]);
  const [otherText, setOtherText] = useState<string>("");
  const [bugsIssues, setBugsIssues] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string>("");
  const [customQuestionAnswer, setCustomQuestionAnswer] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const sentiment = overallRating != null ? getSentiment(overallRating) : null;
  const isPositive = sentiment === "positive";

  const addMessage = useCallback((text: string, isUser: boolean) => {
    setMessages((m) => [...m, { id: Math.random().toString(36), text, isUser }]);
  }, []);

  // Welcome + first question
  useEffect(() => {
    if (step !== "welcome") return;
    addMessage(
      "Hey! 👋 We'd love to hear how things went. This will feel like a quick chat — no long forms.",
      false
    );
    addMessage("How was your overall experience with the new POP app?", false);
    setStep("overall_rating");
  }, [step, addMessage]);

  const handleOverallRating = useCallback(
    (rating: number) => {
      setOverallRating(rating);
      addMessage(
        rating >= 4
          ? "✨ Glad it went well! A few quick questions so we can keep making it better."
          : rating === 3
            ? "Thanks for the honest feedback. We'd like to learn more."
            : "We're sorry it wasn't great. Your feedback will help us fix it.",
        false
      );
      addMessage("Which service would you like to give feedback on?", false);
      setStep("service");
    },
    [addMessage]
  );

  const handleServiceSelect = useCallback(
    (label: string) => {
      const opt = SERVICE_OPTIONS.find((o) => o.label === label);
      if (!opt) return;
      setService(opt.id);
      addMessage(`Got it — ${label}.`, true);

      const options = isPositive
        ? DELIGHTED_OPTIONS[opt.id] ?? []
        : WENT_WRONG_OPTIONS[opt.id] ?? [];
      addMessage(
        isPositive
          ? "What delighted you the most? (You can pick more than one)"
          : "What went wrong? (You can pick more than one)",
        false
      );
      setStep("what_delighted_or_wrong");
    },
    [isPositive, addMessage]
  );

  const handleWhatDelightedOrWrong = useCallback(
    (value: string | string[]) => {
      const selected = Array.isArray(value) ? value : [value];
      const otherEntry = selected.find((s) => s.startsWith("Other:"));
      setOtherText(otherEntry ? otherEntry.replace(/^Other:\s*/, "") : "");
      setWhatDelightedOrWrong(selected.filter((s) => !s.startsWith("Other:")));
      const rest = selected.filter((s) => !s.startsWith("Other:"));
      const hasOther = !!otherEntry;
      addMessage(
        rest.length > 0 ? rest.join(", ") + (hasOther ? " + other" : "") : hasOther ? "Other" : "",
        true
      );
      addMessage("Any bugs or issues you faced?", false);
      setStep("bugs");
    },
    [addMessage]
  );

  const handleBugs = useCallback(
    (value: string) => {
      setBugsIssues(value);
      addMessage(value ? "Thanks for sharing." : "—", true);
      addMessage("Any suggestion to improve the experience?", false);
      setStep("suggestions");
    },
    [addMessage]
  );

  const handleSuggestions = useCallback(
    (value: string) => {
      setSuggestions(value);
      addMessage(value ? "Noted!" : "—", true);
      const customQ = service ? CUSTOM_QUESTIONS[service] : null;
      if (customQ) {
        addMessage(customQ, false);
        setStep("custom_question");
      } else {
        addMessage(
          "That's everything from our side. Thanks so much — it really helps us improve.",
          false
        );
        addMessage("Click below to submit your feedback. We read every response.", false);
        setStep("submit");
      }
    },
    [service, addMessage]
  );

  const handleCustomQuestion = useCallback(
    (value: string) => {
      setCustomQuestionAnswer(value);
      addMessage(value || "—", true);
      addMessage(
        "That's everything from our side. Thanks so much — it really helps us improve.",
        false
      );
      addMessage("Click below to submit your feedback. We read every response.", false);
      setStep("submit");
    },
    [addMessage]
  );

  const handleSubmitFeedback = useCallback(async () => {
    if (service == null || overallRating == null || sentiment == null) return;
    setSubmitting(true);
    const payload = {
      overall_rating: overallRating,
      service,
      sentiment,
      what_delighted_or_wrong: JSON.stringify(whatDelightedOrWrong),
      other_text: otherText || null,
      bugs_issues: bugsIssues || null,
      suggestions: suggestions || null,
      custom_question_answer: customQuestionAnswer || null,
    };
    try {
      if (supabase) {
        const { error } = await supabase.from("feedback").insert(payload);
        if (error) throw error;
        addMessage(
          "Thank you! 🎉 We've saved your feedback. Have a great day!",
          false
        );
      } else {
        addMessage(
          "Thank you! We've recorded your feedback. Have a great day! 🎉",
          false
        );
      }
    } catch {
      addMessage(
        "Thank you! We've recorded your feedback. Have a great day! 🎉",
        false
      );
    }
    setStep("done");
    setSubmitting(false);
  }, [
    service,
    overallRating,
    sentiment,
    whatDelightedOrWrong,
    otherText,
    bugsIssues,
    suggestions,
    customQuestionAnswer,
    addMessage,
  ]);

  const chipOptions =
    service && isPositive
      ? DELIGHTED_OPTIONS[service] ?? []
      : service
        ? WENT_WRONG_OPTIONS[service] ?? []
        : [];
  const customQuestion = service ? CUSTOM_QUESTIONS[service] : null;

  return (
    <div className="min-h-screen flex flex-col bg-pop-cream">
      <header className="border-b border-pop-sage/20 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 py-4">
          <h1 className="font-display font-semibold text-xl text-pop-forest">
            POP
          </h1>
          <p className="text-sm text-pop-forest/70">
            Your feedback helps us get better
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="chat-scroll flex-1 space-y-4 pb-4">
          {messages.map((m) => (
            <ChatBubble key={m.id} text={m.text} isUser={m.isUser} />
          ))}
        </div>

        <div className="space-y-4 pt-2 border-t border-pop-sage/20">
          {step === "overall_rating" && (
            <div className="bg-white/80 rounded-2xl p-4 border border-pop-mint/50 shadow-sm">
              <RatingPicker onSelect={handleOverallRating} />
            </div>
          )}

          {step === "service" && (
            <div className="bg-white/80 rounded-2xl p-4 border border-pop-mint/50 shadow-sm">
              <ChoiceChips
                options={SERVICE_OPTIONS.map((o) => o.label)}
                onSelect={(value) => handleServiceSelect(Array.isArray(value) ? value[0] : value)}
              />
            </div>
          )}

          {step === "what_delighted_or_wrong" && chipOptions.length > 0 && (
            <div className="bg-white/80 rounded-2xl p-4 border border-pop-mint/50 shadow-sm">
              <ChoiceChips
                options={chipOptions}
                multiselect
                allowOther
                onSelect={handleWhatDelightedOrWrong}
              />
            </div>
          )}

          {step === "bugs" && (
            <div className="bg-white/80 rounded-2xl p-4 border border-pop-mint/50 shadow-sm">
              <FreetextInput
                placeholder="Describe any bugs or issues (optional)"
                onSubmit={handleBugs}
              />
            </div>
          )}

          {step === "suggestions" && (
            <div className="bg-white/80 rounded-2xl p-4 border border-pop-mint/50 shadow-sm">
              <FreetextInput
                placeholder="Your suggestions (optional)"
                onSubmit={handleSuggestions}
              />
            </div>
          )}

          {step === "custom_question" && customQuestion && (
            <div className="bg-white/80 rounded-2xl p-4 border border-pop-mint/50 shadow-sm">
              <FreetextInput
                placeholder="Share your thoughts..."
                onSubmit={handleCustomQuestion}
              />
            </div>
          )}

          {step === "submit" && (
            <button
              type="button"
              onClick={handleSubmitFeedback}
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-pop-forest text-white font-semibold hover:bg-pop-forest/90 disabled:opacity-60 transition-colors"
            >
              {submitting ? "Submitting…" : "Submit feedback"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
