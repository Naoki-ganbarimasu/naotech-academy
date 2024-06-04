import { supabaseServer } from '@/src/utils/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
    const supabase = supabaseServer();
    const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");

    if (query !== process.env.API_ROUTE_SECRET) {
        return NextResponse.json({
            message: "APIを叩く権限がありません。",
        }, { status: 401 });
    }

    const data = await req.json();
    const { id, email } = data.record;

    if (!id || !email) {
        return NextResponse.json({
            message: 'ID or email is missing',
        }, { status: 400 });
    }

    console.log("Received ID:", id);
    console.log("Received email:", email);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10',
    });

    try {
        const customer = await stripe.customers.create({ email });
        console.log("Stripe customer created:", customer.id);

        const { error } = await supabase
            .from("profiles")
            .update({ stripe_customer: customer.id })
            .eq("id", id);

        if (error) {
            console.error("Error updating profile:", error.message);
            return NextResponse.json({
                message: `Error updating profile: ${error.message}`,
            }, { status: 500 });
        }

        console.log("Profile updated successfully with Stripe customer ID:", customer.id);

        return NextResponse.json({
            message: `Stripe customer created and profile updated: ${customer.id}`,
        });
    } catch (err) {
        console.error("Internal server error:", err);
        return NextResponse.json({
            message: `Internal Server Error`,
        }, { status: 500 });
    }
}

