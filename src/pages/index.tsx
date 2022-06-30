import { useSpring, a, useTransition } from "@react-spring/web";
import type { NextPage } from "next";
import Head from "next/head";
import OutputSelector from "../components/OutputSelector";
import UploadBox from "../components/UploadBox";
import { useStore } from "../lib/store";

const Home: NextPage = () => {
  const [outputFileDefined] = useStore((state) => [
    state.outputFile !== undefined,
  ]);

  const pageTransition = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    delay: 400,
  });

  const componentTransition = useTransition(outputFileDefined, {
    initial: {
      x: 0,
      opacity: 1,
    },
    from: {
      x: 50,
      opacity: 0,
    },
    enter: {
      x: 0,
      opacity: 1,
    },
    leave: {
      x: -50,
      opacity: 0,
      position: "absolute",
    },
  });

  return (
    <>
      <Head>
        <title>EcomTools</title>
        <meta name="description" content="A web tool created for EcomParcel" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <a.div
        style={pageTransition}
        className="flex flex-col items-center justify-center min-h-screen mx-auto py-10 px-4 space-y-10 relative"
      >
        <h1 className="font-bold text-4xl md:text-6xl text-center">
          EcomTools
        </h1>
        {componentTransition((style, state) =>
          !state ? (
            <a.div style={style} className={"max-w-md"}>
              <UploadBox />
            </a.div>
          ) : (
            <a.div style={style} className="max-w-lg">
              <OutputSelector />
            </a.div>
          )
        )}
      </a.div>
    </>
  );
};

export default Home;
