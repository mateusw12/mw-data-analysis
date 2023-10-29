import { useState } from "react";
import { Button, Menu } from "antd";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsBarChart,
  BsTable,
} from "react-icons/bs";
import { AiOutlineDashboard, AiOutlineSearch } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import {
  GiChart,
  GiHistogram,
  GiPerspectiveDiceSixFacesRandom,
} from "react-icons/gi";
import { BiScatterChart } from "react-icons/bi";
import { TbChartHistogram } from "react-icons/tb";
import { CiWavePulse1 } from "react-icons/ci";
import type { MenuProps } from "antd";
import "../style.css";

interface SideBarProps {
  collapse: (collapse: boolean) => void;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  disabled?: boolean,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    disabled,
  } as MenuItem;
}

const SiderBar = (props: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    props.collapse(!collapsed);
  };

  const items: MenuItem[] = [
    getItem(
      "Análise",
      "analytics",
      <BsTable style={{ transform: "scale(1.2)" }} />,
      false,
      [
        getItem(
          "Consultar",
          "myAnalysis",
          <AiOutlineSearch style={{ transform: "scale(1.2)" }} />
        ),
        getItem(
          "Criar",
          "createAnalysis",
          <MdAdd style={{ transform: "scale(1.2)" }} />
        ),
      ]
    ),

    getItem(
      "Dashboard",
      "dashboard",
      <AiOutlineDashboard style={{ transform: "scale(1.2)" }} />,
      true,
      [
        getItem(
          "Consultar",
          "myQueries",
          <AiOutlineSearch style={{ transform: "scale(1.2)" }} />
        ),
        getItem(
          "Criar",
          "createDashboards",
          <MdAdd style={{ transform: "scale(1.2)" }} />
        ),
      ]
    ),

    getItem(
      "Estatistica",
      "statistic",
      <BsBarChart style={{ transform: "scale(1.2)" }} />,
      true,
      [
        getItem(
          "Consultar",
          "myStatistics",
          <AiOutlineSearch style={{ transform: "scale(1.2)" }} />
        ),
        getItem(
          "Monte Carlo",
          "monteCarlo",
          <GiPerspectiveDiceSixFacesRandom />
        ),
        getItem("Distribuições", "10", <GiHistogram />),
        getItem("Teste de Hipótese", "test", <TbChartHistogram />),
        getItem("Regressão", "regression", <BiScatterChart />),
        getItem("Séries Temporais", "tempSeries", <GiChart />),
        getItem("Análise Multivariada:", "multivariable", <CiWavePulse1 />),
      ]
    ),
  ];

  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-content">
          <Menu
            style={{ width: "100%", background: "transparent", color: "white" }}
            mode={collapsed ? "vertical" : "inline"}
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
            style={{ width: "100%", background: "#062958" }}
            onClick={toggleCollapse}
          />
        </div>
      </div>
    </>
  );
};

export default SiderBar;
