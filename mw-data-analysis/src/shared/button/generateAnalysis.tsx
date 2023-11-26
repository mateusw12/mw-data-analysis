import Button from "@mui/material/Button";
import { BsTable } from "react-icons/bs";

const GenerateAnalysisButton = (props: { onClick?: () => void; disabled?: boolean }) => {
  const { onClick, disabled } = props;

  return (
    <>
      <Button
        color="info"
        startIcon={<BsTable />}
        size="small"
        variant="contained"
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        Gerar Análise
      </Button>
    </>
  );
};

export default GenerateAnalysisButton;
