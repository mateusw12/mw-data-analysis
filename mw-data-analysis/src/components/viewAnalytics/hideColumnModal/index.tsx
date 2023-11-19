import { useState } from "react";
import { Col, Modal, Row } from "antd";
import MultiSelect from "../../../shared/multiSelect";
import CancelButton from "../../../shared/button/cancelButton";
import SaveButton from "../../../shared/button/saveButton";

const HideColumnModal = (props: {
  isModalOpen: boolean;
  hideColumns: string[];
  onModalClose: () => void;
  onModalSaveClose: (hideColumns: string[]) => void;
  columns: string[];
}) => {
  const { isModalOpen, hideColumns, onModalClose, onModalSaveClose, columns } =
    props;

  const [selectedColumns, setSelectedColumns] = useState<string[]>(hideColumns);

  const handleOk = () => {
    onModalSaveClose(selectedColumns);
  };

  const handleCancel = () => {
    onModalClose();
  };

  return (
    <>
      <Modal
        title="Esconder Coluna"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
            <MultiSelect
              isFullWidth={true}
              dataSource={columns}
              label={"Selecione as colunas a serem escondidas"}
              selectItems={selectedColumns}
              onChange={setSelectedColumns}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default HideColumnModal;
