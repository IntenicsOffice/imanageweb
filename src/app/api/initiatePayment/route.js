// "use client"
import axios from 'axios';
import CryptoJS from 'crypto-js';

export async function POST(request) {
    const { company_id, merchant_transaction_id, payment } = await request.json();
    console.log("company_id merchant_transaction_id, payment", company_id, merchant_transaction_id, payment);
    try {

        let payload = {
            merchantId: 'M1O1B3ZX0O26',
            merchantTransactionId: merchant_transaction_id,
            merchantUserId: company_id,
            amount: payment * 100, // converting to paise
            redirectUrl: 'https://imanageweb.intenics.in/success',
            redirectMode: 'POST',
            callbackUrl: 'https://imanageweb.intenics.in/success',
            mobileNumber: '7880024466',
            paymentInstrument: {
                type: "PAY_PAGE"
            },
        };
        const dataPayload = JSON.stringify(payload);
        const encodedPayload = Buffer.from(dataPayload).toString('base64');
        // console.log("encodedPayload", encodedPayload)

        const endpoint = '/pg/v1/pay';
        // const saltKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
        const saltKey = '698156b4-767b-452d-adc7-68c04d933f0d';
        const merchantKeyIndex = '1';
        const dataSha256 = CryptoJS.SHA256(encodedPayload + endpoint + saltKey).toString(CryptoJS.enc.Hex);
        const xVerify = `${dataSha256}###${merchantKeyIndex}`;
        // console.log('X-VERIFY', xVerify);
        
        const UAT_PAY_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
        // const UAT_PAY_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
        const phonePeResponse = await axios.post(UAT_PAY_API_URL,{ request: encodedPayload},
            {
                headers: {
                    accept: "application/json",
                    // accept: "text/plain",
                    "Content-Type": "application/json",
                    "X-VERIFY": xVerify,
                },

            });

        console.log("phonePeResponse.data", phonePeResponse.data);
        if (phonePeResponse.data.success) {
            console.log("phonePeResponse", phonePeResponse.data.data.instrumentResponse.redirectInfo.url);
            const url = phonePeResponse.data.data.instrumentResponse.redirectInfo.url;

            return new Response(JSON.stringify({ success: true, paymentUrl: phonePeResponse.data.data.instrumentResponse.redirectInfo.url }));
        } else {
            return new Response(JSON.stringify({ success: false, message: 'Payment initiation failed.' }), { status: 400 });
        }

    } catch (error) {   
        console.error('Error with PhonePe API:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal server error.' }), { status: 500 });
    }
}
