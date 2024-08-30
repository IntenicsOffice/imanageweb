"use client"
import { useEffect, useState } from "react";
import Login from "./_components/auth/Login";
import Register from "./_components/auth/Register";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { usePathname } from 'next/navigation';
import { getCookie } from "./utils/ClientHelpers";


const Home = () => {
    const router = useRouter();
    const pathname = usePathname()
    const [login, setLogin] = useState(true);

    useEffect(() => {
        const companyIdCookie = getCookie('company_id');
        console.log("companyIdCookie", companyIdCookie)
        if (companyIdCookie) {
            router.push('/dashboard');
        }
    }, []);

    return (
        <>
            <div className="container pt-5 ">

                <div className="row ">
                    <div className="col-4 offset-4 ">

                        <div className="authentication-wrapper authentication-basic container-p-y ">
                            <div className="authentication-inner">
                                <div className="card">
                                    <div className="card-body">
                                        {
                                            login ?
                                                <div>
                                                    <h4 className="mb-2 text-center">Welcome to I-Manage </h4>
                                                    <p className="mb-4 text-center">Please sign-in to your account</p>
                                                </div>
                                                :
                                                <div>
                                                    <h4 className="mb-2 text-center">I-Manage Company Register </h4>
                                                    <p className="mb-4 text-center">Make your company and manage easy!</p>
                                                </div>
                                        }

                                        {
                                            login ? <Login /> : <Register />
                                        }

                                        <div className="text-center">
                                            {
                                                login ?
                                                    <div>
                                                        <span>Do not have account?</span> <span role="button" className="text-primary" onClick={() => setLogin(!login)}>Register</span>
                                                    </div>
                                                    :
                                                    <div>
                                                        <span>Already have an account?</span> <span role="button" className="text-primary" onClick={() => setLogin(!login)}>Login</span>
                                                    </div>
                                            }
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </>
    );
}

export default Home