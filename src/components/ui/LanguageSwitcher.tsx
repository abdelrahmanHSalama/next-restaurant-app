'use client';

import { Select } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
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
    <div className="flex items-center gap-2">
      {selected === 'ar' ? (
        <Image
          width={40}
          height={27}
          src="/Arabic Flag.png"
          alt="Arabic Flag"
          className="rounded-md"
        />
      ) : (
        <Image width={40} height={27} src="/UK Flag.png" alt="UK Flag" className="rounded-md" />
      )}
      <Select
        value={selected}
        style={{ minWidth: 100 }}
        onChange={handleChange}
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
    </div>
  );
}
