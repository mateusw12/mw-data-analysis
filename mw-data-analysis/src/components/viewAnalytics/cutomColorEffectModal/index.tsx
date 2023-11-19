import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Col, Modal, Row, ColorPicker } from "antd";
import { useState } from "react";
import CancelButton from "../../../shared/button/cancelButton";
import SaveButton from "../../../shared/button/saveButton";

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
        width={400}
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
          <Col span={24}>
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
        <Row align={"middle"} style={{ marginBottom: 20 }}>
          {typeHighlight === "minorValue" ? (
            <>
              <Col span={24}>
                <TextField
                  onChange={(value) => setMinValue(value.target.value)}
                  fullWidth
                  type="number"
                  id="standard-basic"
                  label="Insira o valor mínimo"
                  variant="standard"
                />
              </Col>
            </>
          ) : typeHighlight === "majorValue" ? (
            <>
              <Col span={24}>
                <TextField
                  onChange={(value) => setMaxValue(value.target.value)}
                  fullWidth
                  type="number"
                  id="standard-basic"
                  label="Insira o valor máximo"
                  variant="standard"
                />
              </Col>
            </>
          ) : typeHighlight === "betweenValue" ? (
            <>
              <Col span={24}>
                <TextField
                  onChange={(value) => setMinValue(value.target.value)}
                  fullWidth
                  type="number"
                  id="standard-basic"
                  label="Insira o valor mínimo"
                  variant="standard"
                />
              </Col>
            </>
          ) : (
            <></>
          )}
        </Row>
        <Row style={{ marginBottom: 20 }}>
          {typeHighlight === "minorValue" ? (
            <>
              <Col span={24}>
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
              <Col span={24}>
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
              <Col span={24}>
                <TextField
                  onChange={(value) => setMaxValue(value.target.value)}
                  fullWidth
                  type="number"
                  id="standard-basic"
                  label="Insira o valor máximo"
                  variant="standard"
                />
              </Col>
            </>
          ) : (
            <></>
          )}
        </Row>
        {typeHighlight === "betweenValue" ? (
          <>
            <Col span={24}>
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
      </Modal>
    </>
  );
};

export default CustomEffectColorModal;
