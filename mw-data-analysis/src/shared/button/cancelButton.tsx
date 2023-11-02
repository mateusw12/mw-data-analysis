import Button from "@mui/material/Button";
import { AiOutlineClose } from "react-icons/ai";

const CancelButton = (props: { onClick: () => void; disabled?: boolean }) => {
  const { onClick, disabled } = props;

  return (
    <>
      <Button
        color="error"
        startIcon={<AiOutlineClose />}
        size="small"
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        Cancelar
      </Button>
    </>
  );
};

export default CancelButton;
