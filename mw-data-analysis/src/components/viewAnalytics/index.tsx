import { TextField } from "@mui/material";
import { Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import SaveButton from "../../shared/button/saveButton";
import { extractDataTable } from "../../utils/extractDataTable";
import ContextMenu from "./contextMenu";
import "./style.css";

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

  const onSaveClick = () => {};

  return (
    <>
      {loading ? (
        <>
          <Spin />
        </>
      ) : (
        <>
          <div className="align-header">
            <TextField
              id="analyticsName"
              label="Nome da Análise"
              disabled
              value={dataTableName}
              variant="standard"
              style={{ width: 500 }}
            />

            <SaveButton onClick={onSaveClick} />
          </div>

          <ContextMenu>
            <div>
              <Table
                pagination={false}
                bordered={true}
                columns={createColumns() as unknown[]}
                dataSource={createDataSource()}
                size="small"
              />
            </div>
          </ContextMenu>
        </>
      )}
    </>
  );
};

export default ViewAnalytics;
