import { ReactNode, useState } from "react";
import "./style.css";
import Header from "./header";
import SiderBar from "./sider";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleColapsed = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className={`container ${collapsed ? "collapsed" : ""}`}>
        <Header />
        <SiderBar collapse={handleColapsed} />
        <div className="content">
          {currentPath ? (
            <></>
          ) : (
            <>
              <Breadcrumb
                items={[
                  {
                    title: "Home",
                  },
                ]}
              />
            </>
          )}
          <div className="main">{children}</div>
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
