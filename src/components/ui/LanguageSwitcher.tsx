'use client';

import { GlobalOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import Image from 'next/image';
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
        style={{ minWidth: 100 }}
        onChange={handleChange}
        options={[
          {
            value: 'en',
            label: (
              <div className="flex items-center gap-1">
                <Image width={36} height={36} src="/UK Flag.png" alt="UK Flag" /> English
              </div>
            ),
          },
          {
            value: 'ar',
            label: (
              <div className="flex items-center gap-1">
                <Image width={36} height={36} src="/Arabic Flag.png" alt="Arabic Flag" /> العربية
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
