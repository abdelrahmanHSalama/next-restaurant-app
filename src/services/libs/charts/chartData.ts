import { MonthlyChartData } from './AreaChart';
import { StackedChartData } from './StackedAreaChart';

export const chartData: Record<string, MonthlyChartData[]> = {
  July: [
    { name: '5k', value: 20 },
    { name: '10k', value: 45 },
    { name: '15k', value: 35 },
    { name: '20k', value: 64 },
    { name: '25k', value: 48 },
    { name: '30k', value: 52 },
    { name: '35k', value: 22 },
    { name: '40k', value: 43 },
    { name: '45k', value: 64 },
    { name: '50k', value: 59 },
    { name: '55k', value: 44 },
    { name: '60k', value: 55 },
  ],
  August: [
    { name: '5k', value: 30 },
    { name: '10k', value: 35 },
    { name: '15k', value: 25 },
    { name: '20k', value: 40 },
    { name: '25k', value: 50 },
    { name: '30k', value: 55 },
    { name: '35k', value: 60 },
    { name: '40k', value: 45 },
    { name: '45k', value: 35 },
    { name: '50k', value: 42 },
    { name: '55k', value: 47 },
    { name: '60k', value: 51 },
  ],
  September: [
    { name: '5k', value: 25 },
    { name: '10k', value: 28 },
    { name: '15k', value: 32 },
    { name: '20k', value: 45 },
    { name: '25k', value: 38 },
    { name: '30k', value: 44 },
    { name: '35k', value: 49 },
    { name: '40k', value: 50 },
    { name: '45k', value: 41 },
    { name: '50k', value: 46 },
    { name: '55k', value: 43 },
    { name: '60k', value: 39 },
  ],
};

// Stacked chart data for Sales and Profit
export const stackedChartData: Record<string, StackedChartData[]> = {
  'Last 6 Months': [
    { name: 'Mar', sales: 45000, profit: 12000 },
    { name: 'Apr', sales: 52000, profit: 15000 },
    { name: 'May', sales: 48000, profit: 13000 },
    { name: 'Jun', sales: 60000, profit: 18000 },
    { name: 'Jul', sales: 65000, profit: 20000 },
    { name: 'Aug', sales: 70000, profit: 22000 },
  ],
  'This Year': [
    { name: 'Q1', sales: 120000, profit: 35000 },
    { name: 'Q2', sales: 145000, profit: 42000 },
    { name: 'Q3', sales: 135000, profit: 40000 },
    { name: 'Q4', sales: 160000, profit: 48000 },
  ],
  'Last Year': [
    { name: 'Q1', sales: 105000, profit: 30000 },
    { name: 'Q2', sales: 125000, profit: 36000 },
    { name: 'Q3', sales: 115000, profit: 34000 },
    { name: 'Q4', sales: 140000, profit: 40000 },
  ],
};
