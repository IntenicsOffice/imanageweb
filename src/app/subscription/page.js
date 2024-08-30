"use client"

import { useState } from "react";
import Layout from "../_components/Layout";
import SubscriptionModal from "./SubscriptionModal";
import { Button } from "react-bootstrap";

const Subscription = ()=>{
    const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Layout>
                <div className="position-relative" >
                    <div className="position-absolute top-0 end-0 p-2">
                        <Button variant="primary" size="sm" onClick={handleShowModal}> Subscribe Plan </Button>
                    </div>
                </div>
                <SubscriptionModal show={showModal} handleClose={handleCloseModal} />

            </Layout>
        </>
    )
}

export default Subscription;

