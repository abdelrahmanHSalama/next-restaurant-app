'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type DataType = {
  name: string;
  value: number;
};

const transformDataForStacking = (chartData: Record<string, DataType[]>) => {
  const months = Object.keys(chartData);
  const firstMonthData = chartData[months[0]] || [];

  return firstMonthData.map((item, index) => {
    const dataPoint: Record<string, any> = { name: item.name };
    months.forEach((month) => {
      dataPoint[month] = chartData[month]?.[index]?.value || 0;
    });
    return dataPoint;
  });
};

const StackedAreaChart = ({ chartData }: { chartData: Record<string, DataType[]> }) => {
  const stackedData = transformDataForStacking(chartData);
  const months = Object.keys(chartData);
  const colors = ['#8884d8', '#82ca9d', '#ffc658'];
  const t = useTranslations('Dashboard');

  return (
    <div className="px-6 py-7 rounded-lg shadow bg-card w-full">
      <h2 className="text-2xl font-bold mb-4">{t('monthlySalesComparison')}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={stackedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {months.map((month, index) => (
            <Area
              key={month}
              type="monotone"
              dataKey={month}
              stackId="1"
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              name={month}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedAreaChart;
