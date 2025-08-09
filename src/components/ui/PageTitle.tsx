import { useTranslations } from 'next-intl';

const PageTitle = ({ title }: { title: string }) => {
  const t = useTranslations('Dashboard');
  return <h1 className="text-3xl font-bold mb-7 capitalize">{t('title')}</h1>;
};

export default PageTitle;
