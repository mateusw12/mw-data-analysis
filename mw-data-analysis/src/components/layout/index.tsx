import { ReactNode, useState } from "react";
import "./style.css";
import Header from "./header";
import SiderBar from "./sider";
import { Breadcrumb } from "antd";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleColapsed = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <>
      <div className={`container ${collapsed ? "collapsed" : ""}`}>
        <Header />
        <SiderBar collapse={handleColapsed} />
        <div className="content">
          <Breadcrumb
            items={[
              {
                title: "Home",
              },
            ]}
          />
          <div className="main">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
