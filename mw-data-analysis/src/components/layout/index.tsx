import { ReactNode } from "react";
import "./style.css";
import Header from "./header";
import SiderBar from "./sider";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <div className="container">
        <Header />
        <SiderBar />
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default BaseLayout;
