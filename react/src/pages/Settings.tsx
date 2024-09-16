import React from 'react';
import UpdatePassword from '../components/Settings/UpdatePassword';
import UpdateEmail from '../components/Settings/UpdateEmail';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UpdateName from '../components/Settings/UpdateName';

const Dashboard: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Settings" />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <UpdatePassword />
        <UpdateEmail />
        <UpdateName />
      </div>
    </>
  );
};

export default Dashboard;
