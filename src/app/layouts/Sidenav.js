import Link from "next/link";
// import TodayOnLeave from "../_components/team/TodayOnLeave";
// import TodayLeaveRequest from "../_components/team/TodayLeaveRequest";
// import TeamPresence from "../_components/team/TeamPresence";
const Sidenav = () => {
    return (
        <>
            <aside className="col-md-3 bg-light p-3">
                {/* <h6>Today's Presence 15/20</h6> */}
                {/* <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link active" href="company">Company</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" href="dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link 3</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Company
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">PF/ESIC</a></li>
                            <li><Link className="dropdown-item" href="/subscription">Subscription Plan Detail</Link></li>
                        </ul>
                    </li>
                </ul> */}


                {/* <div class="card  mb-3" >
                    <div class="card-header">
                        <b>Teams</b>
                    </div>
                    <div class="card-body">

                        <div class="accordion" id="accordionPanelsStayOpenExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        Today's On Leave
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div class="accordion-body">
                                        <TodayOnLeave />
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                        Today's Leave Request
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                    <div class="accordion-body">
                                        <TodayLeaveRequest />
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                        Today's Presence 15/20
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                    <div class="accordion-body">
                                        <TeamPresence />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div> */}





            </aside>
        </>
    )
}

export default Sidenav;