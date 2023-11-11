import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Col, Modal, Row } from "antd";
import { useState } from "react";
import { ColorPicker } from "antd";

const CustomEffectColorModal = (props: {
  isModalOpen: boolean;
  onModalClose: () => void;
  onModalSaveClose: (color: string, minValue?, maxValue?) => void;
}) => {
  const {
    isModalOpen,
    onModalSaveClose: onModalSaveCLose,
    onModalClose,
  } = props;

  const [typeHighlight, setTypeHighlight] = useState("minorValue");
  const [colorValue, setColorValue] = useState("");
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  const handleOk = () => {
    if (typeHighlight === "minorValue") onModalSaveCLose(colorValue, minValue);
    else if (typeHighlight === "majorValue")
      onModalSaveCLose(colorValue, undefined, maxValue);
    else if (typeHighlight === "betweenValue")
      onModalSaveCLose(colorValue, minValue, maxValue);
  };

  const handleCancel = () => {
    onModalClose();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setTypeHighlight(event.target.value as string);
  };

  return (
    <>
      <Modal
        title="Customizar Coloração de Valores"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={750}
      >
        <Row>
          <Col span={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo de Destaque
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                value={typeHighlight}
                label="Tipo de Destaque"
                variant="standard"
                onChange={handleChange}
              >
                <MenuItem value={"minorValue"}>Menor que valor</MenuItem>
                <MenuItem value={"majorValue"}>Maior que valor</MenuItem>
                <MenuItem value={"betweenValue"}>Entre valores</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row align={"middle"}>
          {typeHighlight === "minorValue" ? (
            <>
              <Col span={6}>
                <TextField
                  onChange={(value) => setMinValue(value.target.value)}
                  fullWidth
                  type="number"
                  id="standard-basic"
                  label="Insira o valor mínimo"
                  variant="standard"
                />
              </Col>
              <Col offset={1} span={9}>
                <ColorPicker
                  onChange={(value) => setColorValue(value.toHexString())}
                  showText={(color) => (
                    <span>Selecione a cor: ({color.toHexString()})</span>
                  )}
                />
              </Col>
            </>
          ) : typeHighlight === "majorValue" ? (
            <>
              <Col span={6}>
                <TextField
                  onChange={(value) => setMaxValue(value.target.value)}
                  fullWidth
                  type="number"
                  id="standard-basic"
                  label="Insira o valor máximo"
                  variant="standard"
                />
              </Col>
              <Col offset={1} span={9}>
                <ColorPicker
                  onChange={(value) => setColorValue(value.toHexString())}
                  showText={(color) => (
                    <span>Selecione a cor: ({color.toHexString()})</span>
                  )}
                />
              </Col>
            </>
          ) : typeHighlight === "betweenValue" ? (
            <>
              <Col span={6}>
                <TextField
                  onChange={(value) => setMinValue(value.target.value)}
                  fullWidth
                  type="number"
                  id="standard-basic"
                  label="Insira o valor mínimo"
                  variant="standard"
                />
              </Col>
              <Col offset={1} span={6}>
                <TextField
                  onChange={(value) => setMaxValue(value.target.value)}
                  fullWidth
                  type="number"
                  id="standard-basic"
                  label="Insira o valor máximo"
                  variant="standard"
                />
              </Col>
              <Col offset={1} span={9}>
                <ColorPicker
                  onChange={(value) => setColorValue(value.toHexString())}
                  showText={(color) => (
                    <span>Selecione a cor: ({color.toHexString()})</span>
                  )}
                />
              </Col>
            </>
          ) : (
            <></>
          )}
        </Row>
      </Modal>
    </>
  );
};

export default CustomEffectColorModal;
