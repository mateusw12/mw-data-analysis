import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { Spin } from "antd";
import SaveButton from "../../shared/button/saveButton";
import {
  getColorScale,
  getEvolutionColor,
  getRelevanceColor,
} from "../../utils/colorUtil";
import { extractDataTable } from "../../utils/extractDataTable";
import AchievementColorModal from "./achievementColorModal";
import ContextMenu from "./contextMenu";
import CustomEffectColorModal from "./cutomColorEffectModal";
import { AchivementColor, AchivementValue } from "./interface";
import "./style.css";
import GenerateChartButton from "../../shared/button/generateChart";

const ViewAnalytics = () => {
  type Order = "asc" | "desc";

  const [data, setData] = useState({});
  const [dataHeader, setDataHeader] = useState([]);
  const [dataTableName, setDataTableName] = useState("");
  const [loading, setLoading] = useState(false);
  const [colorEffect, setColorEffect] = useState(null);
  const [relevanceColor, setRelevanceColor] = useState([]);
  const [achievementColor, setAchievementColor] =
    useState<AchivementColor>(null);
  const [achievementValue, setAchievementValue] =
    useState<AchivementValue>(null);
  const [isAchievement, setIsAchievement] = useState(false);
  const [isColorEvolution, setIsColorEvolution] = useState(false);
  const [isOpenCustomColorEffectModal, setIsOpenCustomColorEffectModal] =
    useState(false);
  const [isOpenAchievementColorModal, setIsOpenAchievementColorModal] =
    useState(false);
  const [customEffectMinValue, setCustomEffectMinValue] = useState(undefined);
  const [customEffectMaxValue, setCustomEffectMaxValue] = useState(undefined);
  const [customEffectColorValue, setCustomEffectColorValue] = useState("");
  const [minColumnValue, setMinColumnValue] = useState(null);
  const [maxColumnValue, setMaxColumnValue] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState<Order>("asc");

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

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedRows = () => {
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

    const comparator = (a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];

      if (valueA === null || valueA === undefined) return -1;
      if (valueB === null || valueB === undefined) return 1;

      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        return order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (valueA instanceof Date && valueB instanceof Date) {
        return order === "asc"
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      } else {
        return 0;
      }
    };

    return dataSource.sort(comparator);
  };

  const handleSelectItem = (key: string) => {
    setIsAchievement(false);
    setIsColorEvolution(false);

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
      case "colorAchievement":
        setIsOpenAchievementColorModal(true);
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
      case "colorEvolution":
        setIsColorEvolution(true);
        break;
      case "clearEffect":
        setIsColorEvolution(false);
        setColorEffect(null);
        setIsAchievement(false);
        setAchievementColor(null);
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

  const handleCustomEffectColorSave = (color, minValue, maxValue) => {
    setCustomEffectMinValue(minValue);
    setCustomEffectMaxValue(maxValue);
    setCustomEffectColorValue(color);
    setColorEffect("customColor");
    setIsOpenCustomColorEffectModal(false);
  };

  const handleAchievementColorSave = (
    veryBadColorValue,
    badColorValue,
    goodColorValue,
    greatColorValue,
    excelentColorValue,
    badValue,
    veryBadValue,
    goodValue,
    greatValue,
    excelentValuee
  ) => {
    setAchievementColor({
      veryBad: veryBadColorValue ? veryBadColorValue : 0,
      bad: badColorValue ? badColorValue : 0,
      good: goodColorValue ? goodColorValue : 0,
      great: greatColorValue ? greatColorValue : 0,
      excelent: excelentColorValue ? excelentColorValue : 0,
    });

    setAchievementValue({
      bad: badValue,
      veryBad: veryBadValue,
      good: goodValue,
      great: greatValue,
      excelent: excelentValuee,
    });
    setIsAchievement(true);
    setIsOpenAchievementColorModal(false);
  };

  useEffect(() => {
    // empty useEffect
  }, [
    customEffectColorValue,
    customEffectMaxValue,
    customEffectMinValue,
    isAchievement,
    achievementColor,
    achievementValue,
    isColorEvolution,
    orderBy,
    order,
  ]);

  const getCustomCellStyle = (cellValue) => {
    if (typeof cellValue === "number") {
      if (customEffectMinValue && customEffectMaxValue) {
        return cellValue >= customEffectMinValue &&
          cellValue <= customEffectMaxValue
          ? customEffectColorValue
          : "";
      } else if (customEffectMinValue && customEffectMaxValue == undefined) {
        return cellValue <= customEffectMinValue ? customEffectColorValue : "";
      } else if (!customEffectMinValue && customEffectMaxValue) {
        return cellValue <= customEffectMaxValue ? "" : customEffectColorValue;
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

  const getAchievementCellStyle = (cellValue) => {
    if (typeof cellValue === "number") {
      const range = maxColumnValue - minColumnValue;
      const normalizedValue =
        range !== 0 ? (cellValue - minColumnValue) / range : 0;
      const percentage = normalizedValue * 100;

      if (percentage <= Number(achievementValue.veryBad)) {
        return achievementColor.veryBad;
      }
      if (percentage <= Number(achievementValue.bad)) {
        return achievementColor.bad;
      }
      if (percentage <= Number(achievementValue.good)) {
        return achievementColor.good;
      }
      if (percentage <= Number(achievementValue.great)) {
        return achievementColor.great;
      }
      if (percentage <= Number(achievementValue.excelent)) {
        return achievementColor.excelent;
      }
    }
    return "";
  };

  const getColorEvolutionCellStyle = (cellValue, rowValues) => {
    if (typeof cellValue !== "number" || !rowValues || rowValues.length === 0) {
      return "";
    }

    return getEvolutionColor(cellValue, rowValues);
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
            <div className="align-button">
              <GenerateChartButton disabled={true} onClick={onSaveClick} />
              <SaveButton onClick={onSaveClick} />
            </div>
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
                        <TableCell key={index}>
                          <TableSortLabel
                            active={orderBy === column}
                            direction={orderBy === column ? order : "asc"}
                            onClick={() => handleSort(column)}
                          >
                            {column}
                          </TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedRows().map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {dataHeader.map((column, columnIndex) => (
                          <React.Fragment key={columnIndex}>
                            <TableCell
                              style={{
                                background: isColorEvolution
                                  ? getColorEvolutionCellStyle(
                                      row[column],
                                      Object.values(row)
                                    )
                                  : isAchievement
                                  ? getAchievementCellStyle(row[column])
                                  : relevanceColor.length > 0
                                  ? getColorScale(
                                      row[column],
                                      minColumnValue,
                                      maxColumnValue,
                                      relevanceColor
                                    )
                                  : colorEffect && colorEffect === "customColor"
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

      {isOpenAchievementColorModal && (
        <AchievementColorModal
          isModalOpen={isOpenAchievementColorModal}
          onModalClose={() => setIsOpenAchievementColorModal(false)}
          onModalSaveClose={handleAchievementColorSave}
        />
      )}
    </>
  );
};

export default ViewAnalytics;
