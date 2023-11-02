import { TextField } from "@mui/material";
import {
  Col,
  Form,
  Row,
  Upload,
  UploadProps,
  message,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import { useNavigate } from "react-router";
import "./style.css";
import { read, utils } from "xlsx";
import CreateButton from "../../shared/button/createButton";

const CreateAnalytics = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const [data, setData] = useState<unknown[]>([]);

  const draggerProps: UploadProps = {
    name: "file",
    accept: ".csv, .xlsx, .xls, .xlsm, .xlsb, .xltx",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success("O arquivo foi anexado com sucesso!");
      } else if (status === "error") {
        message.error("Erro ao anexar o arquivo, verifique células mescladas!");
      }
    },
  };

  const onFinish = (values: unknown) => {
    if (!values) console.log("entrei", values);
    notification.success({
      message: "Análise criada com sucesso!",
    });
    sessionStorage.setItem(
      "dataTableName",
      JSON.stringify(form.getFieldValue("analyticsName"))
    );
    sessionStorage.setItem("dataTable", JSON.stringify(data));
    setData([]);
    form.resetFields();
    navigate("/analytics/view");
  };

  return (
    <>
      <Form form={form} name="form" autoComplete="off" onFinish={onFinish}>
        <Row>
          <Col span={12}>
            <Form.Item
              name="analyticsName"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <TextField
                fullWidth
                id="analyticsName"
                label="Nome da Análise *"
                variant="standard"
                onChange={(e) => {
                  form.setFieldsValue({ analyticsName: e.target.value });
                }}
              />
            </Form.Item>
          </Col>
          <Col offset={8} span={4}>
            <div className="align-button-save">
              <CreateButton />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="attachment"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Upload.Dragger
                beforeUpload={(file) => {
                  sessionStorage.removeItem("datatable");
                  sessionStorage.removeItem("datatableName");
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const wb = read(event.target!.result);
                    const sheets = wb.SheetNames;

                    if (sheets.length) {
                      if (!wb.Sheets[sheets[0]]["!merges"]) {
                        const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                        const header = Object.keys(rows[0] as unknown[]);
                        setData(rows);
                        sessionStorage.setItem("rows", String(rows.length));
                        sessionStorage.setItem("header", String(header.length));
                      } else {
                        if (wb.Sheets[sheets[0]]["!merges"]?.length === 1) {
                          const mergedCellsStart =
                            wb.Sheets[sheets[0]]["!merges"]![0].s;
                          const mergedCellsEnd =
                            wb.Sheets[sheets[0]]["!merges"]![0].e;
                          if (
                            mergedCellsStart.c === 0 &&
                            mergedCellsStart.r === 0 &&
                            mergedCellsEnd.r === 0
                          ) {
                            const lastCell =
                              wb.Sheets[sheets[0]]["!ref"]!.split(":")[1];
                            wb.Sheets[sheets[0]]["!ref"] =
                              "A" + mergedCellsEnd.c + ":" + lastCell;
                            const rows = utils.sheet_to_json(
                              wb.Sheets[sheets[0]]
                            );

                            setData(rows);
                            sessionStorage.setItem("rows", String(rows.length));
                          } else {
                            notification.error({
                              message: "erro ao importar os dados",
                            });
                            setData([]);
                          }
                        } else {
                          notification.error({
                            message: "erro ao importar os dados",
                          });
                          setData([]);
                        }
                      }
                    }
                  };
                  reader.readAsArrayBuffer(file);
                  return false;
                }}
                style={{ minHeight: "calc(100vh - 280px)" }}
                {...draggerProps}
              >
                <p className="ant-upload-drag-icon">
                  <AiOutlineInbox style={{ transform: "scale(4.0)" }} />
                </p>
                <p className="ant-upload-text">
                  Clique ou arraste para anexar o arquivo!
                </p>
                <p className="ant-upload-hint">
                  Extensões suportadas: .csv, .xlsx, .xls, .xlsm, .xlsb, .xltx
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateAnalytics;
