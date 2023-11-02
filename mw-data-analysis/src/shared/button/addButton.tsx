import Button from "@mui/material/Button";
import { MdOutlineAdd } from "react-icons/md";

const CreateButton = (props: { onClick?: () => void; disabled?: boolean }) => {
  const { onClick, disabled } = props;

  return (
    <>
      <Button
        color="info"
        startIcon={<MdOutlineAdd />}
        size="small"
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        Adicionar
      </Button>
    </>
  );
};

export default CreateButton;
