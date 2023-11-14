import { TextField } from "@mui/material";
import { Col, ColorPicker, Modal, Row } from "antd";
import { useState } from "react";

const AchievementColorModal = (props: {
  isModalOpen: boolean;
  onModalClose: () => void;
  onModalSaveClose: (
    veryBadColorValue: string,
    badColorValue: string,
    goodColorValue: string,
    greatColorValue: string,
    excelentColorValue: string,
    badValue: number,
    veryBadValue: number,
    goodValue: number,
    greatValue: number,
    excelentValue: number
  ) => void;
}) => {
  const {
    isModalOpen,
    onModalSaveClose: onModalSaveClose,
    onModalClose,
  } = props;

  const [veryBadColorValue, setVeryBadColorValue] = useState("");
  const [badColorValue, setBadColorValue] = useState("");
  const [goodColorValue, setGoodColorValue] = useState("");
  const [greatColorValue, setGreatColorValue] = useState("");
  const [excelentColorValue, setExcelentColorValue] = useState("");

  const [badValue, setBadValueValue] = useState<number | null>(null);
  const [veryBadValue, setVeryBadValue] = useState<number | null>(null);
  const [goodValue, setGoodValue] = useState<number | null>(null);
  const [greatValue, setGreatValue] = useState<number | null>(null);
  const [excelentValue, setExcelentValue] = useState<number | null>(null);

  const handleCancel = () => {
    onModalClose();
  };

  const handleOk = () => {
    onModalSaveClose(
      veryBadColorValue,
      badColorValue,
      goodColorValue,
      greatColorValue,
      excelentColorValue,
      badValue,
      veryBadValue,
      goodValue,
      greatValue,
      excelentValue
    );
  };

  return (
    <>
      <Modal
        title="Configuração Faixa de Atingimento"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <Row style={{ marginBottom: 20 }} align={"middle"}>
          <Col span={10}>
            <TextField
              onChange={(value) => setVeryBadValue(Number(value.target.value))}
              fullWidth
              type="number"
              id="standard-basic"
              label="Percentual para muito ruim"
              variant="standard"
            />
          </Col>
          <Col offset={1} span={12}>
            <ColorPicker
              onChange={(value) => setVeryBadColorValue(value.toHexString())}
              showText={(color) => (
                <span>Selecione a cor: ({color.toHexString()})</span>
              )}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }} align={"middle"}>
          <Col span={10}>
            <TextField
              onChange={(value) => setBadValueValue(Number(value.target.value))}
              fullWidth
              type="number"
              id="standard-basic"
              label="Percentual para ruim"
              variant="standard"
            />
          </Col>
          <Col offset={1} span={12}>
            <ColorPicker
              onChange={(value) => setBadColorValue(value.toHexString())}
              showText={(color) => (
                <span>Selecione a cor: ({color.toHexString()})</span>
              )}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }} align={"middle"}>
          <Col span={10}>
            <TextField
              onChange={(value) => setGoodValue(Number(value.target.value))}
              fullWidth
              type="number"
              id="standard-basic"
              label="Percentual para bom"
              variant="standard"
            />
          </Col>
          <Col offset={1} span={12}>
            <ColorPicker
              onChange={(value) => setGoodColorValue(value.toHexString())}
              showText={(color) => (
                <span>Selecione a cor: ({color.toHexString()})</span>
              )}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }} align={"middle"}>
          <Col span={10}>
            <TextField
              onChange={(value) => setGreatValue(Number(value.target.value))}
              fullWidth
              type="number"
              id="standard-basic"
              label="Percentual para ótimo"
              variant="standard"
            />
          </Col>
          <Col offset={1} span={12}>
            <ColorPicker
              onChange={(value) => setGreatColorValue(value.toHexString())}
              showText={(color) => (
                <span>Selecione a cor: ({color.toHexString()})</span>
              )}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }} align={"middle"}>
          <Col span={10}>
            <TextField
              onChange={(value) => setExcelentValue(Number(value.target.value))}
              fullWidth
              type="number"
              id="standard-basic"
              label="Ppercentual para excelente"
              variant="standard"
            />
          </Col>
          <Col offset={1} span={12}>
            <ColorPicker
              onChange={(value) => setExcelentColorValue(value.toHexString())}
              showText={(color) => (
                <span>Selecione a cor: ({color.toHexString()})</span>
              )}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AchievementColorModal;
