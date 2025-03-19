import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // セッションからユーザー情報を取得
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    // リクエストボディからpriceIdを取得
    const { priceId } = await req.json();
    if (!priceId) {
      return NextResponse.json(
        { error: "Price IDが必要です" },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // すでに有料会員の場合
    if (session.user.isPaidMember) {
      return NextResponse.json(
        { error: "すでに有料会員です" },
        { status: 400 }
      );
    }

    // Stripeカスタマー情報を取得または作成
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      // Stripeカスタマーを新規作成
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        name: user.name || undefined,
        metadata: {
          userId,
        },
      });

      // DBにカスタマーIDを保存
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customer.id },
      });

      customerId = customer.id;
    }

    // チェックアウトセッションの基本URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // チェックアウトセッションを作成
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      client_reference_id: userId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          userId,
        },
      },
      success_url: `${baseUrl}/settings?checkout=success`,
      cancel_url: `${baseUrl}/pricing?checkout=cancel`,
    });

    // チェックアウトURLを返す
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "チェックアウト処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
