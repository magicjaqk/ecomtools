import Papa from "papaparse";

export default function createCSV(
  fields: string[],
  outputFile: any[],
  currentFileName: string
) {
  const newJSON: any[] = outputFile!.map((item) => {
    let newObj: any = {};
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field === undefined) return;

      // Swap this line for the following line to format tracking numbers as strings in excel.
      // newObj[field] = field === "trackingNumber" ? `="${item[field]}"` : item[field];
      newObj[field] = item[field];
    }
    return newObj;
  });
  // console.log(newJSON);

  const newCSV = Papa.unparse(newJSON.slice(0, -1), {
    header: true,
  });

  // Create blob for data download
  const blob = new Blob([newCSV], { type: "text/csv" });

  const anchor = document.createElement("a");
  anchor.download = `formatted_${currentFileName.slice(0, -4)}.csv`;
  anchor.href = window.URL.createObjectURL(blob);
  anchor.click();
}
