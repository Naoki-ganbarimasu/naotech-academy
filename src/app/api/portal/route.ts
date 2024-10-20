export const dynamic = 'force-dynamic';

import { supabaseServer } from "@/src/utils/supabaseServer";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  try {
    const supabase = supabaseServer();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: `Unauthorized: ${authError?.message || "No user found"}` },
        { status: 401 }
      );
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("stripe_customer")
      .eq("id", user.id)
      .single();

    if (profileError || !profileData?.stripe_customer) {
      return NextResponse.json(
        {
          error: `Profile error: ${
            profileError?.message || "Stripe customer ID not found"
          }`,
        },
        { status: 400 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-04-10",
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: profileData.stripe_customer,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Error loading portal:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
