import React from "react";
import { a, useSpring, useTransition } from "@react-spring/web";
import useMeasure from "react-use-measure";

type Props = {};

const Loading = (props: Props) => {
  const [ref, { width }] = useMeasure();

  const style = useSpring({
    from: {
      width: 5,
    },
    to: [{ width: width }, { width: 5 }],
    config: { mass: 4, tension: 500, friction: 100 },
    loop: true,
  });

  return (
    <div ref={ref} className="w-full h-80 flex flex-col relative">
      <svg
        className="aspect-square w-40 animate-spin text-lime-700"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M12 21a9 9 0 1 1 6.18-15.55a.75.75 0 0 1 0 1.06a.74.74 0 0 1-1.06 0A7.51 7.51 0 1 0 19.5 12a.75.75 0 0 1 1.5 0a9 9 0 0 1-9 9Z"
        />
      </svg>
    </div>
  );
};
export default Loading;
