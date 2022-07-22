import Papa from "papaparse";
import { useStore } from "./store";

export default function parseCSV(inputFile: File) {
  Papa.parse(inputFile, {
    header: true,
    complete: (results) => {
      // console.log("Parsed File: ", results.data);
      useStore.setState({ outputFile: results.data });
    },
  });
}
