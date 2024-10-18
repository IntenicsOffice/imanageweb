// import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../public/assets/css/custom.css';

import dynamic from 'next/dynamic';
import AuthCheck from './AuthCheck';

const Header = dynamic(() => import('./Header'), { ssr: false });
// const Sidenav = dynamic(() => import('./Sidenav'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

const Layout = ({ children }) => {

    return (
        <>
            <div className="container-fluid" style={{ padding: 0 }}>
                <Header />
                    <AuthCheck>
                        <div className="row" style={{ margin: 0 }}>
                            <main className="col-12" >
                                {children}
                            </main>
                            {/* <Sidenav className="col-3" style={{ padding: 0 }} /> */}
                        </div>
                    </AuthCheck>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
