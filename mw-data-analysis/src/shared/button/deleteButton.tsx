import Button from "@mui/material/Button";
import { MdDeleteOutline } from "react-icons/md";

const DeleteButton = (props: { onClick: () => void, disabled?:boolean }) => {
  const { onClick, disabled } = props;

  return (
    <>
      <Button
        color="error"
        startIcon={<MdDeleteOutline />}
        size="small"
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        Excluir
      </Button>
    </>
  );
};

export default DeleteButton;
