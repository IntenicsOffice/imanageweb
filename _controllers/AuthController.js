const API_URL = process.env.NEXT_PUBLIC_API_URL;

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