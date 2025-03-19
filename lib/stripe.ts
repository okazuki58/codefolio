import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

// フロントエンド用のStripeインスタンス
export const getStripe = async () => {
  const stripeJs = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  return stripeJs;
};

// バックエンド用のStripeインスタンス
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // 最新のAPIバージョンに更新
});
