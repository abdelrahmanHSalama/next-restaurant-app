'use client';

import { Divider, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import type { MenuProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import {
  GaugeIcon,
  SquaresFourIcon,
  HeartStraightIcon,
  ChatsIcon,
  ListChecksIcon,
  DatabaseIcon,
  GiftIcon,
  CalendarDotsIcon,
  ClipboardIcon,
  UsersIcon,
  MoneyIcon,
  ChartBarIcon,
  UserIcon,
  GridNineIcon,
  GearSixIcon,
  PowerIcon,
  ListIcon,
} from '@phosphor-icons/react';

import { useSideBarProvider } from '@/services/context';

const siderStyle: React.CSSProperties = {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: string,
  icon: React.ReactNode
): MenuItem {
  return {
    key,
    icon: (
      <span className="flex items-center justify-center !align-middle">
        {icon}
      </span>
    ),
    label,
  };
}

const mainMenuItems: MenuItem[] = [
  getItem('Dashboard', '/', <GaugeIcon className="size-6" />),
  getItem(
    'Products',
    '/products',
    <SquaresFourIcon className="size-6" />
  ),
  getItem(
    'Favorites',
    '/favorites',
    <HeartStraightIcon className="size-6" />
  ),
  getItem('Inbox', '/inbox', <ChatsIcon className="size-6" />),
  getItem(
    'Order List',
    '/order-list',
    <ListChecksIcon className="size-6" />
  ),
  getItem(
    'Product Stock',
    '/product-stock',
    <DatabaseIcon className="size-6" />
  ),
];

const pagesMenuItems: MenuItem[] = [
  getItem('Pricing', '/pricing', <GiftIcon className="size-6" />),
  getItem(
    'Calendar',
    '/calendar',
    <CalendarDotsIcon className="size-6" />
  ),
  getItem('To-Do', '/todo', <ClipboardIcon className="size-6" />),
  getItem('Contact', '/contact', <UsersIcon className="size-6" />),
  getItem('Invoice', '/invoice', <MoneyIcon className="size-6" />),
  getItem(
    'UI Elements',
    '/ui-elements',
    <ChartBarIcon className="size-6" />
  ),
  getItem('Team', '/team', <UserIcon className="size-6" />),
  getItem('Table', '/table', <GridNineIcon className="size-6" />),
];

const settingsMenuItems: MenuItem[] = [
  getItem(
    'Settings',
    '/settings',
    <GearSixIcon className="size-6" />
  ),
  getItem('Logout', '/logout', <PowerIcon className="size-6" />),
];

const renderMenuSection = (
  items: MenuItem[],
  selectedKey: string,
  onSelect: (key: string) => void,
  collapsed: boolean
) => (
  <Menu
    mode="inline"
    items={items}
    selectedKeys={[selectedKey]}
    onSelect={({ key }) => onSelect(key)}
    style={{ border: 'none' }}
    className={`*:!h-[50px] *:!leading-[50px] *:!my-0 *:!px-4 ${
      collapsed ? '!px-0' : '!px-6'
    }`}
  />
);

export const Sidebar = () => {
  const { collapsed, setCollapsed } = useSideBarProvider();
  const pathname = usePathname();
  const router = useRouter();

  const handleSelect = (key: string) => {
    if (key !== pathname) {
      router.push(key);
    }
  };

  return (
    <Sider
      className="!bg-card"
      collapsed={collapsed}
      width={240}
      style={siderStyle}>
      <h1
        className={`text-center py-4 my-2 font-extrabold text-xl text-primary ${
          collapsed ? 'hidden' : ''
        }`}>
        Dash<span className="text-text">Stack</span>
      </h1>

      <div className={`py-4 my-2 ${!collapsed ? 'hidden' : ''}`}>
        <ListIcon
          className="size-6 mx-auto cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {renderMenuSection(mainMenuItems, pathname, handleSelect, collapsed)}
      <Divider style={{ margin: '16px 0' }} />

      {!collapsed && <p className="text-text/65 mx-6 my-4 px-[30px]">Pages</p>}

      {renderMenuSection(pagesMenuItems, pathname, handleSelect, collapsed)}
      <Divider style={{ margin: '16px 0' }} />

      {renderMenuSection(settingsMenuItems, pathname, handleSelect, collapsed)}
    </Sider>
  );
};
