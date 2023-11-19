import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Checkbox, Col, Modal, Row } from "antd";
import { useState } from "react";
import "./style.css";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LocalizationProvider from "../../../shared/localizationProvider";
import { periodDictionary } from "../../../utils/dateUtil";
import CancelButton from "../../../shared/button/cancelButton";
import ResetButton from "../../../shared/button/resetButton";
import SaveButton from "../../../shared/button/saveButton";

export const SelectPeriodModal = (props: {
  isModalOpen: boolean;
  onModalClose: (isReset?: boolean) => void;
  onSaveClick: (
    period: string,
    mainDateFilter: string,
    minDate?,
    maxDate?
  ) => void;
  dateColumns: string[];
}) => {
  const { isModalOpen, dateColumns, onModalClose, onSaveClick } = props;

  const [mainDateFilter, setMainDateFilter] = useState("");
  const [isCustomPeriod, setIsCustomPeriod] = useState(false);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [selectPeriod, setSelectPeriod] = useState(null);

  const handleCancel = () => {
    onModalClose();
  };

  const handleOk = () => {
    if (!mainDateFilter) return;
    if (!isCustomPeriod && !selectPeriod) return;
    onSaveClick(selectPeriod, mainDateFilter, minDate, maxDate);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setMainDateFilter(event.target.value as string);
  };

  const handleCustomPeriod = (event: CheckboxChangeEvent) => {
    setIsCustomPeriod(event.target.checked);
  };

  const handleOnPeriodClick = (period: string) => {
    setSelectPeriod(period);
  };

  const handleReset = () => {
    onModalClose(true);
  };

  return (
    <>
      <Modal
        title="Filtrar por Periodo"
        open={isModalOpen}
        onOk={handleOk}
        footer={[
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <CancelButton onClick={handleCancel} />
            <ResetButton onClick={handleReset} />
            <SaveButton onClick={handleOk} />
          </div>,
        ]}
        onCancel={handleCancel}
      >
        <Row style={{ marginBottom: 20 }} align={"middle"}>
          <Col span={15}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Selecione a coluna de data
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                value={mainDateFilter}
                label="Selecione a coluna de data"
                variant="standard"
                onChange={handleChange}
              >
                {dateColumns.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
          <Col offset={1} span={8}>
            <Checkbox value={isCustomPeriod} onChange={handleCustomPeriod}>
              Personalizar Periodo
            </Checkbox>
          </Col>
        </Row>
        <Row>
          {isCustomPeriod ? (
            <>
              <LocalizationProvider>
                <Col span={12}>
                  <DatePicker
                    onChange={setMinDate}
                    label="Data Início Período"
                    maxDate={maxDate}
                  />
                </Col>
                <Col offset={1} span={11}>
                  <DatePicker
                    onChange={setMaxDate}
                    minDate={minDate}
                    label="Data Fim Período"
                  />
                </Col>
              </LocalizationProvider>
            </>
          ) : (
            <>
              <Col span={24}>
                <div className="select-period-container">
                  <Button
                    onClick={() => handleOnPeriodClick("today")}
                    color="warning"
                    size="small"
                    variant="contained"
                  >
                    Dia Atual
                  </Button>
                  <Button
                    onClick={() => handleOnPeriodClick("currentWeek")}
                    color="warning"
                    size="small"
                    variant="contained"
                  >
                    Semana Atual
                  </Button>
                  <Button
                    onClick={() => handleOnPeriodClick("currentTrimester")}
                    color="warning"
                    size="small"
                    variant="contained"
                  >
                    Trimestre Atual
                  </Button>
                  <Button
                    onClick={() => handleOnPeriodClick("currentSemester")}
                    color="warning"
                    size="small"
                    variant="contained"
                  >
                    Semestre Atual
                  </Button>
                  <Button
                    onClick={() => handleOnPeriodClick("currentMonth")}
                    color="warning"
                    size="small"
                    variant="contained"
                  >
                    Mês Atual
                  </Button>
                  <Button
                    onClick={() => handleOnPeriodClick("currentYear")}
                    color="warning"
                    size="small"
                    variant="contained"
                  >
                    Ano atual
                  </Button>
                </div>
              </Col>
            </>
          )}
        </Row>

        {isCustomPeriod ? (
          <></>
        ) : (
          <>
            <Row>
              <Col span={14}>
                <TextField
                  fullWidth
                  variant="standard"
                  disabled
                  label={periodDictionary[selectPeriod]}
                />
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
};

export default SelectPeriodModal;
