import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: 'var(--primary)',
    colorBgContainer: 'var(--background)',
    colorText: 'var(--text)',
    colorTextSecondary: 'var(--text-secondary)',
    colorBorder: 'var(--border)',
    colorBgElevated: 'var(--background-secondary)',
    colorBgContainerDisabled: 'var(--input)',
  },
  components: {
    Button: {
      defaultBg: 'var(--primary)',
      defaultColor: 'white',
      defaultBorderColor: 'var(--primary)',
      colorPrimaryHover: 'var(--primary)',
      colorPrimaryActive: 'var(--primary)',
    },
  },
};
