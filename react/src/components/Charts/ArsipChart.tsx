import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

interface Series {
  name: string;
  data: number[];
}

interface ChartState {
  series: Series[];
  options: ApexOptions;
}

const ArsipChart: React.FC = () => {
  const [state, setState] = useState<ChartState>({
    series: [],
    options: {
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
      },
      colors: ['#3C50E0', '#80CAEE', '#FF5733', '#33FF57'],
      chart: {
        fontFamily: 'Satoshi, sans-serif',
        height: 335,
        type: 'area',
        dropShadow: {
          enabled: true,
          color: '#623CEA14',
          top: 10,
          blur: 4,
          left: 0,
          opacity: 0.1,
        },
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              height: 300,
            },
          },
        },
        {
          breakpoint: 1366,
          options: {
            chart: {
              height: 350,
            },
          },
        },
      ],
      stroke: {
        width: [2, 2],
        curve: 'smooth',
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
      markers: {
        size: 4,
        colors: '#fff',
        strokeColors: ['#3056D3', '#80CAEE'],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
          size: undefined,
          sizeOffset: 5,
        },
      },
      xaxis: {
        type: 'category',
        categories: [], // Will be dynamically populated with years from the backend
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        max: 200,
        labels: {
          formatter: function (value) {
            return value.toFixed(0); // Show whole numbers
          },
        },
      },
    },
  });

  useEffect(() => {
    // Fetch data from Laravel backend
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/arsip-by-year-and-bidang',
        );
        const arsipData = response.data;

        // Process the data for the chart
        const transformedData = processChartData(arsipData);
        setState((prevState) => ({
          ...prevState,
          series: transformedData.series,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: transformedData.categories, // Set categories (years) dynamically
            },
          },
        }));
      } catch (error) {
        console.error('Error fetching arsip data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to process the arsip data from the backend for the chart
  const processChartData = (data: any[]) => {
    const years: string[] = [];
    const bidangMap: { [key: string]: { [year: string]: number } } = {};

    // Iterate over the arsip data to populate bidangMap and years array
    data.forEach((item) => {
      const { tahun, bidang, total_arsip } = item;

      // Add the year if it does not exist in the years array
      if (!years.includes(tahun)) {
        years.push(tahun);
      }

      // Initialize or update bidangMap for each bidang and year
      if (!bidangMap[bidang]) {
        bidangMap[bidang] = {};
      }
      bidangMap[bidang][tahun] = total_arsip;
    });

    // Sort years in ascending order for proper X-axis representation
    years.sort();

    // Fill missing values for each bidang in every year with 0
    const series = Object.keys(bidangMap).map((bidang) => ({
      name: bidang,
      data: years.map((year) => bidangMap[bidang][year] || 0),
    }));

    return {
      categories: years, // Use years as categories for x-axis
      series,
    };
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">
                Total Arsip by Bidang
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ArsipChart;
