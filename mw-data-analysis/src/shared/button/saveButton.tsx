import Button from "@mui/material/Button";
import { AiOutlineCheck } from "react-icons/ai";

const SaveButton = (props: { onClick?: () => void; label?: string }) => {
  const { onClick, label } = props;
  return (
    <>
      <Button
        color="success"
        startIcon={<AiOutlineCheck />}
        size="small"
        variant="contained"
        type="submit"
        onClick={onClick}
      >
        {label ? label : "Salvar"}
      </Button>
    </>
  );
};

export default SaveButton;
