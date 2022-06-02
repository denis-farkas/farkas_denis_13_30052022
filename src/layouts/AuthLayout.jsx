import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
    <main className='main-layout'>
      <Outlet />
    </main>
    </>
  );
};

export default AuthLayout;