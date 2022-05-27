import React from 'react';
import AdminMenu from '../components/adminpage/AdminMenu';
import AdminNavbar from '../components/navbars/AdminNavbar';

function AdminPage() {
  return (
    <>
      <AdminNavbar />
      <div className='admin-page'>
        <AdminMenu />
      </div>
    </>
  )
}

export default AdminPage