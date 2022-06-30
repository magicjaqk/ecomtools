import { useTransition, a, useSpring, config } from "@react-spring/web";
import Link from "next/link";
import React from "react";
import { useStore } from "../lib/store";

type Props = {};

const UploadBox = (props: Props) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null!);

  const [file, setFile] = useStore((state) => [
    state.currentFile,
    state.setCurrentFile,
  ]);
  const parseFile = useStore((state) => state.parseFile);
  const outputFile = useStore((state) => state.outputFile);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = async () => {
    parseFile();

    console.log(outputFile);
  };

  const mountSpring = useSpring({
    from: {
      scale: 0,
      opacity: 0,
    },
    to: {
      scale: 1,
      opacity: 1,
    },
    delay: 400,
    config: config.default,
  });

  const errorSpring = useSpring({
    from: {
      height: "0rem",
    },
    to: {
      height: error ? "1.2rem" : "0rem",
    },
  });

  const buttonTransition = useTransition(file, {
    from: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0,
      opacity: 0,
    },
    config: config.default,
  });

  return (
    <a.form
      style={mountSpring}
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(!loading);

        if (file) {
          handleSubmit();
        } else {
          setError(true);
          setTimeout(() => setError(false), 5000);
        }
      }}
      className="rounded-lg shadow-md shadow-slate-400/50 border border-slate-300/50 p-10 flex flex-col items-center justify-center space-y-6"
    >
      <p className="text-slate-600">
        Upload the file in CSV format that you would like to be formatted.
      </p>

      <div className="w-full relative flex items-center">
        <input
          ref={fileInputRef}
          type="file"
          className="file:mr-10 file:ml-5 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-lime-100 file:text-lime-700
        hover:file:bg-lime-200 text-slate-400 font-light text-sm file:transition-all"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            } else {
              setFile(undefined);
              e.currentTarget.value = "";
            }
          }}
        />

        {buttonTransition(
          (style, file) =>
            file && (
              <a.button
                className="right-4 absolute"
                style={style}
                onClick={() => {
                  fileInputRef.current.value = "";
                  setFile(undefined);
                }}
              >
                <svg
                  className="aspect-square w-5 text-orange-600"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                  />
                  <path
                    fill="currentColor"
                    fillOpacity=".15"
                    d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372s372-166.6 372-372s-166.6-372-372-372zm171.8 527.1c1.2 1.5 1.9 3.3 1.9 5.2c0 4.5-3.6 8-8 8l-66-.3l-99.3-118.4l-99.3 118.5l-66.1.3c-4.4 0-8-3.6-8-8c0-1.9.7-3.7 1.9-5.2L471 512.3l-130.1-155a8.32 8.32 0 0 1-1.9-5.2c0-4.5 3.6-8 8-8l66.1.3l99.3 118.4l99.4-118.5l66-.3c4.4 0 8 3.6 8 8c0 1.9-.6 3.8-1.8 5.2l-130.1 155l129.9 154.9z"
                  />
                  <path
                    fill="currentColor"
                    d="M685.8 352c0-4.4-3.6-8-8-8l-66 .3l-99.4 118.5l-99.3-118.4l-66.1-.3c-4.4 0-8 3.5-8 8c0 1.9.7 3.7 1.9 5.2l130.1 155l-130.1 154.9a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3l99.3-118.5L611.7 680l66 .3c4.4 0 8-3.5 8-8c0-1.9-.7-3.7-1.9-5.2L553.9 512.2l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
                  />
                </svg>
              </a.button>
            )
        )}
      </div>

      <div className="w-full space-y-1">
        <button
          type="submit"
          className="py-2 w-full h-10 uppercase bg-lime-700 hover:bg-lime-800 transition-colors rounded-md text-white font-medium text-sm relative"
        >
          <p>Submit</p>
        </button>
        <a.div
          style={errorSpring}
          className="text-red-600 uppercase text-xs font-medium relative overflow-hidden"
        >
          <p className="absolute">Please select a file.</p>
        </a.div>
      </div>

      <div className="flex items-center w-full text-slate-400 justify-center text-xs font-medium">
        <Link href="help">
          <a className="hover:text-slate-500 transition-colors underline">
            Need help?
          </a>
        </Link>
      </div>
    </a.form>
  );
};

export default UploadBox;
