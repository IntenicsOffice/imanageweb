"use client"

import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import SubscriptionModal from "./SubscriptionModal";
import { Button, Card, Col, Row } from "react-bootstrap";
import { checkPackageSubscriptionStatus, fetchSubscription } from "../../../_controllers/SubscriptionController";
import { getCookie } from "../utils/ClientHelpers";
import moment from "moment";


const Subscription = () => {
    const [companyId, setCompanyId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [subscriptioData, setSubscriptioData] = useState({});


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    const managePackageSubscriptionStatus = async (companyId) => {
		await checkPackageSubscriptionStatus(companyId);
	}

    const getSubscriptionPlan = async (companyId) => {
        if (!companyId) return; // Agar companyId nahi hai to kuch nahi karein
        const response = await fetchSubscription(companyId);
        if (response.status === 200) {
            setSubscriptioData(response.data);
        }
        // console.log(response);
    };

    useEffect(() => {
        const companyIdCookie = getCookie('company_id');

        // Set state with cookie values
        setCompanyId(companyIdCookie);
    }, []);

    useEffect(() => {
        
        const fetchData = async () => {
			await managePackageSubscriptionStatus(companyId);
            getSubscriptionPlan(companyId);
		};

		fetchData();

    }, [companyId]); // companyId ke change hone par call karein


    return (
        <>
            <Layout>

                <div className="row">
                    <div className="col-md-12 p-2">
                        <Button variant="primary float-end" size="sm" onClick={handleShowModal}> Subscribe Plan </Button>
                        <SubscriptionModal show={showModal} handleClose={handleCloseModal} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">

                        <div className="card">
                            <h5 className="card-header">Subscription Detail</h5>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Status</td>
                                            <td>{subscriptioData?.subscription_status}</td>
                                        </tr>
                                        <tr>
                                            <td>Package</td>
                                            <td>{subscriptioData?.package_type}</td>
                                        </tr>
                                        <tr>
                                            <td>Duration</td>
                                            <td>{subscriptioData?.package_duration}</td>
                                        </tr>
                                        <tr>
                                            <td>Start Date</td>
                                            <td>{ moment(subscriptioData?.start_date).format('DD-MMM-YYYY') }</td>
                                        </tr>
                                        <tr>
                                            <td>End Date</td>
                                            <td>{ moment(subscriptioData?.end_date).format('DD-MMM-YYYY')}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </Layout>
        </>
    )
}

export default Subscription;

