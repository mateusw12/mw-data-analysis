import Button from "@mui/material/Button";
import { BiLineChart } from "react-icons/bi";

const ViewChartButton = (props: {
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const { onClick, disabled } = props;

  return (
    <>
      <Button
        color="warning"
        startIcon={<BiLineChart />}
        size="small"
        variant="contained"
        type="submit"
        onClick={onClick}
        disabled={disabled}
      >
        Criar Gráfico
      </Button>
    </>
  );
};

export default ViewChartButton;
