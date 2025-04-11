import React from "react";
import { BarChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Flex, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

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

const items: MenuProps["items"] = [
  {
    key: "1",
    icon: <BarChartOutlined />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "2",
    icon: <BarChartOutlined />,
    label: <Link to="/users">User management</Link>,
  },
];

const MainLayout: React.FC = () => {
  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={256} theme="light">
        <p className="font-semibold h-16 flex items-center justify-center text-xl">
          CMS
        </p>
        <Menu mode="inline" items={items} />
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
