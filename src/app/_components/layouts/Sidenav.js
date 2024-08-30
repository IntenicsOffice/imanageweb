import Link from "next/link";

const Sidenav = () => {
    return (
        <>
            <aside className="col-md-2 bg-light p-3">
                <h3>Sidebar</h3>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link active" href="company">Company</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" href="dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link 3</a>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidenav;