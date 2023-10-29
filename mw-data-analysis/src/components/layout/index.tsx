import { ReactNode, useState } from "react";
import "./style.css";
import Header from "./header";
import SiderBar from "./sider";

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
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default BaseLayout;
