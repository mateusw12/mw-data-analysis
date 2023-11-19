import Button from "@mui/material/Button";
import { AiOutlineUndo } from "react-icons/ai";

const ResetButton = (props: {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}) => {
  const { onClick, disabled, label } = props;

  return (
    <>
      <Button
        color="info"
        startIcon={<AiOutlineUndo />}
        size="small"
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        {label ? label : "Limpar"}
      </Button>
    </>
  );
};

export default ResetButton;
