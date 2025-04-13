import React from "react";
import { BarChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Flex, Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const MENU_ITEMS = [
  {
    key: "1",
    icon: <BarChartOutlined />,
    label: "Dashboard",
    path: "/",
  },
  {
    key: "2",
    icon: <FaRegUserCircle />,
    label: "Quản lý người dùng",
    path: "/users",
  },
  {
    key: "3",
    icon: <IoBookOutline />,
    label: "Quản lý bài học",
    children: [
      {
        key: "3-1",
        label: "Từ vựng",
        path: "/vocabulary",
      },
      {
        key: "3-2",
        label: "Ngữ pháp",
        path: "/grammar",
      },
      {
        key: "3-3",
        label: "Bài học",
        path: "/lesson",
      },
    ],
  },
];

const items: MenuProps["items"] = MENU_ITEMS.map((it) => ({
  key: it.key,
  icon: it.icon,
  label: it.path ? <Link to={it.path}>{it.label}</Link> : it.label,
  children: it.children?.map((child) => ({
    key: child.key,
    label: child.path ? (
      <Link to={child.path}>{child.label}</Link>
    ) : (
      child.label
    ),
  })),
}));

const MainLayout: React.FC = () => {
  const location = useLocation();

  const getActiveKey = (path: string) => {
    const item = MENU_ITEMS.find((item) => {
      if (item.children) {
        return item.children.some((child) => path.startsWith(child.path ?? ""));
      }
      return item.path === path;
    });
    if (item) {
      if (item.children) {
        const child = item.children.find((child) =>
          path.startsWith(child.path ?? "")
        );
        return child ? child.key : item.key;
      }
      return item.key;
    }
    return "";
  };
  const activeKey = getActiveKey(location.pathname);

  const getOpenKeys = (key: string) => {
    const item = MENU_ITEMS.find((item) => {
      if (item.children) {
        return item.children.some((child) => child.key === key);
      }
      return item.key === key;
    });
    if (item) {
      if (item.children) {
        return [item.key];
      }
      return [];
    }
    return [];
  };
  const openKeys = getOpenKeys(activeKey);

  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={256} theme="light">
        <p className="font-semibold h-16 flex items-center justify-center text-xl">
          CMS
        </p>
        <Menu
          mode="inline"
          items={items}
          selectedKeys={[activeKey]}
          defaultOpenKeys={openKeys}
        />
      </Sider>

      <Layout className="h-screen overflow-hidden">
        <Header className="!bg-white flex items-center justify-end !px-4 !leading-5">
          <Flex align="center" gap={6}>
            <img
              src="https://picsum.photos/200/200"
              alt="Avatar"
              className="size-9 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold">Admin</p>
              <p className="text-gray-500">admin@gmail.com</p>
            </div>
          </Flex>
        </Header>
        <Content className="p-4 overflow-y-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
