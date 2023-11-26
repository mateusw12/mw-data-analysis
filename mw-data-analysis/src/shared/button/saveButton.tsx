import Button from "@mui/material/Button";
import { AiOutlineCheck } from "react-icons/ai";

const SaveButton = (props: {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}) => {
  const { onClick, label, disabled } = props;
  return (
    <>
      <Button
        color="success"
        startIcon={<AiOutlineCheck />}
        size="small"
        variant="contained"
        type="submit"
        disabled={disabled}
        onClick={onClick}
      >
        {label ? label : "Salvar"}
      </Button>
    </>
  );
};

export default SaveButton;
