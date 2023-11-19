import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  getMonth,
  isWithinInterval,
  parse,
  setMonth,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

export const isValidDateFormat = (dateString) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(dateString);
};

export const periodDictionary: { [key: string]: string } = {
  today: "Dia Atual",
  currentWeek: "Semana Atual",
  currentMonth: "Mês Atual",
  currentTrimester: "Trimestre Atual",
  currentSemester: "Semestre Atual",
  currentYear: "Ano Atual",
};

export function periodFiltered(
  period: string,
  dateToFilter: Date,
  columnDate: string,
  dataRows,
  maxDate?,
  minDate?
) {
  const currentDate = format(dateToFilter, "dd/MM/yyyy");
  const startOfWeek1 = startOfWeek(dateToFilter, { weekStartsOn: 1 });
  const endOfWeek1 = endOfWeek(dateToFilter, { weekStartsOn: 1 });
  const firstDayOfMonth = startOfMonth(dateToFilter);
  const lastDayOfMonth = endOfMonth(dateToFilter);

  const filteredRows = dataRows;

  const currentMonth = getMonth(dateToFilter);
  const currentTrimester = Math.floor(currentMonth / 3); // Obtém o trimestre atual (0, 1, ou 2)

  const firstDayOfTrimester = startOfMonth(
    setMonth(dateToFilter, currentTrimester * 3)
  );
  const lastDayOfTrimester = endOfMonth(
    setMonth(dateToFilter, currentTrimester * 3 + 2)
  );

  const currentSemester = Math.floor(currentMonth / 6); // Obtém o semestre atual (0 ou 1)
  const firstDayOfSemester = startOfMonth(
    setMonth(dateToFilter, currentSemester * 6)
  );
  const lastDayOfSemester = endOfMonth(
    setMonth(dateToFilter, currentSemester * 6 + 5)
  );

  const firstDayOfYear = startOfYear(dateToFilter);
  const lastDayOfYear = endOfYear(dateToFilter);

  switch (period) {
    case "today":
      dateToFilter.setHours(0, 0, 0, 0);
      Object.keys(filteredRows).forEach((column) => {
        if (column === columnDate) {
          // Se a coluna for a coluna de datas
          filteredRows[column] = filteredRows[column].filter((rowDate) => {
            return rowDate === currentDate;
          });
        } else {
          // Para outras colunas, manter os valores correspondentes ao filtro de datas
          const indexesToRemove: number[] = [];
          filteredRows[column].forEach((_rowDate, index) => {
            if (filteredRows[columnDate][index] !== currentDate) {
              indexesToRemove.push(index);
            }
          });
          indexesToRemove.reverse().forEach((indexToRemove) => {
            filteredRows[column].splice(indexToRemove, 1);
          });
        }
      });
      break;

    case "currentWeek":
      Object.keys(filteredRows).forEach((column) => {
        if (column === columnDate) {
          filteredRows[column] = filteredRows[column].filter((rowDate) => {
            const date = parse(rowDate, "dd/MM/yyyy", new Date());
            return isWithinInterval(date, {
              start: startOfWeek1,
              end: endOfWeek1,
            });
          });
        } else {
          filteredRows[column] = filteredRows[column].filter((_, index) => {
            const date = parse(
              filteredRows[columnDate][index],
              "dd/MM/yyyy",
              new Date()
            );
            return isWithinInterval(date, {
              start: startOfWeek1,
              end: endOfWeek1,
            });
          });
        }
      });
      break;

    case "currentMonth":
      Object.keys(filteredRows).forEach((column) => {
        if (column === columnDate) {
          filteredRows[column] = filteredRows[column].filter((rowDate) => {
            const date = parse(rowDate, "dd/MM/yyyy", new Date());
            return isWithinInterval(date, {
              start: firstDayOfMonth,
              end: lastDayOfMonth,
            });
          });
        } else {
          filteredRows[column] = filteredRows[column].filter((_, index) => {
            const date = parse(
              filteredRows[columnDate][index],
              "dd/MM/yyyy",
              new Date()
            );
            return isWithinInterval(date, {
              start: firstDayOfMonth,
              end: lastDayOfMonth,
            });
          });
        }
      });
      break;

    case "currentTrimester":
      Object.keys(filteredRows).forEach((column) => {
        if (column === columnDate) {
          filteredRows[column] = filteredRows[column].filter((rowDate) => {
            const date = parse(rowDate, "dd/MM/yyyy", new Date());
            return isWithinInterval(date, {
              start: firstDayOfTrimester,
              end: lastDayOfTrimester,
            });
          });
        } else {
          filteredRows[column] = filteredRows[column].filter((_, index) => {
            const date = parse(
              filteredRows[columnDate][index],
              "dd/MM/yyyy",
              new Date()
            );
            return isWithinInterval(date, {
              start: firstDayOfTrimester,
              end: lastDayOfTrimester,
            });
          });
        }
      });
      break;

    case "currentSemester":
      Object.keys(filteredRows).forEach((column) => {
        if (column === columnDate) {
          filteredRows[column] = filteredRows[column].filter((rowDate) => {
            const date = parse(rowDate, "dd/MM/yyyy", new Date());
            return isWithinInterval(date, {
              start: firstDayOfSemester,
              end: lastDayOfSemester,
            });
          });
        } else {
          filteredRows[column] = filteredRows[column].filter((_, index) => {
            const date = parse(
              filteredRows[columnDate][index],
              "dd/MM/yyyy",
              new Date()
            );
            return isWithinInterval(date, {
              start: firstDayOfSemester,
              end: lastDayOfSemester,
            });
          });
        }
      });
      break;

    case "currentYear":
      Object.keys(filteredRows).forEach((column) => {
        if (column === columnDate) {
          filteredRows[column] = filteredRows[column].filter((rowDate) => {
            const date = parse(rowDate, "dd/MM/yyyy", new Date());
            return isWithinInterval(date, {
              start: firstDayOfYear,
              end: lastDayOfYear,
            });
          });
        } else {
          filteredRows[column] = filteredRows[column].filter((_, index) => {
            const date = parse(
              filteredRows[columnDate][index],
              "dd/MM/yyyy",
              new Date()
            );
            return isWithinInterval(date, {
              start: firstDayOfYear,
              end: lastDayOfYear,
            });
          });
        }
      });
      break;

    default:
      if (maxDate && minDate) {
        Object.keys(filteredRows).forEach((column) => {
          filteredRows[column] = filteredRows[column].filter(
            (_rowDate, index) => {
              const date = parse(
                filteredRows[columnDate][index],
                "dd/MM/yyyy",
                new Date()
              );
              const minDateFormat = parse(minDate, "dd/MM/yyyy", new Date());
              const maxDateFormat = parse(maxDate, "dd/MM/yyyy", new Date());

              return date >= minDateFormat && date <= maxDateFormat;
            }
          );
        });
      }
      break;
  }
  return filteredRows;
}
