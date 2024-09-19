"use client"

import { useEffect } from "react";
import { getCookie } from "../utils/ClientHelpers";
import { checkPackageSubscriptionStatus } from "../../../_controllers/SubscriptionController";
import Link from "next/link";

export default function PaymentSuccess() {

	const companyIdCookie = getCookie("company_id");

	const managePackageSubscriptionStatus = async () => {
		console.log("companyIdCookie", companyIdCookie);
		await checkPackageSubscriptionStatus(companyIdCookie);
	}

	useEffect(() => {
		managePackageSubscriptionStatus();
	}, []);



	return (
		<div>
			<div className="container">

				<div className="row ">
					<div className="col-md-4"></div>
					<div className="col-md-4 mt-5">
						<div className="card border-success">
							<div className="card-header">
								Payment Status
							</div>
							<div className="card-body">
								<h4 className="card-title text-success">Payment Successful!</h4>
								<p className="card-text">Thank you for your purchase.</p>
								<p className="card-text">Your payment has been processed successfully.</p>
								<br />
								<div className="d-grid gap-2 col-6 mx-auto">
									<Link href="/dashboard" className="btn btn-outline-primary">Go to Dashboard</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4"></div>
				</div>
			</div>
		</div>
	);
}
