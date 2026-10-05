/**
 * Single source of truth for plan facts shown to visitors.
 *
 * These mirror what the backend actually does today:
 *  - `onGetStripeClientSecret` (src/actions/payments.ts) creates a USD
 *    PaymentIntent for 9900 cents → $99, charged when a group is created.
 *  - `onTransferCommission` transfers 3960 cents → $39.60 to the referrer.
 *
 * If billing changes (e.g. you move to a recurring Stripe subscription), change
 * the values here and every landing/checkout string follows.
 */
export const PLAN = {
  name: "Creator Plan",
  price: 99,
  currency: "USD",
  /** "once" = single payment per group, "monthly" = recurring. */
  billing: "once" as "once" | "monthly",
  /** Paid to the referrer for each group created through their link. */
  affiliatePayout: 39.6,
}

const money = (n: number) =>
  `$${Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2)}`

export const PRICE = money(PLAN.price) // "$99"
export const AFFILIATE_PAYOUT = money(PLAN.affiliatePayout) // "$39.60"
export const AFFILIATE_PERCENT = Math.round(
  (PLAN.affiliatePayout / PLAN.price) * 100,
) // 40

/** Short suffix next to the price, e.g. "USD · one-time per group". */
export const BILLING_SHORT =
  PLAN.billing === "once"
    ? `${PLAN.currency} · one-time per group`
    : `${PLAN.currency} · per month, per group`

/** One-line billing note used under CTAs and in checkout copy. */
export const BILLING_NOTE =
  PLAN.billing === "once"
    ? "One secure payment via Stripe. Your group is created the moment it clears."
    : "Billed monthly via Stripe. Your group is created the moment payment clears."
