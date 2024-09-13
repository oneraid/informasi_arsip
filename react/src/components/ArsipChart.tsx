import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

interface ArsipData {
  tahun: string;
  bidang: string;
  total: number;
}

const ChartOne: React.FC = () => {
  const [seriesData, setSeriesData] = useState<number[][]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
    },
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category',
      categories: categories, // Dynamically populated
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ArsipData[]>(
          'http://127.0.0.1:8000/api/arsip/arsip-by-year-and-bidang',
        );

        // Process the response data to get the categories (years) and series data
        const years = Array.from(
          new Set(response.data.map((item) => item.tahun)),
        );
        const bidangMap: { [key: string]: number[] } = {};

        response.data.forEach((item) => {
          if (!bidangMap[item.bidang]) {
            bidangMap[item.bidang] = Array(years.length).fill(0);
          }
          const yearIndex = years.indexOf(item.tahun);
          bidangMap[item.bidang][yearIndex] = item.total;
        });

        const series = Object.keys(bidangMap).map((bidang) => ({
          name: bidang,
          data: bidangMap[bidang],
        }));

        setCategories(years);
        setSeriesData(series.map((s) => s.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <h2 className="text-xl font-semibold">
          Total Arsip per Tahun & Bidang
        </h2>
      </div>

      <div>
        <ReactApexChart
          options={options}
          series={seriesData.map((data, index) => ({
            name: `Bidang ${index + 1}`, // Update this to show the correct bidang name
            data,
          }))}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartOne;
