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
import FilterButton from "../../shared/button/filterButton";
import GenerateChartButton from "../../shared/button/generateChart";
import SaveButton from "../../shared/button/saveButton";
import {
  getColorScale,
  getEvolutionColor,
  getRelevanceColor,
} from "../../utils/colorUtil";
import { periodFiltered, isValidDateFormat } from "../../utils/dateUtil";
import { extractDataTable } from "../../utils/extractDataTable";
import AchievementColorModal from "./achievementColorModal";
import ContextMenu from "./contextMenu";
import CustomEffectColorModal from "./cutomColorEffectModal";
import HideColumnModal from "./hideColumnModal";
import { AchivementColor, AchivementValue } from "./interface";
import SelectPeriodModal from "./selectPeriodModal";
import "./style.css";

const ViewAnalytics = () => {
  type Order = "asc" | "desc";

  const [data, setData] = useState([]);
  const [dataHeader, setDataHeader] = useState([]);
  const [dataRows, setDataRows] = useState({});

  const [hideColumnsModal, setHideColumnsModal] = useState([]);
  const [hideColumns, setHideColumns] = useState([]);
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
  const [isOpenHideColumnModal, setIsOpenHideColumnModal] = useState(false);
  const [isOpenSelectPeriodModal, setIsOpenSelectPeriodModal] = useState(false);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState<Order>("asc");
  const [dateColumns, setDateColumns] = useState([]);

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
    setDataRows(dataToSend.obj);

    const minMaxValues = getMinMaxValues(dataToSend.itens, dataToSend.obj);
    setMinColumnValue(minMaxValues.min);
    setMaxColumnValue(minMaxValues.max);
    setLoading(false);
  }, []);

  useEffect(() => {
    const rows = sortedRows(dataRows, dataHeader);
    setData(rows);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataHeader, dataRows]);

  const onSaveClick = () => {};

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedRows = (localStorageRows, columns) => {
    const dataSource =
      columns.length > 0
        ? localStorageRows[columns[0]].map((_, rowIndex) => {
            const rowData = {};
            columns.forEach((column) => {
              rowData[column] = localStorageRows[column]
                ? localStorageRows[column][rowIndex]
                : null;
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
      case "hideColumn":
        setIsOpenHideColumnModal(true);
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
    const sortedDataSource = () => {
      setData(sortedRows(dataRows, dataHeader));
    };
    sortedDataSource();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, order]);

  useEffect(() => {
    // empty use effect
  }, [
    customEffectColorValue,
    customEffectMaxValue,
    customEffectMinValue,
    isAchievement,
    achievementColor,
    achievementValue,
    isColorEvolution,
    hideColumns,
    dataRows,
    dataHeader,
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

  const handleHideColumns = (hideColumns: string[]) => {
    const newColumns = dataHeader.filter((el) => !hideColumns.includes(el));
    setHideColumnsModal(hideColumns);
    setHideColumns(newColumns);
    setIsOpenHideColumnModal(false);
  };

  const handleSelectPeriod = () => {
    const columns: string[] = [];
    const dataTable = JSON.parse(sessionStorage.getItem("dataTable"));
    if (!dataTable || dataTable.length <= 0) return;

    const dataToSend = extractDataTable(dataTable);

    for (const column of dataToSend.itens) {
      const values = dataToSend.obj[column];
      if (values && values.length > 0 && values.every(isValidDateFormat)) {
        columns.push(column);
      }
    }
    setDateColumns(columns);
    setIsOpenSelectPeriodModal(true);
  };

  const handleSelectPeriodSave = (
    period: string,
    columnDate: string,
    maxDate?,
    minDate?
  ) => {
    const dataTable = JSON.parse(sessionStorage.getItem("dataTable"));
    if (!dataTable || dataTable.length <= 0) return;
    const dataToSend = extractDataTable(dataTable);

    let filteredRows = dataToSend.obj;
    const today = new Date();
    filteredRows = periodFiltered(
      period,
      today,
      columnDate,
      filteredRows,
      maxDate,
      minDate
    );

    setData(sortedRows(filteredRows, dataHeader));
    setIsOpenSelectPeriodModal(false);
  };

  const handleSelectPeriodModalClose = (isReset?: boolean) => {
    setIsOpenSelectPeriodModal(false);
    if (!isReset) return;
    const dataTable = JSON.parse(sessionStorage.getItem("dataTable"));
    if (!dataTable || dataTable.length <= 0) return;
    const dataToSend = extractDataTable(dataTable);
    const rows = sortedRows(dataToSend.obj, dataHeader);
    setData(rows);
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
              <FilterButton onClick={handleSelectPeriod} />
              <GenerateChartButton disabled={true} onClick={onSaveClick} />
              <SaveButton onClick={onSaveClick} />
            </div>
          </div>

          <ContextMenu selectMenuItem={handleSelectItem}>
            <div>
              <TableContainer component={Paper}>
                <Table size="small" className="custom-table">
                  <TableHead
                    style={{
                      background: "#ededed",
                    }}
                  >
                    <TableRow>
                      {(hideColumns.length > 0 ? hideColumns : dataHeader).map(
                        (column, index) => (
                          <TableCell key={index}>
                            <TableSortLabel
                              active={orderBy === column}
                              direction={orderBy === column ? order : "asc"}
                              onClick={() => handleSort(column)}
                            >
                              {column}
                            </TableSortLabel>
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {(hideColumns.length > 0
                          ? hideColumns
                          : dataHeader
                        ).map((column, columnIndex) => (
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

      {isOpenHideColumnModal && (
        <HideColumnModal
          columns={dataHeader}
          hideColumns={hideColumnsModal}
          isModalOpen={isOpenHideColumnModal}
          onModalClose={() => setIsOpenHideColumnModal(false)}
          onModalSaveClose={handleHideColumns}
        />
      )}

      {isOpenSelectPeriodModal && (
        <SelectPeriodModal
          dateColumns={dateColumns}
          isModalOpen={isOpenSelectPeriodModal}
          onModalClose={handleSelectPeriodModalClose}
          onSaveClick={handleSelectPeriodSave}
        />
      )}
    </>
  );
};

export default ViewAnalytics;
