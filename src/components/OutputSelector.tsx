import React from "react";
import { useStore } from "../lib/store";

type Props = {};

const OutputSelector = (props: Props) => {
  const outputFile = useStore((state) => state.outputFile);
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
      className="rounded-lg shadow-md shadow-slate-400/50 border border-slate-300/50 p-10 w-full space-y-4"
    >
      <p className="text-lg text-slate-800 font-medium">
        Select the fields you would like to export below:
      </p>
      <ul className="w-full h-48 overflow-y-scroll">
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
      </ul>

      <button
        type="submit"
        className="py-2 w-full h-10 uppercase bg-lime-700 hover:bg-lime-800 transition-colors rounded-md text-white font-medium text-sm relative"
      >
        Export
      </button>
    </form>
  );
};

export default OutputSelector;
