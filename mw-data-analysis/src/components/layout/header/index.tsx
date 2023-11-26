import "../style.css";
import { Button } from "antd";
import { AiOutlineInfoCircle, AiOutlineTool } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to={"/"}>
          <div className="logo">
            <img src="/assets/pages/loog.png" alt="Logo" />
          </div>
        </Link>
        <div className="header-right">
          <div className="user-info">
            <p>User Name</p>
          </div>
          <Button
            title="Dúvidas e Suporte"
            className="logout-button"
            icon={<AiOutlineTool style={{ transform: "scale(1.3)" }} />}
          />
          <Button
            title="Sobre"
            className="logout-button"
            icon={<AiOutlineInfoCircle style={{ transform: "scale(1.3)" }} />}
          />
          <Button
            title="Logout"
            className="logout-button"
            icon={<FiLogOut style={{ transform: "scale(1.3)" }} />}
          />
        </div>
      </div>
    </>
  );
};
export default Header;
