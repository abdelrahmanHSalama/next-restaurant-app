'use client';

import { GlobalOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();

  const handleChange = (value: string) => {
    document.cookie = `locale=${value}; path=/`;
    router.refresh();
  };

  return (
    <>
      <Select
        defaultValue="en"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: 'en', label: 'English' },
          {
            value: 'ar',
            label: 'العربية',
          },
        ]}
        prefix={<GlobalOutlined />}
      />
    </>
  );
}
