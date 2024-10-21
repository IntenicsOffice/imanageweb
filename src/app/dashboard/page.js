"use client"
import Layout from "../layouts/Layout";
import { useEffect, useState } from 'react';
import { getCookie } from "../utils/ClientHelpers";
import Constants from "../../../constants";
import TodayOnLeave from "../_components/team/TodayOnLeave";
import TodayLeaveRequest from "../_components/team/TodayLeaveRequest";
import TeamPresence from "../_components/team/TeamPresence";

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

                    <div className="col-9">
                        <h2>Dashboard Content Area {companyId}</h2>
                        <p>This is {process.env.NEXT_PUBLIC_API_URL} your main content will {Constants.ADMINISTRATOR}. </p>
                    </div>

                    <div className="col-3">

                        <div className="card mt-2 mb-3" >
                            <div className="card-header">
                                <b>Teams</b>
                            </div>
                            <div className="card-body scrollable-width" style={{ maxHeight: '530px', overflowY: 'auto' }}>

                                <div className="accordion" id="accordionPanelsStayOpenExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                                Todays On Leave
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                            <div className="accordion-body">
                                                <TodayOnLeave />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                                Todays Leave Request
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                            <div className="accordion-body">
                                                <TodayLeaveRequest />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                                Todays Presence 15/20
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                            <div className="accordion-body">
                                                <TeamPresence companyId={companyId} />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>

                </div>
            </Layout>
        </>
    );

}

export default Dashboard;