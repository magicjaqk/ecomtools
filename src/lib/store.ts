import create from "zustand";
import Papa from "papaparse";

type storeType = {
  currentFile: File | undefined;
  setCurrentFile: (newFile: File | undefined) => void;
  outputFile: any[] | undefined;
  resetOutputFile: () => void;
  parseFile: () => void;
  createCSV: (fields: string[]) => void;
};

export const useStore = create<storeType>()((set, get) => ({
  currentFile: undefined,
  setCurrentFile: (newFile: File | undefined) => set({ currentFile: newFile }),
  outputFile: undefined,
  resetOutputFile: () => set({ outputFile: undefined, currentFile: undefined }),
  parseFile: async () => {
    const inputFile = get().currentFile;

    if (inputFile) {
      Papa.parse(inputFile, {
        header: true,
        complete: (results) => {
          // console.log("Parsed File: ", results.data);
          set({ outputFile: results.data });
        },
      });
    }
  },
  createCSV: (fields: string[]) => {
    if (get().outputFile === undefined) return;

    const newJSON: any[] = get().outputFile!.map((item) => {
      let newObj: any = {};
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field === undefined) return;

        newObj[field] =
          field === "trackingNumber" ? `="${item[field]}"` : item[field];
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
    anchor.download = `formatted_${get().currentFile!.name.slice(0, -4)}.csv`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();

    set({ outputFile: undefined, currentFile: undefined });
  },
}));
