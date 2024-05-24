import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {cookies} from "next/headers"
import { Database } from "@/lib/database.types";

export async function POST(req: NextRequest) {
    const supabase = createRouteHandlerClient<Database>({cookies});
    const {data: user} = await supabase.auth.getSession();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
    const signature = req.headers.get("stripe-signature");

    const reqBuffer = Buffer.from(await req.arrayBuffer());
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            reqBuffer,
            signature!,
            endpointSecret!
        );

        // イベントタイプごとの処理
        switch (event.type) {
            case "customer.subscription.created":
                const customerSubscriptionCreated = event.data.object;
                await supabase
                .from("profiles")
                .update({
                    is_subscribed: true,
                    interval: customerSubscriptionCreated.items.data[0].plan.interval
                })
                .eq("stripe_customer", event.data.object.customer);
                // Then define and call a function to handle the event customer.subscription.created
                break;
            case 'customer.subscription.deleted':
                const customerSubscriptionDeleted = event.data.object;
                await supabase
                .from("profiles")
                .update({
                    is_subscribed: true,
                    interval: customerSubscriptionDeleted.items.data[0].plan.interval
                })
                .eq("stripe_customer", event.data.object.customer);
                // Then define and call a function to handle the event customer.subscription.deleted
                break;
            case 'customer.subscription.updated':
                await supabase
                .from("profiles")
                .update({
                    is_subscribed: true,
                    interval: null,
                })
                .eq("stripe_customer", event.data.object.customer);
                // Then define and call a function to handle the event customer.subscription.updated
                break;
            // 他のイベントタイプの処理
            default:
        }

        console.log(event);

    } catch (err: any) {
        return NextResponse.json(`webhook Error: ${err.message}`, { status: 401 });
    }

    return NextResponse.json({ received: true });
}
