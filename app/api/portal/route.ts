import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError) {
            throw new Error(`Auth error: ${authError.message}`);
        }

        const user = authData?.user;

        if (!user) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const { data: stripeCustomerData, error: stripeCustomerError } = await supabase
            .from("profiles")
            .select("stripe_customer")
            .eq("id", user.id)
            .single();

        if (stripeCustomerError) {
            throw new Error(`Stripe customer error: ${stripeCustomerError.message}`);
        }

        if (!stripeCustomerData?.stripe_customer) {
            throw new Error("Stripe customer ID not found");
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-04-10' });

        const session = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerData.stripe_customer,
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Error loading portal:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
