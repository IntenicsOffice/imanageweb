// "use client"
import axios from 'axios';
import CryptoJS from 'crypto-js';

export async function POST(request) {
    const { company_id, merchant_transaction_id, payment } = await request.json();
    console.log("company_id merchant_transaction_id, payment", company_id, merchant_transaction_id, payment);
    // const phonePeResponse = await axios.post('http://localhost:3000/api/payment', {
    // const phonePeResponse = await axios.post('https://intenics.in/imanage-payment', {
    //     company_id,  
    //     merchant_transaction_id,  
    //     payment  
    // }, {
    //     headers: {
    //         accept: "application/json",
    //         "Content-Type": "application/json",
    //     },
    // });
    //     console.log("phonePeResponse", phonePeResponse.data)

    // try {

    //     let payload = {
    //         merchantId: 'M1O1B3ZX0O26',
    //         merchantTransactionId: merchant_transaction_id,
    //         merchantUserId: company_id,
    //         amount: payment * 100, 
    //         // redirectUrl: 'https://imanageweb.intenics.in/api/status',
    //         redirectUrl: 'http://localhost:3000/api/status',
    //         redirectMode: 'POST',
    //         // callbackUrl: 'https://imanageweb.intenics.in/api/status',
    //         callbackUrl: 'http://localhost:3000/api/status',
    //         mobileNumber: '7880024466',
    //         paymentInstrument: {
    //             type: "PAY_PAGE"
    //         },
    //     };
    //     const dataPayload = JSON.stringify(payload);
    //     const encodedPayload = Buffer.from(dataPayload).toString('base64');

    //     const endpoint = '/pg/v1/pay';
    //     const saltKey = '698156b4-767b-452d-adc7-68c04d933f0d';
    //     const merchantKeyIndex = '1';
    //     const dataSha256 = CryptoJS.SHA256(encodedPayload + endpoint + saltKey).toString(CryptoJS.enc.Hex);
    //     const xVerify = `${dataSha256}###${merchantKeyIndex}`;
        
    //     const UAT_PAY_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
        
    //     const phonePeResponse = await axios.post(UAT_PAY_API_URL,{ request: encodedPayload},
    //         {
    //             headers: {
    //                 accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 "X-VERIFY": xVerify,
    //             },

    //         });

    //     console.log("phonePeResponse.data", phonePeResponse.data);
    //     if (phonePeResponse.data.success) {
    //         console.log("phonePeResponse", phonePeResponse.data.data.instrumentResponse.redirectInfo.url);
    //         const url = phonePeResponse.data.data.instrumentResponse.redirectInfo.url;
    //         return new Response(JSON.stringify({ success: true, paymentUrl: phonePeResponse.data.data.instrumentResponse.redirectInfo.url }));
    //     } else {
    //         return new Response(JSON.stringify({ success: false, message: 'Payment initiation failed.' }), { status: 400 });
    //     }

    // } catch (error) {   
    //     console.error('Error with PhonePe API:', error);
    //     return new Response(JSON.stringify({ success: false, message: 'Internal server error.' }), { status: 500 });
    // }
        // return new Response(JSON.stringify({ success: true, message: 'testing' }), { status: 200 });
}
