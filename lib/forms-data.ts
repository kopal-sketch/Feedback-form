/**
 * POP Feedback — Simplified form definitions per spec
 * Flow: Overall rating (1–5) → Service selection → Dynamic follow-ups by sentiment + custom Q per service
 */

export type Sentiment = "positive" | "neutral" | "negative";

export const SERVICE_OPTIONS = [
  { id: "POPshop", label: "POPshop" },
  { id: "POP Card", label: "POP Card" },
  { id: "POP Bills", label: "POP Bills" },
  { id: "POP UPI", label: "POP UPI" },
] as const;

export function getSentiment(rating: number): Sentiment {
  if (rating >= 4) return "positive";
  if (rating === 3) return "neutral";
  return "negative";
}

// Positive (≥4): "What delighted you the most?"
export const DELIGHTED_OPTIONS: Record<string, string[]> = {
  "POPshop": [
    "Finding products was easy",
    "Checkout was smooth",
    "Delivery updates were clear",
    "Overall experience felt fast",
  ],
  "POP Card": [
    "Card management was easy",
    "Rewards were clear",
    "Activation was quick",
    "Security features felt solid",
  ],
  "POP Bills": [
    "Bill fetch was quick",
    "Payment confirmation was instant",
    "Saved billers made it easy",
    "Offers were visible",
  ],
  "POP UPI": [
    "Payments were fast",
    "QR scan worked well",
    "Transaction history was clear",
    "Felt secure",
  ],
};

// Neutral (3) or Negative (≤2): "What went wrong?"
export const WENT_WRONG_OPTIONS: Record<string, string[]> = {
  "POPshop": [
    "Couldn't find what I needed",
    "Checkout had issues",
    "Delivery was delayed or unclear",
    "Payment or order confirmation problems",
  ],
  "POP Card": [
    "Activation was confusing",
    "Card controls were hard to find",
    "Rewards unclear or didn't work",
    "App or loading issues",
  ],
  "POP Bills": [
    "Bill fetch failed or was slow",
    "Payment failed or unclear",
    "Confirmation was delayed",
    "Couldn't find biller",
  ],
  "POP UPI": [
    "Payments were slow or failed",
    "QR scan didn't work",
    "Unclear if payment went through",
    "Transaction history confusing",
  ],
};

// One custom subjective question per service
export const CUSTOM_QUESTIONS: Record<string, string> = {
  "POPshop": "Was delivery time satisfactory?",
  "POP Card": "Was card activation smooth?",
  "POP Bills": "Did bill payment confirmation feel instant?",
  "POP UPI": "Was the transaction experience seamless?",
};
