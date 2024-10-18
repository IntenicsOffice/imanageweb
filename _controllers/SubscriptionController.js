const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchSubscription = async (company_id) => {
    try {
        const res = await fetch(API_URL + 'subscription/' + company_id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const fetchPackageType = async () => {
    try {
        const res = await fetch(API_URL + 'package-type', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const subscriptionPayment = async (formData) =>{
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
}

const checkPackageSubscriptionStatus = async (company_id) => {
    try {
        const res = await fetch(API_URL + 'check-package-subscription-status/' + company_id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export { fetchSubscription, fetchPackageType, subscriptionPayment , checkPackageSubscriptionStatus}

