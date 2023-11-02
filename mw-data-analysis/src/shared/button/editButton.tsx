import Button from "@mui/material/Button";
import { AiOutlineEdit } from "react-icons/ai";

const EditButton = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <>
      <Button
        color="primary"
        startIcon={<AiOutlineEdit />}
        size="small"
        variant="contained"
        onClick={onClick}
      >
        Editar
      </Button>
    </>
  );
};

export default EditButton;
