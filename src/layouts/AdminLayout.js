import React from 'react';

import { Container } from "reactstrap";

import AdminNavbar from "../components/Navbars/AdminNavbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

import Header from "../components/Headers/Header.jsx";

function AdminLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="main-content" style={bgImageStyle}>
        <AdminNavbar />
        <Header />
        <Container className="mt--7" fluid >
          {children}
        </Container>
      </div>
    </>
  );
}

const bgImageStyle = {
  backgroundImage: `url(require("../assets/img/bg.png"))`,
  height: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

export default AdminLayout;