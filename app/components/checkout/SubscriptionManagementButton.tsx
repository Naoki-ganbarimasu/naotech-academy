"use client";

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'; 
import React from 'react';

const SubscriptionManagementButton = () => {
    const router = useRouter();
    const loadPortal = async () => { 
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/portal`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (!data.url) {
                throw new Error("URL not found in response");
            }
            router.push(data.url);
        } catch (error) {
            console.error('Error loading portal:', error);
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={loadPortal}>サブスクリプション管理をする</Button>
        </div>
    );
};

export default SubscriptionManagementButton;
