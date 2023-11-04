import { useEffect, useState } from "react";
import "./style.css";
import { Col, Row, Spin, Table } from "antd";
import { TextField } from "@mui/material";
import { extractDataTable } from "../../utils/extractDataTable";
import { ColumnsType } from "antd/es/table";

const ViewAnalytics = () => {
  const [data, setData] = useState({});
  const [dataHeader, setDataHeader] = useState([]);
  const [dataTableName, setDataTableName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const dataTableLocalStorage = JSON.parse(
      localStorage.getItem("dataTable") as string
    );
    const analyticsName = JSON.parse(
      localStorage.getItem("dataTableName") as string
    );
    setDataTableName(analyticsName);

    sessionStorage.setItem("dataTable", JSON.stringify(dataTableLocalStorage));
    sessionStorage.setItem("dataTableName", JSON.stringify(analyticsName));
    const dataTable = JSON.parse(sessionStorage.getItem("dataTable"));
    if (!dataTable || dataTable.length <= 0) return;

    const dataToSend = extractDataTable(dataTable);
    setDataHeader(dataToSend.itens);
    setData(dataToSend.obj);
    setLoading(false);
  }, []);

  const createColumns = () => {
    const columns: ColumnsType = [];

    for (const item of dataHeader) {
      const columnValue = {
        title: item,
        dataIndex: item,
        key: item,
      };
      columns.push(columnValue);
    }

    return columns;
  };

const createDataSource = () => {
  const dataSource =
    dataHeader.length > 0
      ? data[dataHeader[0]].map((_, index) => {
          const rowData = {};
          dataHeader.forEach((header) => {
            rowData[header] = data[header][index];
          });
          return { key: index, ...rowData };
        })
      : [];

  return dataSource;
};

  return (
    <>
      {loading ? (
        <>
          <Spin />
        </>
      ) : (
        <>
          <Row style={{ marginBottom: 25 }}>
            <Col span={8}>
              <TextField
                id="analyticsName"
                label="Nome da Análise"
                disabled
                value={dataTableName}
                variant="standard"
                fullWidth
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Table
                pagination={false}
                bordered={true}
                columns={createColumns() as unknown[]}
                dataSource={createDataSource()}
                size="small"
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ViewAnalytics;
