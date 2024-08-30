"use client"
import Layout from "../_components/Layout";
import { useEffect, useState } from 'react';
import { getCookie } from "../utils/ClientHelpers";
import Constants from "../../../constants";

const Dashboard = () => {

    const [companyId, setCompanyId] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

        const companyIdCookie = getCookie('company_id');
        const tokenCookie = getCookie('access_token');

        // Set state with cookie values
        setCompanyId(companyIdCookie);
        setToken(tokenCookie);
    }, []);

    return (
        <>
            <Layout>
                <div className="row">
                    <div className="col-6">
                        <h2>Dashboard Content Area {companyId}</h2>
                        <p>This is where your main content will {Constants.ADMINISTRATOR}. </p>
                    </div>
                    <div className="col-6">
                        <h2>Dashboard Content Area {companyId}</h2>
                        <p>This is where your main content will ssfsbjfs sdssds ssk go. </p>
                    </div>

                </div>
            </Layout>
        </>
    );

}

export default Dashboard;