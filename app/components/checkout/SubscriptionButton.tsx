"use client";

import { Button } from '@mui/material';
import React from 'react';
import { loadStripe } from "@stripe/stripe-js";

const SubscriptionButton = ({ planId }: { planId: string }) => {
  const processSubscription = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/subscription/${planId}`,
    );

    const data = await response.json();
    
    console.log('Stripe API Key:', process.env.NEXT_PUBLIC_SUPRITE_KEY); // デバッグ用のログ出力

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_SUPRITE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <Button onClick={processSubscription}>
      サブスクリプション契約をする
    </Button>
  );
};

export default SubscriptionButton;
