import { useState } from "react";
import "../style.css";
import { Button } from "antd";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
interface SideBarProps {
  collapse: (collapse: boolean) => void;
}

const SiderBar = (props: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    props.collapse(!collapsed);
  };

  return (
    <>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-content">
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
          ></Button>
        </div>
      </div>
    </>
  );
};

export default SiderBar;
