import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseServer } from "@/app/utils/supabaseServer";

export async function POST(req: NextRequest) {
    const supabase = supabaseServer();

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
            
                break;
            case 'customer.subscription.updated':
                await supabase
                .from("profiles")
                .update({
                    is_subscribed: true,
                    interval: null,
                })
                .eq("stripe_customer", event.data.object.customer);
            
                break;
     
            default:
        }

        console.log(event);

    } catch (err: any) {
        return NextResponse.json(`webhook Error: ${err.message}`, { status: 401 });
    }

    return NextResponse.json({ received: true });
}
