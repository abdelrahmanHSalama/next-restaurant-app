import { AreaChart } from '../../../libs/charts';
import chartData, { stackedChartData } from '../../../libs/charts/chartData';
import StackedAreaChart from '../../../libs/charts/StackedAreaChart';

export default function Home() {
  return (
    <>
      <div className="flex gap-2 my-4">
        <AreaChart chartData={chartData} />
        <StackedAreaChart chartData={stackedChartData} />
      </div>
      <Dashboard />
    </>
  );
}