import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material'; 
import Stripe from 'stripe';
import {cookies} from "next/headers"
import { SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { profile } from 'console';
import { Database } from '@/lib/database.types';

interface Plan {
    id: string;
    name: string;
    price: string | null;
    interval: Stripe.Price.Recurring.Interval | null;
    currency: string;
}


const getAllPlans = async (): Promise<Plan[]> => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const {data: planslist }= await stripe.plans.list();
    const plans = await Promise.all(
        planslist.map( async (plan) => {
            const product = await stripe.products.retrieve(plan.product as string);
            
            return {
                id: plan.id,
                name: product.name,
                price: plan.amount_decimal,
                interval: plan.interval,
                currency: plan.currency,
            }
    }))

    const sortedPlans = plans.sort((a, b)=> parseInt(a.price!) - parseInt(b.price!))

    return sortedPlans;
}

const getProfileData = async (supabase: SupabaseClient) => {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');
  
    if (error) {
      console.error('Error fetching profile data:', error);
      return null;
    }
  
    if (profiles.length === 0) {
      console.error('No profiles found');
      return null;
    }
  
    // 最初の行を返す（または必要に応じて特定のロジックを追加）
    return profiles[0];
  }


const PricingPage = async () => {
    const supabase = createServerComponentClient({cookies});
    const {data: user} = await supabase.auth.getSession();

    const [plans,profiles] = await Promise.all([
        await getAllPlans(),
        await getProfileData(supabase)
      ])



    const showSubscribeBotton =!!user.session && profiles && !profiles.is_subscribed;
    const showCreateAccountButton = !user.session;
    const showManageSubscription = !!user.session && profiles && profiles.is_subscribed;

  return (
  <div className='w-full max-w-3x1 flex ml-10 mxauto py-16 justify-around'>
    {plans.map((plan) => (
           <Card className='shadow-md' key={plan.id} style={{ margin: '16px' }}>
           <CardActionArea>
               <CardMedia
                 component="img"
                 style={{ height: '80', width: 'auto' }}
                 // height="300"
                 image={plan.interval === 'month' ? "/month.jpg" : "/annual.jpg"}
                 alt={`${plan.name} price`}
                 className=''
               />
               <CardContent>
               <Typography gutterBottom variant="h4" component="div">
                 {plan.name} プラン
               </Typography>
               <Typography gutterBottom  component="div">
                 {plan.interval}
               </Typography>
               <Typography variant="h5" color="text.secondary">
                 {plan.price}/{plan.interval}
               </Typography>
             </CardContent>
           </CardActionArea>
           <CardActions>
             {showSubscribeBotton &&
              <Button size="small" color="primary">
               サブスクリプション契約をする
             </Button>
             }
              {showCreateAccountButton &&
              <Button size="small" color="primary">
               ログインする
             </Button>
             }
               {showManageSubscription &&
              <Button size="small" color="primary">
               サブスクリプション管理をする
             </Button>
             }
             
           </CardActions>
         </Card>
    ))}
       </div>  
)}

export default PricingPage;
