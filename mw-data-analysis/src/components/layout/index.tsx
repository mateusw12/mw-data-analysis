import { ReactNode, useState } from "react";
import "./style.css";
import Header from "./header";
import SiderBar from "./sider";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { BREAD_CRUMB_ITEMS } from "../../utils/getBreadCrumbItems";
import { AiOutlineHome } from "react-icons/ai";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleColapsed = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const newItems = [];
  newItems.push({
    title: <AiOutlineHome />,
  });

  for (const path of currentPath) {
    if (path.length > 0) {
      const item = {
        title: BREAD_CRUMB_ITEMS[path],
      };
      newItems.push(item);
    }
  }

  return (
    <>
      <div className={`container ${collapsed ? "collapsed" : ""}`}>
        <Header />
        <SiderBar collapse={handleColapsed} />
        <div className="content">
          <div className="bread-crumb-align">
            <Breadcrumb items={newItems} />
          </div>
          <div className="main">{children}</div>
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
