import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const MultiSelect = (props: {
  isFullWidth?: boolean;
  style?;
  dataSource: string[];
  label: string;
  selectItems: string[];
  onChange: (items: string[]) => void;
}) => {
  const { isFullWidth, dataSource, label, selectItems, onChange, style } =
    props;

  return (
    <>
      <FormControl variant="standard" fullWidth={isFullWidth}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Select
          style={style}
          fullWidth={isFullWidth}
          multiple={true}
          labelId="demo-multiple-name-label"
          value={selectItems}
          label={label}
          onChange={(event: SelectChangeEvent<typeof selectItems>) => {
            const {
              target: { value },
            } = event;
            onChange(typeof value === "string" ? value.split(",") : value);
          }}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {dataSource.map((el) => (
            <MenuItem value={el} key={el}>
              <Checkbox checked={selectItems.indexOf(el) > -1} />
              <ListItemText primary={el} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MultiSelect;
