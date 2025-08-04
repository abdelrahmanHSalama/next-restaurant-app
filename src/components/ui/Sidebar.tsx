import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import type { MenuProps } from "antd";
import {
  FileTextOutlined,
  HistoryOutlined,
  HomeOutlined,
  PieChartOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
// import { useLocation, useNavigate } from 'react-router'

type MenuItem = Required<MenuProps>["items"][number];

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
  getItem("Dashboard", "/", <HomeOutlined />),
  getItem("Analytics", "/analytics", <PieChartOutlined />),
  getItem("History", "/history", <HistoryOutlined />),
  getItem("Todo", "/tasks", <UnorderedListOutlined />),
  getItem("Report", "/report", <FileTextOutlined />),
  getItem("Settings", "/settings", <SettingOutlined />),
];

export const Sidebar = () => {
  // const location = useLocation()
  // const navigate = useNavigate()

  return (
    <Sider theme="light">
      <h1 className="w-full flex justify-center items-center font-extrabold text-xl h-[68px]">
        Dash<span className="text-[var(--primary)]">Stack</span>
      </h1>
      <Menu
        // selectedKeys={[location.pathname]}
        // onClick={({ key }) => navigate(key)}
        mode="inline"
        items={items}
        style={{
          paddingInline: "0.5rem",
          border: "none",
        }}
      />
    </Sider>
  );
};
