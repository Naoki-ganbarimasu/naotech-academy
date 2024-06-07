import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import Stripe from 'stripe';
import { supabaseServer } from '../../utils/supabaseServer';
import SubscriptionButton from '../components/checkout/SubscriptionButton';

interface Plan {
    id: string;
    name: string;
    price: string | null;
    interval: Stripe.Price.Recurring.Interval | null;
    currency: string;
}

const getAllPlans = async (): Promise<Plan[]> => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const plansList = await stripe.prices.list({ expand: ['data.product'] });

    const plans = plansList.data.map(plan => ({
        id: plan.id,
        name: (plan.product as Stripe.Product).name,
        price: plan.unit_amount ? (plan.unit_amount / 100).toFixed(2) : null,
        interval: plan.recurring?.interval ?? null,
        currency: plan.currency,
    }));

    const sortedPlans = plans.sort((a, b) => parseFloat(a.price!) - parseFloat(b.price!));

    return sortedPlans;
};

const getProfileData = async (supabase: SupabaseClient) => {
    const { data: profiles, error } = await supabase.from('profiles').select('*');

    if (error) {
        console.error('Error fetching profile data:', error);
        return null;
    }

    if (profiles.length === 0) {
        console.error('No profiles found');
        return null;
    }

    return profiles[0];
};

const PricingPage = async () => {
    const supabase = supabaseServer();
    const { data: { session } } = await supabase.auth.getSession();
    const profiles = await getProfileData(supabase);

    const [plans] = await Promise.all([getAllPlans()]);

    const showSubscribeButton = !!session && !profiles?.is_subscribed;
    const showCreateAccountButton = !session;
    const showSubscribeManagementButton = !!session && profiles?.is_subscribed;

    return (
        <div>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 w-ful mx-6 py-16 justify-around '>
            {plans.map((plan) => (
                <div className="w-auto h-auto gap-5 grid mx-auto border-gray-300 box-shadow transition-transform duration-300 border-2 my-3 mx-3" key={plan.id} >
                    <img
                    className="h-auto w-auto rounded  "
                    src={plan.interval === 'month' ? "/month.jpg" : "/annual.jpg"}
                    alt={`${plan.name} price`}/>
                            <h2 className='text-xl'>{plan.name} プラン</h2>
                            <p>{plan.interval}</p>
                            <p>{plan.price}/{plan.interval}</p>
                        {showSubscribeButton && <SubscriptionButton planId={plan.id} />}
                        {showCreateAccountButton && (
                            <Link className='template_button' href="/auth/login">ログインする</Link>
                        )}
                        {showSubscribeManagementButton && (
                            <Link className='template_button' href={"/dashboard"}>サブスクリプションを管理する</Link>
                        )}
                </div>
            ))}
        </div>
        <div>
        </div>
    </div>
    );
};

export default PricingPage;
