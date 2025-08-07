'use client';
import { ConfigProvider } from 'antd';
import React, { useState } from 'react';
import { useDarkLightContext } from './DarkLightProvider';
import { ANTD_THEME, ANTD_THEME_DARK } from '../constants';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';

export const AntDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDark } = useDarkLightContext();
  const [cash] = useState(() => createCache());
  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cash)}<script>`,
        }}
      />
    );
  });
  return (
    <AntdRegistry>
      <ConfigProvider theme={isDark ? ANTD_THEME_DARK : ANTD_THEME}>
        <StyleProvider cache={cash}>{children}</StyleProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
};
