'use client';
import { ConfigProvider } from 'antd';
import React, { useState } from 'react';
import { useDarkLightContext } from './DarkLightProvider';
import { ANTD_THEME, ANTD_THEME_DARK } from '../constants';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import arEG from 'antd/locale/ar_EG';
import enUS from 'antd/locale/en_US';
import { useServerInsertedHTML } from 'next/navigation';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

export const AntDProvider: React.FC<{
  children: React.ReactNode;
  locale: string;
  suppressHydrationWarning?: boolean;
}> = ({ children, locale, suppressHydrationWarning = true }) => {
  const [cache] = useState(() => createCache());
  const { isDark } = useDarkLightContext();
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: `</script>${extractStyle(cache)}<script>` }} />
  ));
  return (
    <AntdRegistry>
      <div suppressHydrationWarning={suppressHydrationWarning}>
        <ConfigProvider
          theme={isDark ? ANTD_THEME_DARK : ANTD_THEME}
          locale={locale === 'ar' ? arEG : enUS}
        >
          <StyleProvider cache={cache}>{children}</StyleProvider>
        </ConfigProvider>
      </div>
    </AntdRegistry>
  );
};
