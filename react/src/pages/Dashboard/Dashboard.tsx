import React from 'react';
import ChartTwo from '../../components/Charts/ChartTwo';
import ArsipChart from '../../components/Charts/ArsipChart';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Dashboard: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        <ArsipChart />
      </div>
    </>
  );
};

export default Dashboard;
