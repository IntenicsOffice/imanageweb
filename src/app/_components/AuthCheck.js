"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCookie } from '../utils/ClientHelpers';

const AuthCheck = ({ children }) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const companyIdCookie = getCookie("company_id");
            console.log("companyIdCookie", companyIdCookie);
            const isLoggedIn = Boolean(companyIdCookie);
            setAuthenticated(isLoggedIn);

            if (!isLoggedIn) {
                router.push('/');
            }
        };

        checkAuth();
    }, [router]);

    if (!authenticated) {
        return (
            <div className="position-relative">
                <div className="position-absolute top-50 start-50 translate-middle">Loading...</div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthCheck;
