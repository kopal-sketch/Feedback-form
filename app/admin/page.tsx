"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface FeedbackRow {
  id: string;
  overall_rating: number;
  service: string;
  sentiment: string;
  what_delighted_or_wrong: string | null;
  other_text: string | null;
  bugs_issues: string | null;
  suggestions: string | null;
  custom_question_answer: string | null;
  submitted_at: string;
}

export default function AdminPage() {
  const [feedback, setFeedback] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local");
      setLoading(false);
      return;
    }
    supabase
      .from("feedback")
      .select("*")
      .order("submitted_at", { ascending: false })
      .then(({ data, error: err }) => {
        if (err) throw err;
        setFeedback((data as FeedbackRow[]) ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const parseChips = (raw: string | null | undefined): string[] => {
    if (!raw) return [];
    try {
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-pop-cream p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-pop-forest/80">Loading feedback…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-pop-cream p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-red-600">{error}</p>
          <Link href="/" className="text-pop-forest underline mt-2 inline-block">
            ← Back to feedback form
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pop-cream p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="font-display font-semibold text-2xl text-pop-forest">
              POP Feedback — Admin
            </h1>
            <p className="text-sm text-pop-forest/70 mt-1">
              {feedback.length} submission{feedback.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-pop-forest text-white text-sm font-medium hover:bg-pop-forest/90 transition-colors"
          >
            ← Feedback form
          </Link>
        </header>

        <div className="bg-white rounded-2xl border border-pop-mint/50 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-pop-sage/30 bg-pop-cream/50">
                <th className="px-4 py-3 text-xs font-semibold text-pop-forest/80 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-pop-forest/80 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-pop-forest/80 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-pop-forest/80 uppercase tracking-wider">
                  Sentiment
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-pop-forest/80 uppercase tracking-wider">
                  What delighted / went wrong
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-pop-forest/80 uppercase tracking-wider">
                  Other
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-pop-forest/80 uppercase tracking-wider">
                  Bugs / issues
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-pop-forest/80 uppercase tracking-wider">
                  Suggestions
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-pop-forest/80 uppercase tracking-wider">
                  Custom Q answer
                </th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-pop-sage/20 hover:bg-pop-mint/10 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-pop-forest whitespace-nowrap">
                    {formatDate(row.submitted_at)}
                  </td>
                  <td className="px-4 py-3 text-sm text-pop-forest">
                    {row.overall_rating}/5
                  </td>
                  <td className="px-4 py-3 text-sm text-pop-forest">
                    {row.service}
                  </td>
                  <td className="px-4 py-3 text-sm text-pop-forest capitalize">
                    {row.sentiment}
                  </td>
                  <td className="px-4 py-3 text-sm text-pop-forest max-w-[200px]">
                    <span className="line-clamp-3">
                      {parseChips(row.what_delighted_or_wrong).join(", ") || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-pop-forest max-w-[160px]">
                    <span className="line-clamp-2">
                      {row.other_text || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-pop-forest max-w-[180px]">
                    <span className="line-clamp-2">
                      {row.bugs_issues || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-pop-forest max-w-[180px]">
                    <span className="line-clamp-2">
                      {row.suggestions || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-pop-forest max-w-[160px]">
                    <span className="line-clamp-2">
                      {row.custom_question_answer || "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {feedback.length === 0 && (
          <p className="text-center text-pop-forest/70 py-12">
            No feedback submissions yet.
          </p>
        )}
      </div>
    </div>
  );
}
