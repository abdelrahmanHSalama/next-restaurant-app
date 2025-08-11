'use client';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Select } from 'antd';
import { useState } from 'react';
import { useChartColors } from './colors';
import { useTranslations } from 'next-intl';

const { Option } = Select;

export type MonthlyChartData = {
  name: string;
  value: number;
};

const CustomTooltip = ({ active, payload, color }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="relative">
        <div className=" text-white font-bold p-2 rounded" style={{ backgroundColor: color }}>
          {`${value}`}
          {/* <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#5E77FF]"></div> */}
        </div>
      </div>
    );
  }
  return null;
};

const AreaChartComponent = ({
  chartData,
  colorIndex = 0,
}: {
  chartData: Record<string, MonthlyChartData[]>;
  colorIndex?: number;
}) => {
  const [selectedMonth, setSelectedMonth] = useState('August');

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  const { getColorByIndex } = useChartColors();

  const color = getColorByIndex(colorIndex);

  if (!chartData) {
    return null;
  }

  const t = useTranslations('Dashboard');

  return (
    <div className=" px-6 py-7 rounded-lg shadow bg-card w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t('salesDetails')}</h2>
        <Select
          defaultValue={selectedMonth}
          onChange={handleMonthChange}
          className="w-26.5 opacity-75"
        >
          <Option className=" opacity-75" value="July">
            {t('July')}
          </Option>
          <Option className=" opacity-75" value="August">
            {t('August')}
          </Option>
          <Option className=" opacity-75" value="September">
            {t('September')}
          </Option>
        </Select>
      </div>
      <ResponsiveContainer className="py-5" width="100%" height={330}>
        <AreaChart
          className="area-chart focus-visible:outline-none"
          data={chartData[selectedMonth]}
        >
          <defs className="area-chart-defs">
            <linearGradient
              className="area-chart-defs-linear-gradient"
              id="colorValue"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            className="area-chart-x-axis"
            dataKey="name"
            tickMargin={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            className="area-chart-y-axis"
            domain={[0, 100]}
            tickMargin={20}
            axisLine={false}
            tickLine={false}
          />
          <CartesianGrid
            className="area-chart-cartesian-grid"
            vertical={false}
            strokeDasharray="0"
            stroke="var(--c-border)"
          />
          <Tooltip content={<CustomTooltip color={color} />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fillOpacity={1}
            fill="url(#colorValue)"
            dot={{ stroke: color, strokeWidth: 2, r: 3 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
