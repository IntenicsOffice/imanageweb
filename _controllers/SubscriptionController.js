const API_URL = process.env.NEXT_PUBLIC_API_URL;
import sha256 from 'crypto-js/sha256';

const SubscriptionController = {

    async packageType() {
        try {
            const res = await fetch(API_URL + 'package-type', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(formData),
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    async subscriptionPayment(formData) {
        try {
            const res = await fetch(API_URL + 'payment', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    async phonePe(paymentDocument) {


        try {
            console.log("paymentDocument", paymentDocument);
            let payload = {
                merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
                merchantTransactionId: paymentDocument.merchant_transaction_id,
                merchantUserId: paymentDocument.company_id,
                amount: paymentDocument.payment * 100, // converting to paise
                redirectUrl: `${API_URL}status/${paymentDocument.merchant_transaction_id}`,
                redirectMode: "POST",
                callbackUrl: `${API_URL}status/${paymentDocument.merchant_transaction_id}`,
                mobileNumber: process.env.NEXT_PUBLIC_MOBILE_NO,
                paymentInstrument: {
                    type: "PAY_PAGE",
                },
            };

            const dataPayload = JSON.stringify(payload);
            const encodedPayload = Buffer.from(dataPayload).toString("base64");
            console.log("encodedPayload", encodedPayload);

            const endpoint = '/pg/v1/pay';
            const saltKey = '698156b4-767b-452d-adc7-68c04d933f0d';  // Replace with your actual SALT key
            const merchantKeyIndex = '1';  // Replace with your actual Merchant Key Index

            // const fullURL = dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
            const dataSha256 = sha256(encodedPayload + endpoint + saltKey);

            const xVerify = dataSha256 + "###" + merchantKeyIndex;
            console.log("c====", xVerify);

            // const dataPayload = JSON.stringify(payload);
            // const encodedPayload = Buffer.from(dataPayload).toString('base64');
            // console.log("encodedPayload", encodedPayload)

            // const endpoint = '/pg/v1/pay';
            // const saltKey = '698156b4-767b-452d-adc7-68c04d933f0d';  // Replace with your actual SALT key
            // const merchantKeyIndex = '1';  // Replace with your actual Merchant Key Index
            
            // // const dataSha256 = crypto.createHash('sha256').update(encodedPayload + endpoint + saltKey).digest('hex');
            // const dataSha256 = CryptoJS.SHA256(encodedPayload + endpoint + saltKey).toString(CryptoJS.enc.Hex);

            // const xVerify = `${dataSha256}###${merchantKeyIndex}`;
            // console.log('X-VERIFY', xVerify);

            const UAT_PAY_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

            const response = await fetch(UAT_PAY_API_URL, {
                method: 'POST',
                body: JSON.stringify({ request: encodedPayload }),
                headers: {
                    // 'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'X-VERIFY': xVerify,
                    accept: 'application/json',
                },
            });

            const resData = await response.json();
            console.log("resData", resData)
            console.log("url", resData.data.data.instrumentResponse.redirectInfo.url)

        } catch (error) {
            console.log(error);
        }

    }

}

export default SubscriptionController;