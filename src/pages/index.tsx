import { useSpring, a, useTransition } from "@react-spring/web";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
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
        className="flex flex-col items-center justify-center min-h-screen mx-auto py-10 px-4 space-y-5 md:space-y-8 relative"
      >
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-20 mb-3 -mr-1 -z-10">
            <Image
              src="/EcomParcelLogo.png"
              alt="EcomParcel"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className="font-light text-6xl md:text-6xl text-center text-gray-800/85">
            Tools
          </h1>
        </div>
        <div className="relative h-72">
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
        </div>
      </a.div>
    </>
  );
};

export default Home;
