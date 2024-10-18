"use client"
import Link from "next/link";
import { Dropdown } from 'bootstrap';
import { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from "@/app/utils/ClientHelpers.js";

const Header = () => {
    
    const router = useRouter();

    const [ownerName, setOwnerName] = useState(null);
    const clearCookies = () => {
        const cookies = [
            '_id',
            'company_id',
            'access_token',
            'company_name',
            'owner_name',
            'role'
        ];
        cookies.forEach(cookie => {
            deleteCookie(cookie);
        });
    };
    const handleLogout = async () => {
        // try {
        //     await fetch('/api/logout', { method: 'POST' });
        // } catch (error) {
        //     console.error('Error logging out:', error);
        // }

        clearCookies();
        router.push('/');
    };

    useEffect(() => {
        const ownerNameCookie = getCookie("owner_name");

        // Set state with cookie values
        setOwnerName(ownerNameCookie);
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="row w-100 align-items-center">
                        {/* Brand */}
                        <div className="col-2">
                            <Link href="/dashboard" className="navbar-brand">Imanage</Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="col-8">
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav d-flex flex-row justify-content-around mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link href="/dashboard" className="nav-link">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/dashboard" className="nav-link">Master</Link>
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
                                    <li className="nav-item">
                                        <Link href="/company" className="nav-link">Company</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/" className="nav-link">Login</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <div className="col-2 d-flex justify-content-center">
                            <div className="dropdown">
                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span>Welcome - {ownerName}</span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    <li>
                                        <a role="button" className="dropdown-item" onClick={handleLogout}>Logout</a>
                                        {/* <button className="btn btn-primary d-grid w-100" type="button" onClick={handleLogout} >Logout</button> */}
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="row">

                    <div className="col-2">
                        <Link href="/dashboard" className="navbar-brand"> Imanage </Link>
                    </div>

                    <div className="col-8">
                        <div className="container">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link href="/dashboard" className="nav-link"> Dashboard </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/dashboard" className="nav-link"> Master </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Company
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">PF/ESIC</a></li>
                                            <li><a className="dropdown-item" href="#">Subscription Plan Detail</a></li>
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <Link href="/company" className="nav-link"> Company </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/" className="nav-link"> Login </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>

                                    
                                </ul>

                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="dropdown bg-light">
                            <button className="btn btn-secondry btn-sm dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                <span>Welcom - {ownerName} </span>
                            </button>
                            <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton2">
                                <li className="nav-item">
                                    <a className="dropdown-item active" aria-current="page" href="logout">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </nav> */}

        </>
    );
}


export default Header;