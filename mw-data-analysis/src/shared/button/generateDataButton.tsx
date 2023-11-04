import Button from "@mui/material/Button";
import { BsTable } from "react-icons/bs";

const GenerateDataButton = (props: { onClick?: () => void; disabled?: boolean }) => {
  const { onClick, disabled } = props;

  return (
    <>
      <Button
        color="success"
        startIcon={<BsTable />}
        size="small"
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        Gerar Dados
      </Button>
    </>
  );
};

export default GenerateDataButton;
