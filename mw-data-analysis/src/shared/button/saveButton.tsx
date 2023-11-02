import Button from "@mui/material/Button";
import { AiOutlineCheck } from "react-icons/ai";

const SaveButton = (props: { onClick?: () => void }) => {
  const { onClick } = props;
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
        Salvar
      </Button>
    </>
  );
};

export default SaveButton;
