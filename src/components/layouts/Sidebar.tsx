'use client';

import { Divider, Drawer, Grid } from 'antd';
import Sider from 'antd/es/layout/Sider';

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
  FilesIcon,
} from '@phosphor-icons/react';

import { useSideBarProvider } from '@/services/context';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import RenderMenuSection, { MenuItem } from './RenderMenuSection';
import { supabase } from '@/services/libs/auth';

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

function getItem(label: React.ReactNode, key: string, icon: React.ReactNode): MenuItem {
  return {
    key,
    icon: <span className="flex items-center justify-center !align-middle">{icon}</span>,
    label,
  };
}

const { useBreakpoint } = Grid;

export const Sidebar = () => {
  const { collapsed, toggleCollapsed, toggleDrawer, drawerOpened, setDrawerOpened } =
    useSideBarProvider();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Sidebar');
  const screens = useBreakpoint();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  const mainMenuItems: MenuItem[] = useMemo(
    () => [
      getItem(t('dashboard'), '/dashboard', <GaugeIcon className="size-6" />),
      getItem(t('products'), '/products', <SquaresFourIcon className="size-6" />),
      getItem(t('files'), '/files', <FilesIcon className="size-6" />),
      getItem(t('favorites'), '/favorites', <HeartStraightIcon className="size-6" />),
      getItem(t('inbox'), '/inbox', <ChatsIcon className="size-6" />),
      getItem(t('orderList'), '/order-list', <ListChecksIcon className="size-6" />),
      getItem(t('productStock'), '/product-stock', <DatabaseIcon className="size-6" />),
    ],
    [t]
  );

  const pagesMenuItems: MenuItem[] = useMemo(
    () => [
      getItem(t('pricing'), '/pricing', <GiftIcon className="size-6" />),
      getItem(t('calendar'), '/calendar', <CalendarDotsIcon className="size-6" />),
      getItem(t('todo'), '/todo', <ClipboardIcon className="size-6" />),
      getItem(t('contacts'), '/contact', <UsersIcon className="size-6" />),
      getItem(t('invoices'), '/invoice', <MoneyIcon className="size-6" />),
      getItem(t('uiElements'), '/ui-elements', <ChartBarIcon className="size-6" />),
      getItem(t('team'), '/team', <UserIcon className="size-6" />),
      getItem(t('table'), '/table', <GridNineIcon className="size-6" />),
    ],
    [t]
  );

  const settingsMenuItems: MenuItem[] = useMemo(
    () => [
      getItem(t('settings'), '/settings', <GearSixIcon className="size-6" />),
      getItem(
        <span onClick={handleLogout}>{t('logout')}</span>,
        'logout',
        <PowerIcon className="size-6" onClick={handleLogout} />
      ),
    ],
    [t]
  );

  const handleSelect = (key: string) => {
    if (key !== pathname && key !== 'logout') {
      setDrawerOpened(false);
      router.push(key);
    }
  };

  const renderSection = (items: MenuItem[], showLabel?: boolean, label?: string) => (
    <>
      {showLabel && !collapsed && label && (
        <p className="text-text/75 mx-6 my-4 px-[30px]">{label}</p>
      )}
      <RenderMenuSection
        items={items}
        selectedKey={pathname}
        onSelect={handleSelect}
        collapsed={collapsed}
        drawerOpened={drawerOpened}
      />
    </>
  );

  const sideBarContent = (
    <>
      {renderSection(mainMenuItems)}
      <Divider style={{ margin: '16px 0' }} />
      {renderSection(pagesMenuItems, true, t('pages'))}
      <Divider style={{ margin: '16px 0' }} />
      {renderSection(settingsMenuItems)}
    </>
  );

  return (
    <>
      {screens.md && (
        <Sider collapsed={collapsed} width={240} style={siderStyle} className="shadow-xs">
          {!collapsed ? (
            <h1 className="text-center py-4 my-2 font-extrabold text-xl text-primary ">
              Dash<span className="text-text">Stack</span>
            </h1>
          ) : (
            <div className="py-4 my-2">
              <ListIcon
                className="size-6 mx-auto cursor-pointer"
                onClick={!screens.md ? toggleDrawer : toggleCollapsed}
              />
            </div>
          )}
          {sideBarContent}
        </Sider>
      )}
      {!screens.md && (
        <Drawer
          title={
            <h1 className="text-center font-extrabold text-xl text-primary">
              Dash<span className="text-text">Stack</span>
            </h1>
          }
          classNames={{
            header: '*:flex-row-reverse',
          }}
          styles={{
            body: { scrollbarWidth: 'thin', scrollbarGutter: 'stable', paddingInline: '20px' },
          }}
          placement="left"
          width={500}
          onClose={() => setDrawerOpened(false)}
          open={drawerOpened}
        >
          {sideBarContent}
        </Drawer>
      )}
    </>
  );
};
