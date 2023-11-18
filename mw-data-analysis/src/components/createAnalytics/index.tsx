import { TextField } from "@mui/material";
import {
  Button,
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
import { useNavigate } from "react-router";
import "./style.css";
import { read, utils } from "xlsx";
import GenerateDataButton from "../../shared/button/generateDataButton";
import { AiOutlineUpload } from "react-icons/ai";
import { format } from "date-fns";

const CreateAnalytics = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataHeader, setDataHeader] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const onFinish = (values) => {
    notification.success({
      message: "Análise gerada com sucesso!",
    });
    localStorage.setItem("dataTableName", JSON.stringify(values.analyticsName));
    localStorage.setItem("dataTable", JSON.stringify(data));
    localStorage.setItem("dataTableHeader", JSON.stringify(dataHeader));
    form.resetFields();
    navigate("/analytics/view");
  };

const readExcelFile = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const binaryString = event.target.result;
    const workbook = read(binaryString, { type: "binary", cellDates: true });

    const sheets = workbook.SheetNames;
    if (sheets.length) {
      const rows = utils.sheet_to_json(workbook.Sheets[sheets[0]], {
        dateNF: "yyyy-mm-ddTHH:MM:ss.SSSZ",
      });

      const formattedRows = rows.map((row) => {
        const formattedRow: { [key: string]: string | Date } = {};
        Object.keys(row).forEach((key) => {
          const value = row[key];
          if (value instanceof Date) {
            formattedRow[key] = format(value, "dd/MM/yyyy");
          } else {
            formattedRow[key] = value;
          }
        });
        return formattedRow;
      });

      const header = Object.keys(formattedRows[0]);
      setDataHeader(header);
      setData(formattedRows);
      setIsLoaded(false);
    }
  };
  reader.readAsBinaryString(file);
};

  
  return (
    <>
      <Form form={form} name="form" autoComplete="off" onFinish={onFinish}>
        <Row align={"middle"}>
          <Col span={10}>
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
          <Col offset={1} span={4}>
            <Form.Item
              name="attachment"
              rules={[{ required: true, message: "Obrigatório" }]}
            >
              <Upload
                beforeUpload={(file) => {
                  localStorage.removeItem("dataToExport");
                  localStorage.removeItem("iterationColumn");
                  localStorage.removeItem("isAverageStandardDeviation");
                  localStorage.removeItem("stdError");
                  localStorage.removeItem("recalculate");
                  localStorage.removeItem("fractionalRounds");
                  localStorage.removeItem("responseColumn");

                  setIsLoaded(true);
                  readExcelFile(file);
                  return false;
                }}
                {...draggerProps}
              >
                <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col offset={6} span={3}>
            <Form.Item>
              <GenerateDataButton disabled={isLoaded} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateAnalytics;
