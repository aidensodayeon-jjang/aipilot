import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useEffect, useState } from 'react';
import Chart, { useChart } from 'src/components/chart';
import { useNavigate } from 'react-router-dom';
import { fetchWithToken } from '../../utils/auth/fetch-with-token';

// ----------------------------------------------------------------------
export default function AppWebsiteVisits({ title, subheader, chart: initialChart, ...other }) {
  const { colors, options } = initialChart;
  const [chartData, setChartData] = useState({
    labels: [],
    series: [
      { name: '재원생', type: 'column', fill: 'solid', data: [] },
      {
        name: '이탈',
        type: 'area',
        fill: 'gradient',
        data: [],
      },
      { name: '신규', fill: 'solid', type: 'line', data: [] },
    ], // 예제 시리즈 구조
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchWithToken(
      `/api/course/?group_by=term`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      navigate
    )
      .then((response) => response.json())
      .then((result) => {
        const labels = result.map((item) => item.term);
        const termCounts = result.map((item) => item.term_count);
        const newCounts = result.map((item) => item.new_count);
        setChartData((prevChartData) => ({
          ...prevChartData,
          labels,
          series: [
            { ...prevChartData.series[0], data: termCounts },
            {
              ...prevChartData.series[1],
              data: termCounts,
            },
            { ...prevChartData.series[2], data: newCounts },
          ],
        }));
      });
  }, [navigate]);

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '36%',
      },
    },
    fill: {
      type: chartData.series.map((i) => i.fill || 'solid'), // 기본값 'solid' 설정
    },
    labels: chartData.labels,
    xaxis: {
      type: 'string',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => `${value.toFixed(0)} 명`,
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={chartData.series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
