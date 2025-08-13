'use client';
import { Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LanguageSwitcher = () => {
  const [selected, setSelected] = useState('en');
  const router = useRouter();

  useEffect(() => {
    const locale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('locale='))
      ?.split('=')[1];
    if (locale) {
      setSelected(locale);
    } else {
      setSelected('en');
    }
  }, []);

  const handleChange = (value: string) => {
    document.cookie = `locale=${value}; path=/`;
    setSelected(value);
    router.refresh();
  };

  return (
    <Select
      value={selected}
      style={{ minWidth: 100 }}
      onChange={(value) => handleChange(value)}
      options={[
        {
          value: 'en',
          label: 'English',
        },
        {
          value: 'ar',
          label: 'العربية',
        },
      ]}
    />
  );
};
export default LanguageSwitcher;
