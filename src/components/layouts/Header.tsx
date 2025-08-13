'use client';

import { useSideBarProvider } from '@/services/context';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { ListIcon } from '@phosphor-icons/react';
import { Avatar, Input, Grid } from 'antd';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const { useBreakpoint } = Grid;

export const Header = () => {
  const { toggleCollapsed, toggleDrawer, collapsed } = useSideBarProvider();
  const screens = useBreakpoint();
  return (
    <header className="flex items-center justify-between gap-4 md:gap-0 px-4 md:px-8 py-3 shadow-xs bg-card">
      <div className="flex items-center gap-2 md:gap-6">
        {(!screens.md || !collapsed) && (
          <div>
            <ListIcon
              className="size-6 mx-auto cursor-pointer"
              onClick={screens.md ? toggleCollapsed : toggleDrawer}
            />
          </div>
        )}
        <Input
          style={{ padding: '8px 16px' }}
          id="search-input"
          placeholder="Search"
          prefix={<SearchOutlined className="!text-text/50 *:!size-4" />}
          className="!bg-input !rounded-3xl flex-1 lg:!min-w-100"
        />
      </div>
      <div className="flex items-center gap-2 md:gap-6">
        <div>
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-2 md:gap-5">
          <Avatar size={44} icon={<UserOutlined />} />
          <div className="flex flex-col gap-1">
            <span>username</span>
            <span>role</span>
          </div>
        </div>
      </div>
    </header>
  );
};
