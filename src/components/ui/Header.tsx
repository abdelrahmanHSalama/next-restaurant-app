"use client";

import { useSideBarProvider } from "@/services/context";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { ListIcon } from "@phosphor-icons/react";
import { Button, Input, Layout, theme } from "antd";

const { Header: AntHeader } = Layout;

export const Header = () => {
  const { collapsed, setCollapsed } = useSideBarProvider();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntHeader
      style={{
        paddingInline: '0.5rem',
        background: colorBgContainer,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
      <div className={`py-4 my-2 ${collapsed ? 'hidden' : ''}`}>
        <ListIcon
          className="size-6 mx-auto cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <Input
        placeholder="Search"
        prefix={
          <SearchOutlined style={{ color: 'var(--color-text-secondary)' }} />
        }
        style={{
          width: '50%',
          maxWidth: '200px',
          height: '55%',
          backgroundColor: 'var(--color-input)',
          color: 'var(--color-text-secondary)',
          borderRadius: '2rem',
        }}
      />
    </AntHeader>
  );
};
