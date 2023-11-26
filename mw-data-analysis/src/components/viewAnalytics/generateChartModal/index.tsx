import { Col, Modal, Row } from "antd";
import CancelButton from "../../../shared/button/cancelButton";
import SaveButton from "../../../shared/button/saveButton";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import {
  BiBarChart,
  BiLineChart,
  BiPieChart,
  BiRadar,
  BiScatterChart,
} from "react-icons/bi";
import "./style.css";
import { GenerateChartData } from "./interface";

const GenerateChartModal = (props: {
  isModalOpen: boolean;
  xVariables: string[];
  yVariables: string[];
  onModalClose: () => void;
  onSaveClick: (data: GenerateChartData) => void;
}) => {
  const { isModalOpen, onModalClose, onSaveClick, xVariables, yVariables } =
    props;

  const renderChartIcon = (chartType) => {
    switch (chartType) {
      case "bar":
        return <BiBarChart />;
      case "scatter":
        return <BiScatterChart />;
      case "pie":
        return <BiPieChart />;
      case "line":
        return <BiLineChart />;
      case "radar":
        return <BiRadar />;
      default:
        return null;
    }
  };

  const [chartType, setChartType] = useState("bar");
  const [xVariable, setXVariable] = useState("");
  const [yVariable, setYVariable] = useState("");

  const handleCancel = () => {
    onModalClose();
  };

  const handleOk = () => {
    const data: GenerateChartData = {
      chartType: chartType,
      xVariable: xVariable,
      yVarbiable: yVariable,
    };
    onSaveClick(data);
  };

  const handleChartTypeChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };
  const handleXVariableChange = (event: SelectChangeEvent) => {
    setXVariable(event.target.value as string);
  };
  const handleYVariableChange = (event: SelectChangeEvent) => {
    setYVariable(event.target.value as string);
  };

  return (
    <>
      <Modal
        title="Gerar Gráfico"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={[
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <CancelButton onClick={handleCancel} />
            <SaveButton label="Aplicar" onClick={handleOk} />
          </div>,
        ]}
      >
        <Row>
          <Col span={8}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo de Gráfico
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                value={chartType}
                label="Tipo de Gráfico"
                variant="standard"
                onChange={handleChartTypeChange}
              >
                {[
                  { value: "bar", label: "Barra" },
                  { value: "scatter", label: "Bolha" },
                  { value: "line", label: "Linha" },
                ].map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    <div className="align-chart-icon">
                      {renderChartIcon(item.value)}
                      {item.label}
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
          <Col offset={1} span={7}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Variável Eixo Y
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                value={xVariable}
                label="Variável Eixo Y"
                variant="standard"
                onChange={handleXVariableChange}
              >
                {xVariables.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
          <Col offset={1} span={7}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Variável Eixo X
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                value={yVariable}
                label="Variável Eixo X"
                variant="standard"
                onChange={handleYVariableChange}
              >
                {yVariables.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default GenerateChartModal;
