import { useState } from "react";
import { Button, Menu } from "antd";
import { BsArrowLeftShort, BsArrowRightShort, BsTable } from "react-icons/bs";
import { AiOutlineDashboard, AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { TbMapSearch } from "react-icons/tb";
import type { MenuProps } from "antd";
import "../style.css";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  collapse: (collapse: boolean) => void;
}

type MenuItem = Required<MenuProps>["items"][number];

const SiderBar = (props: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    props.collapse(!collapsed);
  };

  const items: MenuItem[] = [
    {
      label: "Análise",
      key: "analytics",
      icon: <BsTable style={{ transform: "scale(1.2)" }} />,
      style: { color: "white" },
      children: [
        {
          label: "Consultar",
          key: "myAnalysis",
          icon: <AiOutlineSearch style={{ transform: "scale(1.2)" }} />,
          onClick: () => navigate("/analytics/query"),
        },
        {
          label: "Criar",
          key: "createAnalysis",
          icon: <MdAdd style={{ transform: "scale(1.2)" }} />,
          onClick: () => navigate("/analytics/create"),
        },
      ],
    },
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <AiOutlineDashboard style={{ transform: "scale(1.2)" }} />,
      style: { color: "white" },
      disabled: true,
      children: [
        {
          label: "Consultar",
          key: "myQueries",
          icon: <AiOutlineSearch style={{ transform: "scale(1.2)" }} />,
          onClick: () => navigate("/dashboard/query"),
        },
        {
          label: "Criar",
          key: "createDashboards",
          icon: <MdAdd style={{ transform: "scale(1.2)" }} />,
          onClick: () => navigate("/dashboard/create"),
        },
      ],
    },
    {
      label: "Geo Análise",
      key: "geoAnalytics",
      icon: <TbMapSearch style={{ transform: "scale(1.2)" }} />,
      style: { color: "white" },
      disabled: true,
      children: [
        {
          label: "Consultar",
          key: "myGeo",
          icon: <AiOutlineSearch style={{ transform: "scale(1.2)" }} />,
          onClick: () => navigate("/geo/query"),
        },
        {
          label: "Criar",
          key: "createGeo",
          icon: <MdAdd style={{ transform: "scale(1.2)" }} />,
          onClick: () => navigate("/geo/create"),
        },
      ],
    },
  ];

  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-content">
          <Menu
            inlineCollapsed={collapsed}
            theme="dark"
            style={{ width: "100%" }}
            mode={"inline"}
            items={items}
          />
        </div>
        <div className="sidebar-bottom">
          <Button
            type="primary"
            icon={
              !collapsed ? (
                <BsArrowLeftShort style={{ transform: "scale(2.2)" }} />
              ) : (
                <BsArrowRightShort style={{ transform: "scale(2.2)" }} />
              )
            }
            className="button-collapsed"
            style={{ width: "100%" }}
            onClick={toggleCollapse}
          />
        </div>
      </div>
    </>
  );
};

export default SiderBar;
