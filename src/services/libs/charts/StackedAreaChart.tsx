'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export type StackedChartData = {
  name: string;
  sales: number;
  profit: number;
};

const StackedAreaChart = ({ chartData }: { chartData: Record<string, StackedChartData[]> }) => {
  const [timeRange, setTimeRange] = useState('Last 6 Months');
  const t = useTranslations('Dashboard');

  return (
    <div className="px-6 py-7 rounded-lg shadow bg-card w-full space-y-2">
      <h2 className="text-2xl font-bold">{t('revenue')}</h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={chartData[timeRange as keyof typeof chartData]}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Area
            type="monotone"
            dataKey="sales"
            stackId="1"
            stroke="#FF8F6DCC"
            fill="#FF8F6DCC"
            name="Sales"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stackId="1"
            stroke="#DBA5FF"
            fill="#DBA5FF"
            name="Profit"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedAreaChart;
