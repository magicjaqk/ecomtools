import React from "react";
import { useStore } from "../lib/store";

type Props = {};

const OutputSelector = (props: Props) => {
  const outputFile = useStore((state) => state.outputFile);

  return (
    <form className="rounded-lg shadow-md shadow-slate-400/50 border border-slate-300/50 p-10 w-full">
      <ul className="w-full h-48 overflow-y-scroll">
        {Object.keys(outputFile![0]).map((item, id) => (
          <li key={id} className="flex items-center space-x-2">
            <input type="checkbox" name={item} value={item} />
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default OutputSelector;
