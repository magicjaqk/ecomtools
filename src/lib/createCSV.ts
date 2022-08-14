import Papa from "papaparse";

function orderPrioritizedFields(fields: string[]) {
  const arrayPrioritizedOrder = [
    // Column A
    "trackingNumber",
    // Column B
    "orderGroup",
    // Column C
    "poNumber",
    // Column D
    "toName",
    // Column E
    "toStreet1",
    // Column F
    "toCompany",
    // Column G
    "toZip",
    // Column H
    "toCity",
    // Column I
    "toState",
    // Column J
    "shipperReference",
    // Column K
    "contentDescription",
  ];
  let orderedArray: string[] = [];

  // Append prioritized fields first in the ordered array
  for (let i = 0; i < arrayPrioritizedOrder.length; i++) {
    const field = arrayPrioritizedOrder[i] as string;
    if (fields.includes(field)) {
      orderedArray.push(field);
    }
  }

  // Append the rest of the fields that aren't prioritized
  orderedArray = [
    ...orderedArray,
    ...fields.filter((value) => !arrayPrioritizedOrder.includes(value)),
  ];

  return orderedArray;
}

export default function createCSV(
  fields: string[],
  outputFile: any[],
  currentFileName: string
) {
  const orderedFields = orderPrioritizedFields(fields);

  const newJSON: any[] = outputFile!.map((item) => {
    let newObj: any = {};
    for (let i = 0; i < orderedFields.length; i++) {
      const field = orderedFields[i];
      if (field === undefined) return;

      // Swap this line for the following line to format tracking numbers as strings in excel.
      // newObj[field] = field === "trackingNumber" ? `="${item[field]}"` : item[field];
      newObj[field] = item[field];
    }

    return newObj;
  });
  // console.log(newJSON);

  const newCSV = Papa.unparse(newJSON.slice(0, -1), {
    header: false,
  });

  // Create blob for data download
  const blob = new Blob([newCSV], { type: "text/csv" });

  const anchor = document.createElement("a");
  anchor.download = `formatted_${currentFileName.slice(0, -4)}.csv`;
  anchor.href = window.URL.createObjectURL(blob);
  anchor.click();
}
