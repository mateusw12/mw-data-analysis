import "../style.css";
import { Button } from "antd";
import { FiLogOut } from "react-icons/fi";
const Header = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src="/src/assets/pages/loog.png" alt="Logo" />
        </div>
        <div className="header-right">
          <div className="user-info">
            <p>User Name</p>
          </div>
          <Button
            title="Logout"
            className="logout-button"
            icon={<FiLogOut style={{ transform: "scale(1.3)" }} />}
          ></Button>
        </div>
      </div>
    </>
  );
};
export default Header;
