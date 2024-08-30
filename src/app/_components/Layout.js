import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';
import AuthCheck from './AuthCheck';

const Header = dynamic(() => import('./layouts/Header'), { ssr: false });
const Sidenav = dynamic(() => import('./layouts/Sidenav'), { ssr: false });
const Footer = dynamic(() => import('./layouts/Footer'), { ssr: false });

const Layout = ({ children }) => {

    return (
        <>
            <div className="container-fluid" style={{ padding: 0 }}>
                <Header />
                    <AuthCheck>
                        <div className="row" style={{ margin: 0 }}>
                            <main className="col-10" >
                                {children}
                            </main>
                            <Sidenav className="col-2" style={{ padding: 0 }} />
                        </div>
                    </AuthCheck>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
