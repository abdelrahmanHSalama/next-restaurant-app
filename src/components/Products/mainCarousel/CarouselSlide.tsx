import { useTranslations } from 'next-intl';
import Image from 'next/image';

const CarouselSlide = () => {
  const t = useTranslations('Products');
  return (
    <div className="flex items-center rtl:justify-end relative bg-primary py-4 md:py-12.5 px-10 md:px-30 text-white rounded-xl">
      <Image
        width={100}
        height={100}
        src="/Pattern.png"
        alt="pattern"
        className="absolute top-0 left-0 w-full h-full z-10"
      />
      <div className="relative z-20 rtl:text-right">
        <p>{t('headerDate')}</p>
        <h2 className="text-4xl font-black leading-12 my-2 break-words">
          {t('headerTitle1')} <br /> {t('headerTitle2')}
        </h2>
        <p className="mb-7.5">{t('headerSubtitle')}</p>
        <button className="cursor-pointer bg-warning tracking-wider leading-7 text-white px-9 py-2 rounded-xl">
          {t('getStarted')}
        </button>
      </div>
    </div>
  );
};

export default CarouselSlide;
