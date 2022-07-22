import create from "zustand";
import createCSV from "./createCSV";
import parseCSV from "./parseCSV";

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
      parseCSV(inputFile);
    }
  },
  createCSV: (fields: string[]) => {
    const outputFile = get().outputFile;
    const currentFile = get().currentFile;
    if (outputFile === undefined || currentFile === undefined) return;

    createCSV(fields, outputFile, currentFile.name);

    set({ outputFile: undefined, currentFile: undefined });
  },
}));
