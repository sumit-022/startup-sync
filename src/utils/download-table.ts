const convertToCSV = (objArray: any) => {
  const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let str = "";
  const cols = Object.keys(array[0]).toSorted();

  str += cols.join(",") + "\r\n";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in cols) {
      if (line != "") line += ",";

      line += array[i][cols[index]];
    }

    str += line + "\r\n";
  }

  return str;
};

const downloadTable = async (data: any) => {
  const csvdata = convertToCSV(data);
  const blob = new Blob([csvdata], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "joborder.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default downloadTable;
