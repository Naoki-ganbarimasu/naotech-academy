import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Stripe from 'stripe';
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import SubscriptionButton from '../components/checkout/SubscriptionButton';
import Link from 'next/link';
import { supabaseServer } from '../utils/supabaseServer';

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
            <div className='w-full max-w-3xl flex ml-10 mx-auto py-16 justify-around'>
            {plans.map((plan) => (
                <Card className='shadow-md' key={plan.id} style={{ margin: '16px' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            style={{ height: 'auto', width: 'auto' }}
                            image={plan.interval === 'month' ? "/month.jpg" : "/annual.jpg"}
                            alt={`${plan.name} price`}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {plan.name} プラン
                            </Typography>
                            <Typography gutterBottom component="div">
                                {plan.interval}
                            </Typography>
                            <Typography variant="h5" color="text.secondary">
                                {plan.price}/{plan.interval}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {showSubscribeButton && <SubscriptionButton planId={plan.id} />}
                        {showCreateAccountButton && (
                            <Button  variant="contained" size="small" color="primary">
                                <Link href="/auth/login">ログインする</Link>
                            </Button>
                        )}
                        {showSubscribeManagementButton && (
                            <Button variant="contained" href='/dashboard'>サブスクリプションを管理する</Button>
                        )}
                    </CardActions>
                </Card>
            ))}
        </div>
        <div>
        </div>
    </div>
    );
};

export default PricingPage;
