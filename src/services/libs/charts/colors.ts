import { useMemo } from 'react';
import { useDarkLightContext } from '@/services/context';

export const CHART_COLORS = ['#4880FF', '#DBA5FF', '#FF8F6DCC'];
export const DARK_CHART_COLORS = ['#4880FF', '#DBA5FF', '#FF8F6DCC'];

export const useChartColors = () => {
  const { isDark } = useDarkLightContext();
  const colors = useMemo(() => {
    return isDark ? DARK_CHART_COLORS : CHART_COLORS;
  }, [isDark]);

  const getColorByIndex = (index: number) => {
    if (index >= colors.length) return colors[0];
    return colors[index];
  };

  return { colors, getColorByIndex };
};
