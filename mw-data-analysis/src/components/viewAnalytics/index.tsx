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
import CustomEffectColorModal from "./cutomColorEffectModal";
import { getColorScale, getRelevanceColor } from "../../utils/colorUtil";

const ViewAnalytics = () => {
  const [data, setData] = useState({});
  const [dataHeader, setDataHeader] = useState([]);
  const [dataTableName, setDataTableName] = useState("");
  const [loading, setLoading] = useState(false);
  const [colorEffect, setColorEffect] = useState(null);
  const [relevanceColor, setRelevanceColor] = useState([]);
  const [isOpenCustomColorEffectModal, setIsOpenCustomColorEffectModal] =
    useState(false);
  const [customEffectMinValue, setCustomEffectMinValue] = useState(undefined);
  const [customEffectMaxValue, setCustomEffectMaxValue] = useState(undefined);
  const [customEffectColorValue, setCustomEffectColorValue] = useState("");
  const [minColumnValue, setMinColumnValue] = useState(null);
  const [maxColumnValue, setMaxColumnValue] = useState(null);

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

    const minMaxValues = getMinMaxValues(dataToSend.itens, dataToSend.obj);
    setMinColumnValue(minMaxValues.min);
    setMaxColumnValue(minMaxValues.max);
    setLoading(false);
  }, []);

  const onSaveClick = () => {};

  const handleSelectItem = (key: string) => {
    switch (key) {
      case "positiveAndNegative":
        setColorEffect("positiveAndNegative");
        break;
      case "negative":
        setColorEffect("negative");
        break;
      case "positive":
        setColorEffect("positive");
        break;
      case "customColor":
        setIsOpenCustomColorEffectModal(true);
        break;
      case "highlightRelevanceGreen":
        setRelevanceColor(getRelevanceColor["highlightRelevanceGreen"]);
        break;
      case "highlightRelevanceBlue":
        setRelevanceColor(getRelevanceColor["highlightRelevanceBlue"]);
        break;
      case "highlightRelevanceOrange":
        setRelevanceColor(getRelevanceColor["highlightRelevanceOrange"]);
        break;
      case "highlightRelevanceRed":
        setRelevanceColor(getRelevanceColor["highlightRelevanceRed"]);
        break;
      case "highlightRelevanceGreenOrange":
        setRelevanceColor(getRelevanceColor["highlightRelevanceGreenOrange"]);
        break;
      case "highlightRelevanceRedGreen":
        setRelevanceColor(getRelevanceColor["highlightRelevanceRedGreen"]);
        break;
      case "highlightRelevanceRedBlue":
        setRelevanceColor(getRelevanceColor["highlightRelevanceRedBlue"]);
        break;

      case "clearEffect":
        setColorEffect(null);
        setRelevanceColor([]);
        break;
    }
  };

  const getCellClassName = (rowValue) => {
    if (colorEffect === "customColor") return "";
    if (colorEffect === "positiveAndNegative") {
      return typeof rowValue === "number"
        ? rowValue >= 0
          ? "positive-cell"
          : "negative-cell"
        : "";
    } else if (colorEffect === "negative") {
      return typeof rowValue === "number"
        ? rowValue < 0
          ? "negative-cell"
          : ""
        : "";
    } else if (colorEffect === "positive") {
      return typeof rowValue === "number"
        ? rowValue >= 0
          ? "positive-cell"
          : ""
        : "";
    }
    return "";
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

  const handleCustomEffectColorSave = (color, minValue, maxValue) => {
    setCustomEffectMinValue(minValue);
    setCustomEffectMaxValue(maxValue);
    setCustomEffectColorValue(color);
    setColorEffect("customColor");
    setIsOpenCustomColorEffectModal(false);
  };

  useEffect(() => {
    // empty useEffect
  }, [customEffectColorValue, customEffectMaxValue, customEffectMinValue]);

  const getCustomCellStyle = (rowValue) => {
    if (typeof rowValue === "number") {
      if (customEffectMinValue && customEffectMaxValue) {
        return rowValue >= customEffectMinValue &&
          rowValue <= customEffectMaxValue
          ? customEffectColorValue
          : "";
      } else if (customEffectMinValue && customEffectMaxValue == undefined) {
        return rowValue <= customEffectMinValue ? customEffectColorValue : "";
      } else if (!customEffectMinValue && customEffectMaxValue) {
        return rowValue <= customEffectMaxValue ? "" : customEffectColorValue;
      }
    } else {
      return "";
    }
  };

  const getMinMaxValues = (headers, data) => {
    let min = Infinity;
    let max = -Infinity;

    headers.forEach((header) => {
      data[header].forEach((value) => {
        if (typeof value === "number") {
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      });
    });

    return { min, max };
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
                          <React.Fragment key={columnIndex}>
                            <TableCell
                              style={{
                                background:
                                  relevanceColor.length > 0
                                    ? getColorScale(
                                        row[column],
                                        minColumnValue,
                                        maxColumnValue,
                                        relevanceColor
                                      )
                                    : colorEffect &&
                                      colorEffect === "customColor"
                                    ? getCustomCellStyle(row[column])
                                    : "",
                              }}
                              align={
                                typeof row[column] == "number"
                                  ? "right"
                                  : "left"
                              }
                              className={
                                colorEffect && colorEffect === "customColor"
                                  ? ""
                                  : getCellClassName(row[column])
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

      {isOpenCustomColorEffectModal && (
        <CustomEffectColorModal
          isModalOpen={isOpenCustomColorEffectModal}
          onModalClose={() => setIsOpenCustomColorEffectModal(false)}
          onModalSaveClose={handleCustomEffectColorSave}
        />
      )}
    </>
  );
};

export default ViewAnalytics;
