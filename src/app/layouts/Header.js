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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


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
        setOwnerName(ownerNameCookie);
    }, []);

    return (
        <>
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="row w-100 align-items-center">
                        <div className="col-2">
                            <Link href="/dashboard" className="navbar-brand">Imanage</Link>
                        </div>

                        <div className="col-8">
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav d-flex flex-row justify-content-around mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link href="/dashboard" className="nav-link">Dashboard</Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link href="/subscription" className="nav-link">Subscription Plan</Link>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>

                        <div className="col-2 d-flex justify-content-center">
                            <div className="dropdown">
                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span>Welcome - {ownerName}</span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    <li>
                                        <a role="button" className="dropdown-item" onClick={handleLogout}>Logout</a>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </nav> */}

            
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="row w-100 align-items-center">
                        <div className="col-4">
                            <Link href="/dashboard" className="navbar-brand">Imanage</Link>
                        </div>

                        <div className="col-8 d-flex justify-content-end">
                            <div className="dropdown ms-auto">
                                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                <span>Welcome - {ownerName}</span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                <li>
                                    <a role="button" className="dropdown-item" onClick={handleLogout}>Logout</a>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-1">
                        <ul className="navbar-nav d-flex flex-row justify-content-center w-100">
                        <li className="nav-item me-3">
                            <Link href="/dashboard" className="nav-link">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/subscription" className="nav-link">Subscription Plan</Link>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>

            
        </>
    );
}




export default Header;
