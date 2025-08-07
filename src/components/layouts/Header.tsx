'use client';

import { useSideBarProvider } from '@/services/context';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { BellIcon, ListIcon } from '@phosphor-icons/react';
import { Avatar, Input } from 'antd';
import Image from 'next/image';
import { LanguageSwitcher } from '../ui';

export const Header = () => {
  const { collapsed, setCollapsed } = useSideBarProvider();

  return (
    <header className="flex items-center justify-between gap-4 md:gap-0 px-4 md:px-8 py-3 shadow-xs bg-card">
      <div className="flex items-center gap-2 md:gap-6">
        <div className={`${collapsed ? 'hidden' : ''}`}>
          <ListIcon
            className="size-6 mx-auto cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <Input
          style={{ padding: '8px 16px' }}
          id="search-input"
          placeholder="Search"
          prefix={<SearchOutlined className="!text-text/50 *:!size-4" />}
          className="!bg-input !rounded-3xl flex-1 lg:!min-w-100"
        />
      </div>
      <div className="flex items-center gap-2 md:gap-6">
        <div className="relative">
          <BellIcon size={24} color="var(--c-primary)" weight="fill" />
          <span className="bg-danger rounded-full px-1 text-xs text-card absolute -top-1 -right-0.5">
            5
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Image width={40} height={27} src="/UK Flag.png" alt="UK Flag" />
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
