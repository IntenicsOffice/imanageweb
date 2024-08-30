const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { setCookie } from "@/app/utils/ClientHelpers";


const companyLogin = async (formData) => {
    try {
        const res = await fetch(API_URL + 'company-login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const response = await res.json();
        console.log("response", response);

        if (response.status === 200) {
            setCookie('_id', response._id , 1); // Set cookie for 1 day
            setCookie('company_id', response.company_id , 1); // Set cookie for 1 day
            setCookie('access_token', response.access_token , 1); // Set cookie for 1 day
            setCookie('company_name', response.company_name , 1); // Set cookie for 1 day
            setCookie('owner_name', response.owner_name , 1); // Set cookie for 1 day
            setCookie('role', response.role , 1); // Set cookie for 1 day
        }
        return response;
    } catch (error) {
        console.log(error);
    }
};

const companyRegister = async (formData) => {
    try {
        const res = await fetch(API_URL + 'register-company', {
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

export {
    companyLogin, companyRegister
}