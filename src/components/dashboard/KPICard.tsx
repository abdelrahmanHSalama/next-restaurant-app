'use client';
import { TrendDownIcon, TrendUpIcon } from '@phosphor-icons/react';
import { KPIDataType } from './Dashboard';
import { useTranslations } from 'next-intl';

interface KPICardProps {
  item: KPIDataType;
}

const tagColorMap = {
  warning: 'bg-warning/10',
  info: 'bg-info/10',
  success: 'bg-success/10',
  danger: 'bg-danger/10',
} as const;

const KPICard: React.FC<KPICardProps> = ({ item }) => {
  const { title, total, tag, icon, rate, description, dir } = item;
  const tagColor = tagColorMap[tag] || tagColorMap.danger;
  const t = useTranslations('Dashboard');

  return (
    <article className="bg-card p-4 rounded-xl shadow-xs">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-between gap-4">
          <span className="text-[16px] text-text/75 capitalize">
            {title === 'users'
              ? t('totalUsers')
              : title === 'orders'
                ? t('totalOrders')
                : title === 'sales'
                  ? t('totalSales')
                  : title === 'pending'
                    ? t('totalPending')
                    : `Total ${title}`}
          </span>
          <span className="text-[30px] font-bold">{title === 'sales' ? '$' + total : total}</span>
        </div>
        <div className={`flex items-center justify-center size-[60px] rounded-3xl ${tagColor}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-8">
        {dir === 'up' ? (
          <>
            <TrendUpIcon size={24} color="var(--color-success" />
            <span className="text-success">{rate}</span>
          </>
        ) : (
          <>
            <TrendDownIcon size={24} color="var(--color-danger" />
            <span className="text-danger">{rate}</span>
          </>
        )}
        <p className="text-text/75">
          {description === 'upFromYesterday'
            ? t('upFromYesterday')
            : description === 'upFromPastWeek'
              ? t('upFromPastWeek')
              : description === 'downFromYesterday'
                ? t('downFromYesterday')
                : description}
        </p>
      </div>
    </article>
  );
};

export default KPICard;
