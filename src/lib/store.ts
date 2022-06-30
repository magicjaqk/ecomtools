import create from "zustand";
import Papa from "papaparse";

type storeType = {
  currentFile: File | undefined;
  setCurrentFile: (newFile: File | undefined) => void;
  outputFile: any[] | undefined;
  parseFile: () => void;
};

export const useStore = create<storeType>()((set, get) => ({
  currentFile: undefined,
  setCurrentFile: (newFile: File | undefined) => set({ currentFile: newFile }),
  outputFile: undefined,
  parseFile: async () => {
    const inputFile = get().currentFile;

    if (inputFile) {
      Papa.parse(inputFile, {
        header: true,
        complete: (results) => {
          console.log("Parsed File: ", results.data);
          set({ outputFile: results.data });
        },
      });
    }
  },
}));
