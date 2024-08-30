// app/api/confirmPayment/route.js
import axios from 'axios';

export async function POST(request) {
    const { paymentId, orderId } = await request.json();

    try {
        const phonePeResponse = await axios.post('https://api.phonepe.com/v1/confirm-payment', {
            paymentId,
            orderId,
        });

        if (phonePeResponse.data.success) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, message: 'Payment confirmation failed.' }), { status: 400 });
        }
    } catch (error) {
        console.error('Error with PhonePe API:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal server error.' }), { status: 500 });
    }
}
