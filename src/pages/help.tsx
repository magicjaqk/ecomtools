import { useSpring, a } from "@react-spring/web";
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
    <a.div style={pageTransition}>
      Here are some instructions if you need some help.
    </a.div>
  );
};

export default Help;
