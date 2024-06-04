import { supabaseServer } from "@/src/utils/supabaseServer";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(
    req: NextRequest,
    {params}: {params: {priceId: string}}
) {
  const supabase = supabaseServer();
  const {data} = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return NextResponse.json("Unauthorized", {status: 401});
  }

  const {data: stripe_customer_data} = await supabase
    .from("profiles")
    .select("stripe_customer")
    .eq("id", user?.id)
    .single();

  if (!stripe_customer_data || !stripe_customer_data.stripe_customer) {
    return NextResponse.json("Stripe customer not found", {status: 404});
  }

  const priceId = params.priceId;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const session = await stripe.checkout.sessions.create({
      customer: stripe_customer_data.stripe_customer,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {price: priceId, quantity: 1},
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancelled`,
    });

    return NextResponse.json({
      id: session.id
    });
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500});
  }
}
