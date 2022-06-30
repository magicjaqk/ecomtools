/* eslint-disable react/no-unescaped-entities */
import { useSpring, a } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Help = (props: Props) => {
  const pageTransition = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <a.div
      style={pageTransition}
      className="w-full min-h-screen relative flex flex-col items-center p-4 pb-20"
    >
      {/* Back button */}
      <Link href="/">
        <a className="md:fixed absolute md:top-10 md:left-10 top-4 left-3 flex items-center justify-center space-x-2 text-xl uppercase scale-75">
          <svg
            className="aspect-square w-5 mt-0.5"
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
          <span>Back</span>
        </a>
      </Link>

      <h1 className="text-3xl md:text-5xl font-bold mt-12 md:mt-20">
        Getting the right file
      </h1>
      <div className="rounded-lg shadow-md shadow-slate-400/50 border border-slate-300/50 p-10 flex flex-col items-center justify-center space-y-6 w-full max-w-xl mt-5 md:mt-10">
        <div className="w-full space-y-2">
          <h3 className="text-lg font-medium w-full">
            1. Navigate to your Webship History
          </h3>
          <div className="w-full h-52 rounded-md shadow relative overflow-hidden">
            <Image
              src="/history-track.png"
              alt="Navigate to the history tab in Webship."
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="w-full text-slate-600">
            To export your CSV, first navigate to the "History/Track" tab on the
            left-side panel in your Webship profile.
          </p>
        </div>

        <div className="w-full space-y-2">
          <h3 className="text-lg font-medium w-full">
            2. Click "Filter/Export"
          </h3>
          <div className="w-full h-52 rounded-md shadow relative overflow-hidden">
            <Image
              src="/filter-export.png"
              alt="Click the filter/export button."
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="w-full text-slate-600">
            Then, open the Export dialog by clicking the "Filter/Export" button
            at the top left of the History page you navigated to in step 1.
          </p>
        </div>

        <div className="w-full space-y-2">
          <h3 className="text-lg font-medium w-full">
            3. Choose which shipments to export
          </h3>
          <div className="w-full h-[640px] rounded-md shadow relative overflow-hidden">
            <Image
              src="/include-csv-export.png"
              alt="Select the date range and other attributes of shipments you want to export."
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="w-full text-slate-600">
            Finally, select the "Date Range," "Shipment Status," and "Carrier"
            of the shipments you want to export. Then, check the box next to
            "Include items in CSV export" and click "Export CSV."
          </p>
        </div>

        <p className="text-slate-900 text-lg w-full text-center bg-orange-100 rounded p-4 font-semibold">
          You did it! <span className="text-xl">🎉</span>
        </p>

        <Link href="/">
          <a className="flex items-center justify-start w-full space-x-2 text-slate-600">
            <svg
              className="aspect-square w-5 mt-0.5"
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
            <span>Go Back</span>
          </a>
        </Link>
      </div>
    </a.div>
  );
};

export default Help;
