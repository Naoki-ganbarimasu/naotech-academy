import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/src/lib/database.types'; // 適切なパスに修正
import { cookies } from 'next/headers';

export async function POST(
  req: NextRequest,
  { params }: { params: { priceId: string } }
) {
  // 環境変数の確認
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!stripeSecretKey || !baseUrl) {
    console.error('Stripe Secret Key or Base URL is not defined');
    return NextResponse.json(
      { message: 'Server configuration error' },
      { status: 500 }
    );
  }

  // リクエストから Supabase クライアントを作成
  const supabase = createServerSupabaseClient<Database>({ headers: req.headers, cookies });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('User not authenticated:', userError);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // ユーザーの Stripe Customer ID を取得
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('stripe_customer')
    .eq('id', user.id)
    .single();

  if (profileError || !profile?.stripe_customer) {
    console.error('Stripe customer not found:', profileError);
    return NextResponse.json(
      { message: 'Stripe customer not found' },
      { status: 404 }
    );
  }

  const priceId = params.priceId;

  // Stripe インスタンスの作成
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2022-11-15',
  });

  try {
    const session = await stripe.checkout.sessions.create({
      customer: profile.stripe_customer,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/payment/success`,
      cancel_url: `${baseUrl}/payment/cancelled`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    return NextResponse.json(
      { message: 'Failed to create Stripe session' },
      { status: 500 }
    );
  }
}

