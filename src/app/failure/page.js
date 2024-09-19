"use client"

import Link from "next/link";

export default function PaymentFailure() {
	return (
		<div>
			<div className="container">

				<div className="row ">
					<div className="col-md-4"></div>
					<div className="col-md-4 mt-5">
						<div className="card border-danger">
							<div className="card-header">Payment Status</div>
							<div className="card-body">
								<h4 className="card-title text-danger">Payment Failed!</h4>
								<p className="card-text">Unfortunately, your payment could not be processed.</p>
								<p className="card-text">Please try again or contact support if the issue persists.</p>
								<br />
								<div className="d-grid gap-2 col-12 mx-auto">
									<Link href="/subscription" className="btn btn-outline-primary">Retry Again</Link>
									<Link href="/dashboard" className="btn btn-outline-primary">Go To Dashboard</Link>
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
