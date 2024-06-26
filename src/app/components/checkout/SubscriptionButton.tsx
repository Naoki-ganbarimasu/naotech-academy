"use client";

import React from 'react';
import { loadStripe } from "@stripe/stripe-js";

const SubscriptionButton = ({ planId }: { planId: string }) => {
  const processSubscription = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/${planId}`,
    );

    const data = await response.json();
    
    console.log('Stripe API Key:', process.env.NEXT_PUBLIC_SUPRITE_KEY); 

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_SUPRITE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <button className='template_button' onClick={processSubscription}>
      サブスクリプション契約をする
    </button>
  );
};

export default SubscriptionButton;
