import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const onBackHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você tentou visitar não existe!"
        extra={
          <Button onClick={onBackHomeClick} type="primary">
            Voltar ao Início
          </Button>
        }
      />
    </>
  );
};

export default ErrorPage;
