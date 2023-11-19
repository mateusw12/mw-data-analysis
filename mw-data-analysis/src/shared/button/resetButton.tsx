import Button from "@mui/material/Button";
import { MdOutlineCleaningServices } from "react-icons/md";

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
        startIcon={<MdOutlineCleaningServices />}
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
