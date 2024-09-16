import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ChartTwo: React.FC = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Total Archives',
        data: [],
      },
    ],
    options: {
      colors: ['#3C50E0', '#80CAEE'],
      chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'bar',
        height: 335,
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
          columnWidth: '25%',
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'last',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontFamily: 'Satoshi',
        fontWeight: 500,
        fontSize: '14px',
        markers: {
          radius: 99,
        },
      },
      fill: {
        opacity: 1,
      },
    },
  });

  useEffect(() => {
    // Fetch archive data by bidang
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/total-arsip-per-bidang',
        );
        const arsipData = response.data;

        // Extract bidang and total_arsip for chart
        const bidangCategories = arsipData.map((item: any) => item.bidang);
        const totalArchives = arsipData.map((item: any) => item.total_arsip);

        // Update chart state
        setState((prevState) => ({
          ...prevState,
          series: [{ name: 'Total Archives', data: totalArchives }],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: bidangCategories,
            },
          },
        }));
      } catch (error) {
        console.error('Error fetching archive data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Total Archives by Department
          </h4>
        </div>
      </div>

      <div id="chartTwo" className="-ml-5 -mb-9">
        <ReactApexChart
          options={state.options as ApexOptions}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartTwo;
