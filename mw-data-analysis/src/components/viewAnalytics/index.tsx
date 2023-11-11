import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import SaveButton from "../../shared/button/saveButton";
import { extractDataTable } from "../../utils/extractDataTable";
import ContextMenu from "./contextMenu";
import "./style.css";
import React from "react";

const ViewAnalytics = () => {
  const [data, setData] = useState({});
  const [dataHeader, setDataHeader] = useState([]);
  const [dataTableName, setDataTableName] = useState("");
  const [loading, setLoading] = useState(false);
  const [positiveAndNegativeColor, setPositiveAndNegativeColor] =
    useState(false);

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

  const onSaveClick = () => {};

  const handleSelectItem = (key: string) => {
    switch (key) {
      case "positiveAndNegative":
        setPositiveAndNegativeColor(true);
        break;

      case "clearEffect":
        setPositiveAndNegativeColor(false);
        break;

      default:
        break;
    }
  };

  const rows = () => {
    const dataSource =
      dataHeader.length > 0
        ? data[dataHeader[0]].map((_, rowIndex) => {
            const rowData = {};
            dataHeader.forEach((column) => {
              rowData[column] = data[column] ? data[column][rowIndex] : null;
            });
            return rowData;
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

          <ContextMenu selectMenuItem={handleSelectItem}>
            <div>
              <TableContainer component={Paper}>
                <Table
                  size="small"
                  aria-label="a dense table"
                  className="custom-table"
                >
                  <TableHead
                    style={{
                      background: "#ededed",
                    }}
                  >
                    <TableRow>
                      {dataHeader.map((column, index) => (
                        <TableCell key={index}>{column}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows().map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {dataHeader.map((column, columnIndex) => (
                          <React.Fragment>
                            <TableCell
                              align={
                                typeof row[column] == "number"
                                  ? "right"
                                  : "left"
                              }
                              key={columnIndex}
                              className={
                                positiveAndNegativeColor
                                  ? typeof row[column] == "number"
                                    ? row[column] !== null && row[column] >= 0
                                      ? "positive-cell"
                                      : "negative-cell"
                                    : ""
                                  : ""
                              }
                            >
                              {row[column] !== null ? row[column] : ""}
                            </TableCell>
                          </React.Fragment>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </ContextMenu>
        </>
      )}
    </>
  );
};

export default ViewAnalytics;
