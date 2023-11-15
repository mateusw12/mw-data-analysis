import Button from "@mui/material/Button";
import { BsBarChart } from "react-icons/bs";

const GenerateChartButton = (props: { onClick?: () => void; disabled?: boolean }) => {
  const { onClick, disabled } = props;

  return (
    <>
      <Button
        color="info"
        startIcon={<BsBarChart />}
        size="small"
        variant="contained"
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        Gerar Gráfico
      </Button>
    </>
  );
};

export default GenerateChartButton;
