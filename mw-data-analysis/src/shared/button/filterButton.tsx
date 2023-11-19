import Button from "@mui/material/Button";
import { BsFilter } from "react-icons/bs";

const FilterButton = (props: { onClick?: () => void; disabled?: boolean }) => {
  const { onClick, disabled } = props;

  return (
    <>
      <Button
        color="info"
        startIcon={<BsFilter />}
        size="small"
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        Filtrar por Periodo
      </Button>
    </>
  );
};

export default FilterButton;
