'use client';
import { ConfigProvider } from 'antd';
import React from 'react';
import { useDarkLightContext } from './DarkLightProvider';
import { ANTD_THEME, ANTD_THEME_DARK } from '../constants';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import arEG from 'antd/locale/ar_EG';
import enUS from 'antd/locale/en_US';

export const AntDProvider: React.FC<{ children: React.ReactNode; locale: string }> = ({
  children,
  locale,
}) => {
  const { isDark } = useDarkLightContext();

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={isDark ? ANTD_THEME_DARK : ANTD_THEME}
        locale={locale === 'ar' ? arEG : enUS}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};
