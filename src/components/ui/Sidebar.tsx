'use client';

import { Divider, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import type { MenuProps } from 'antd';
import {
  AppstoreOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  HeartOutlined,
  SendOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '/', <DashboardOutlined />),
  getItem('Products', '/products', <AppstoreOutlined />),
  getItem('Favorites', '/favorites', <HeartOutlined />),
  getItem('Inbox', '/inbox', <SendOutlined />),
  getItem('Order List', '/order-list', <UnorderedListOutlined />),
  getItem('Product Stock', '/product-stock', <DatabaseOutlined />),
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState('/');
  // const location = useLocation()
  // const navigate = useNavigate()

  return (
    <Sider className="!bg-card" collapsed={collapsed}>
      <h1 className="text-center py-4 my-1 font-extrabold text-xl text-primary">
        Dash<span className="text-text">Stack</span>
      </h1>
      <Menu
        mode="inline"
        items={items}
        style={{
          paddingInline: '0.5rem',
          border: 'none',
        }}
        selectedKeys={[selectedPage]}
        onSelect={({ key }) => setSelectedPage(key as string)}
      />
      <Divider />
    </Sider>
  );
};
