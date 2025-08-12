'use client';
import {
  ChartLineUpIcon,
  ClockCounterClockwiseIcon,
  CubeIcon,
  UsersIcon,
} from '@phosphor-icons/react';
import { PageTitle } from '../ui';
import KPICard from './KPICard';
import { AreaChart, chartData, StackedAreaChart, stackedChartData } from '@/services/libs/charts';
import DealsDetails from './DealsDetails';
export type KPIDataType = {
  title: string;
  total: number;
  rate: string;
  description: string;
  dir: 'up' | 'down';
  tag: 'info' | 'warning' | 'success' | 'danger';
  icon: React.ReactNode;
};
const KPIData: KPIDataType[] = [
  {
    title: 'users',
    total: 40689,
    rate: '8.5%',
    description: 'upFromYesterday',
    dir: 'up',
    tag: 'info',
    icon: <UsersIcon size={32} color="var(--color-info)" />,
  },
  {
    title: 'orders',
    total: 10293,
    rate: '1.3%',
    description: 'upFromPastWeek',
    dir: 'up',
    tag: 'warning',
    icon: <CubeIcon size={32} color="var(--color-warning)" />,
  },
  {
    title: 'sales',
    total: 89000,
    rate: '4.3%',
    description: 'downFromYesterday',
    dir: 'down',
    tag: 'success',
    icon: <ChartLineUpIcon size={32} color="var(--color-success)" />,
  },
  {
    title: 'pending',
    total: 2040,
    rate: '1.8%',
    description: 'upFromYesterday',
    dir: 'up',
    tag: 'danger',
    icon: <ClockCounterClockwiseIcon size={32} color="var(--color-danger)" />,
  },
];

const Dashboard = () => {
  return (
    <>
      <PageTitle set="Dashboard" />
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {KPIData.map((item) => (
            <KPICard key={item.title} item={item} />
          ))}
        </div>
        <div className="space-y-4 my-4">
          <AreaChart chartData={chartData} />
          <StackedAreaChart chartData={stackedChartData} />
        </div>
        <DealsDetails />
      </section>
    </>
  );
};

export default Dashboard;
