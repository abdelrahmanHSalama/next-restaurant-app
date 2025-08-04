"use client";

import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Layout, theme } from "antd";

const { Header: AntHeader } = Layout;

export const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntHeader
      style={{
        paddingInline: "0.5rem",
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Input
        placeholder="Search"
        prefix={
          <SearchOutlined style={{ color: "var(--color-text-secondary)" }} />
        }
        style={{
          width: "50%",
          maxWidth: "200px",
          height: "55%",
          backgroundColor: "var(--color-input)",
          color: "var(--color-text-secondary)",
          borderRadius: "2rem",
        }}
      />
    </AntHeader>
  );
};
