export function extractDataTable(dataTable: any): {
  obj: object;
  itens: string[];
} {
  const variables = Object.keys(dataTable[0]);

  const dataToSend = { obj: {}, itens: variables };

  variables.map((variable) => {
    dataTable.map((item) => {
      if (dataToSend.obj[`${variable}`] === undefined) {
        dataToSend.obj[`${variable}`] = [];
      }

      dataToSend.obj[`${variable}`].push(item[variable]);
    });
  });
  return dataToSend;
}
