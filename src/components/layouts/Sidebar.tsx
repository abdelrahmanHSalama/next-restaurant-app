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
import { useTranslations } from 'next-intl';

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

function getItem(label: React.ReactNode, key: string, icon: React.ReactNode): MenuItem {
  return {
    key,
    icon: <span className="flex items-center justify-center !align-middle">{icon}</span>,
    label,
  };
}

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
    className={`*:!h-[50px] *:!leading-[50px] *:!my-0 *:!px-4 ${collapsed ? '!px-1' : '!px-6'}`}
  />
);

export const Sidebar = () => {
  const { collapsed, setCollapsed } = useSideBarProvider();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Sidebar');

  const mainMenuItems: MenuItem[] = [
    getItem(t('dashboard'), '/dashboard', <GaugeIcon className="size-6" />),
    getItem(t('products'), '/products', <SquaresFourIcon className="size-6" />),
    getItem(t('favorites'), '/favorites', <HeartStraightIcon className="size-6" />),
    getItem(t('inbox'), '/inbox', <ChatsIcon className="size-6" />),
    getItem(t('orderList'), '/order-list', <ListChecksIcon className="size-6" />),
    getItem(t('productStock'), '/product-stock', <DatabaseIcon className="size-6" />),
  ];

  const pagesMenuItems: MenuItem[] = [
    getItem(t('pricing'), '/pricing', <GiftIcon className="size-6" />),
    getItem(t('calendar'), '/calendar', <CalendarDotsIcon className="size-6" />),
    getItem(t('todo'), '/todo', <ClipboardIcon className="size-6" />),
    getItem(t('contacts'), '/contact', <UsersIcon className="size-6" />),
    getItem(t('invoices'), '/invoice', <MoneyIcon className="size-6" />),
    getItem(t('uiElements'), '/ui-elements', <ChartBarIcon className="size-6" />),
    getItem(t('team'), '/team', <UserIcon className="size-6" />),
    getItem(t('table'), '/table', <GridNineIcon className="size-6" />),
  ];

  const settingsMenuItems: MenuItem[] = [
    getItem(t('settings'), '/settings', <GearSixIcon className="size-6" />),
    getItem(t('logout'), '/logout', <PowerIcon className="size-6" />),
  ];

  const handleSelect = (key: string) => {
    if (key !== pathname) {
      router.push(key);
    }
  };

  return (
    <Sider collapsed={collapsed} width={240} style={siderStyle} className="shadow-xs">
      <h1
        className={`text-center py-4 my-2 font-extrabold text-xl text-primary ${
          collapsed ? 'hidden' : ''
        }`}
      >
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

      {!collapsed && <p className="text-text/75 mx-6 my-4 px-[30px]">{t('pages')}</p>}

      {renderMenuSection(pagesMenuItems, pathname, handleSelect, collapsed)}
      <Divider style={{ margin: '16px 0' }} />

      {renderMenuSection(settingsMenuItems, pathname, handleSelect, collapsed)}
    </Sider>
  );
};
