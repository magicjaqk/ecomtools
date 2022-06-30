import React from "react";
import { useStore } from "../lib/store";

type Props = {};

const OutputSelector = (props: Props) => {
  const [outputFile, resetOutputFile] = useStore((state) => [
    state.outputFile,
    state.resetOutputFile,
  ]);
  const createCSV = useStore((state) => state.createCSV);

  const DEFAULT_FIELDS = [
    "trackingNumber",
    "orderGroup",
    "poNumber",
    "toName",
    "toStreet1",
    "toCompany",
    "toZip",
    "toCity",
    "toState",
    "shipperReference",
    "contentDescription",
  ];
  const [listState, setListState] = React.useState(
    outputFile !== undefined
      ? Object.keys(outputFile[0]).map((item) => ({
          field: item,
          checked: DEFAULT_FIELDS.includes(item),
        }))
      : []
  );

  const handleSubmit = () => {
    const exportFields = listState
      .filter((item) => item.checked)
      .map((item) => item.field);

    createCSV(exportFields);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="rounded-lg shadow-md shadow-slate-400/50 border border-slate-300/50 p-10 w-full space-y-4 relative w-full"
    >
      <p className="text-lg text-slate-800 font-medium">
        Select the fields you would like to export below:
      </p>
      <ul className="w-full h-48 overflow-y-scroll scroll relative">
        {listState.map((item, id) => {
          return (
            <li key={id} className="flex items-center space-x-2">
              <input
                onChange={() => {
                  let temp = listState.slice();

                  temp[id]!.checked = !temp[id]!.checked;

                  setListState(temp);
                }}
                type="checkbox"
                checked={item.checked}
                name={item.field}
                value={item.field}
                className="aspect-square w-4"
              />
              <label htmlFor={item.field}>{item.field}</label>
            </li>
          );
        })}

        <div className="bg-gradient-to-t from-white via-white/10 sticky bottom-0 h-20 -mt-10 w-full" />
      </ul>

      <button
        type="submit"
        className="py-2 w-full h-10 uppercase bg-lime-700 hover:bg-lime-800 transition-colors rounded-md text-white font-medium text-sm relative"
      >
        Export
      </button>

      <button
        type="button"
        onClick={() => resetOutputFile()}
        className="flex items-center text-slate-500"
      >
        <svg
          className="h-3 w-3 mr-1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m11 5l-7 7l7 7m-7-7h16"
          />
        </svg>

        <span className="uppercase text-xs">Chose the wrong file?</span>
      </button>
    </form>
  );
};

export default OutputSelector;
