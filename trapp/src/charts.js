// AnalyticsChartPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import 'tailwindcss/tailwind.css';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js/auto';

  
ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  

// Utility function to transform analytics data to Chart.js format
const transformCityDataForChart = (cityData) => {
    if (!cityData || !cityData.rows) return { labels: [], datasets: [] };
    const filteredRows = cityData.rows.filter(row => row.dimensionValues && row.dimensionValues[0].value !== '(not set)');
    const labels = filteredRows.map(row => row.dimensionValues[0].value);
    const dataPoints = filteredRows.map(row => parseFloat(row.metricValues[0].value));

    return {
        labels,
        datasets: [{
            label: 'Active Users',
            data: dataPoints,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }],
    };
};

const transformDailyViewsDataForChart = (dailyViewsData) => {
    if (!dailyViewsData || !dailyViewsData.rows) return { labels: [], datasets: [] };
    
    const labels = dailyViewsData.rows.map(row => {
      const dateString = row.dimensionValues[0].value;
      const year = parseInt(dateString.substring(0, 4));
      const month = parseInt(dateString.substring(4, 6)) - 1; // Months are zero-based in JavaScript Date constructor
      const day = parseInt(dateString.substring(6, 8));
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); // Format the date
    });
    const dataPoints = dailyViewsData.rows.map(row => parseFloat(row.metricValues[0].value));
  
    return {
      labels,
      datasets: [{
        label: 'Screen Page Views',
        data: dataPoints,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }],
    };
  };
  
  
  

const AnalyticsChartPage = () => {
    const [cityChartData, setCityChartData] = useState({});
    const [dailyViewsChartData, setDailyViewsChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
  
    useEffect(() => {
      axios.get('http://localhost:8000/analytics/')
        .then(response => {
          const cityData = transformCityDataForChart(response.data.cityData);
          const dailyViewsData = transformDailyViewsDataForChart(response.data.dailyViewsData);
          setCityChartData(cityData);
          setDailyViewsChartData(dailyViewsData);
          setLoading(false);
        })
        .catch(err => {
          setError('There was an error fetching the analytics data: ' + err.message);
          setLoading(false);
        });
    }, []);
  
    // Render loading state, error state, or the line chart and bar chart if the data is available
    return (
        <div className="flex flex-col min-h-screen"> {/* Use min-h-screen to ensure full height but allow expansion */}
          <header className="p-4 shadow-md">
            <h1 className="text-xl text-center font-bold">Analytics Dashboard</h1>
          </header>

          <div className="text-center my-12">
                    <a
                        href="https://analytics.google.com/analytics/web/?pli=1#/p433240422/realtime/overview?params=_u..nav%3Dmaui"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Open Google Analytics
                    </a>
                </div>
      
          {/* Add more vertical padding/margin if needed, adjust p-4 for more padding */}
          <main className="flex-grow flex flex-col items-center justify-center p-10 bg-gray-50">
            {loading && <p>Loading analytics data...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && (
              <>
                {cityChartData.labels && (
                  <div className="w-full max-w-4xl mb-12 mt-3 h-64"> {/* Adjust mb (margin-bottom) and mt (margin-top) as needed */}
                    <h2 className="text-lg font-semibold text-center mb-4">City-Based Active Users</h2>
                    <Line data={cityChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                )}
                {dailyViewsChartData.labels && (
                  <div className="w-full max-w-4xl mb-20 mt-12 h-64"> {/* Adjust mb and mt for spacing between charts */}
                    <h2 className="text-lg font-semibold text-center mb-4">7-Day Total Views</h2>
                    <Bar data={dailyViewsChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      );
      
  };
  
  export default AnalyticsChartPage;