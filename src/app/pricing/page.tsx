import { SupabaseClient, Session } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import Stripe from 'stripe';
import { supabaseServer } from '../../utils/supabaseServer';
import SubscriptionButton from '../components/checkout/SubscriptionButton';
import Image from 'next/image';

interface Plan {
  id: string;
  name: string;
  price: string | null;
  interval: Stripe.Price.Recurring.Interval | null;
  currency: string;
}

interface Profile {
  id: string;
  is_subscribed: boolean;
}


const getAllPlans = async (): Promise<Plan[]> => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  const stripe = new Stripe(stripeSecretKey);
  const plansList = await stripe.prices.list({ expand: ['data.product'] });

  const plans = plansList.data.map((plan) => ({
    id: plan.id,
    name: (plan.product as Stripe.Product).name,
    price: plan.unit_amount ? (plan.unit_amount / 100).toFixed(2) : null,
    interval: plan.recurring?.interval ?? null,
    currency: plan.currency,
  }));

  const sortedPlans = plans.sort((a, b) => parseFloat(a.price!) - parseFloat(b.price!));

  return sortedPlans;
};

const getProfileData = async (
  supabase: SupabaseClient,
  userId: string
): Promise<Profile | null> => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }

  return profile as Profile;
};


const PricingPage = async () => {
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const plans = await getAllPlans();

  let profile: Profile | null = null;

  if (session) {
    const userId = session.user.id;
    profile = await getProfileData(supabase, userId);
  }

  const showSubscribeButton = !!session && !profile?.is_subscribed;
  const showCreateAccountButton = !session;
  const showSubscribeManagementButton = !!session && profile?.is_subscribed;

  return (
    <div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full mx-6 py-16 justify-around">
        {plans.map((plan) => (
          <div
            className="w-auto h-auto gap-5 grid mx-auto border-gray-300 box-shadow transition-transform duration-300 border-2 my-3 mx-3"
            key={plan.id}
          >
            <Image
              className="h-auto w-auto rounded"
              src={plan.interval === 'month' ? '/month.jpg' : '/year.jpg'}
              alt={`${plan.name} price`}
              width={400}
              height={400}
            />
            <div className='ml-5'>
            <h2 className="text-xl">{plan.name} プラン</h2>
            <p>{plan.interval}</p>
            <p>
              💲{plan.price}/{plan.interval}
            </p>
            </div>
            {showSubscribeButton && <SubscriptionButton planId={plan.id} />}
            {showCreateAccountButton && (
              <Link className="template_button" href="/auth/login">
                ログインする
              </Link>
            )}
            {showSubscribeManagementButton && (
              <Link className="template_button" href="/dashboard">
                サブスクリプションを管理する
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
