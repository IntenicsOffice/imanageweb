// app/paymentConfirmation/page.jsx
'use client'; // Ensure this is a client-side component

import { useEffect } from 'react';
import axios from 'axios';

const PaymentConfirmation = () => {
    useEffect(() => {
        const confirmPayment = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const paymentId = urlParams.get('paymentId');
            const orderId = urlParams.get('orderId');

            if (paymentId && orderId) {
                try {
                    const response = await axios.post('/api/confirmPayment', { paymentId, orderId });
                    if (response.data.success) {
                        alert('Payment successful!');
                    } else {
                        alert('Payment failed.');
                    }
                } catch (error) {
                    console.error('Error confirming payment:', error);
                    alert('An error occurred.');
                }
            }
        };

        confirmPayment();
    }, []);

    return <div>Processing your payment...</div>;
};

export default PaymentConfirmation;
