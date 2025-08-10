'use client';
import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const MainLogin = () => {
  const t = useTranslations('LoginPage');
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center bg-card z-10 py-22 px-15 rounded-3xl shadow-xs">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg text-text/75 mb-10">{t('subtitle')}</p>
      <Button type="primary" icon={<GoogleOutlined />} className="w-full" size="large">
        {t('googleBtn')}
      </Button>
      <p className="text-tex-/75 mt-5">
        {t('dontHaveAcc')}{' '}
        <span className="text-primary cursor-pointer" onClick={() => router.push('/register')}>
          {t('createAccount')}
        </span>
      </p>
    </div>
  );
};

export default MainLogin;
