export const dynamic = 'force-dynamic';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';

export async function GET() {
  try {

    const supabase = createRouteHandlerClient<Database>({ cookies });

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error('User not authenticated:', sessionError);
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_customer')
      .eq('id', session.user.id)
      .single();

    if (profileError || !profileData?.stripe_customer) {
      return NextResponse.json(
        {
          error: `Profile error: ${
            profileError?.message || 'Stripe customer ID not found'
          }`,
        },
        { status: 400 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    });

    const sessionStripe = await stripe.billingPortal.sessions.create({
      customer: profileData.stripe_customer,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    });

    return NextResponse.json({ url: sessionStripe.url });
  } catch (error: any) {
    console.error('Error loading portal:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
