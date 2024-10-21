import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { cookies } from 'next/headers';

export async function POST(
  req: NextRequest,
  { params }: { params: { priceId: string } }
) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!stripeSecretKey || !baseUrl) {
    console.error('Stripe Secret Key or Base URL is not defined');
    return NextResponse.json(
      { message: 'Server configuration error' },
      { status: 500 }
    );
  }

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error('User not authenticated:', sessionError);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('stripe_customer')
    .eq('id', session.user.id)
    .single();

  if (profileError || !profile?.stripe_customer) {
    console.error('Stripe customer not found:', profileError);
    return NextResponse.json(
      { message: 'Stripe customer not found' },
      { status: 404 }
    );
  }

  const priceId = params.priceId;

  const stripe = new Stripe(stripeSecretKey);

  try {
    const sessionStripe = await stripe.checkout.sessions.create({
      customer: profile.stripe_customer,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/payment/success`,
      cancel_url: `${baseUrl}/payment/cancelled`,
    });

    return NextResponse.json({ id: sessionStripe.id });
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    return NextResponse.json(
      { message: 'Failed to create Stripe session' },
      { status: 500 }
    );
  }
}
