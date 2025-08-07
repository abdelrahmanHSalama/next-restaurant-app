import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';

const Login = () => {
  const t = useTranslations('HomePage');

  return (
    <main className="flex items-center justify-center h-screen bg-primary">
      <div className="w-[1440px] h-full flex items-center justify-center ">
        <div className="w-[43.75%] h-[68%] bg-card rounded-2xl flex items-center">
          <div className="flex justify-between items-center flex-col w-full space-y-8">
            <div className="text-center">
              <h1 className="text-[2rem] font-bold font-main">{t('title')}</h1>
              <h2>{t('subtitle')}</h2>
            </div>
            <Button>
              <GoogleOutlined />
              {t('googleBtn')}
            </Button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
