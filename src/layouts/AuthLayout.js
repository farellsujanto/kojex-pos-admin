import React from 'react';

import AuthNavbar from "../components/Navbars/AuthNavbar.jsx";

function AuthLayout({ children }) {
    return (
        <div className="main-content">
            <AuthNavbar />
            <div className="header py-7 py-lg-8" style={{background: 'linear-gradient(87deg, #11998e 0, #38ef7d 100%)'}}>
                <div className="separator separator-bottom separator-skew zindex-100">
                    
                </div>
            </div>

            {children}

        </div>
    );
}

export default AuthLayout;