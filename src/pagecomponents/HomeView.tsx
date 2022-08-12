import AuthBar from "./AuthBar";
import AppFeatureCard from "./AppFeatureCard";
import HomeLogo from "./HomeLogo";

import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import ShowMessage from "./ShowMessage";
import { useEffect, useState } from "react";
import { Image, Text } from "@nextui-org/react";

import styles from "../styles/components.module.css";

const DynamicClock = dynamic(() => import("./Clock"), {
  ssr: false,
});

const HomeView = () => {
  const { statusCode, msg } = useAppSelector((state: RootState) => state.auth);

  return (
    <div>
      <HomeLogo />
      {statusCode !== 200 && (
        <ShowMessage message={"Success"} statusCode={statusCode || 200} />
      )}
      <AuthBar />
      <AppFeatureCard />
      <br />
      <div style={{width:"100%"}}  className={styles.appFeature}>
        <a href="https://drive.google.com/file/d/1udGUltb_8riW6CaVM5Sh1WzIb1w6R4mb/view?usp=sharing">
          Download Native Android App
          <Image
            src="https://play-lh.googleusercontent.com/kT8jpYbAgu23qw1vHHNQ05aDmBkAxOcH4mDLRaUWu6xUqfZp9z3agi2bd_1eML2uRwQ"
            alt="source code"
            height={"50px"}
            width={"50px"}
            style={{ borderRadius: 7 }}
          />
        </a>
      </div>
      <hr style={{color:"white"}} />
      <DynamicClock />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
          alignItems: "center",
        }}
      >
        <a href="https://github.com/seen2/next-ts-todo">
          Find Source Code at:{" "}
          <Text size={"xl"} color="success">
            {"<Code></Code>"}
          </Text>
          <Image
            src="https://img.icons8.com/ios-glyphs/452/github.png"
            alt="source code"
            height={"50px"}
            width={"50px"}
          />
        </a>
      </div>
    </div>
  );
};

//https://drive.google.com/file/d/1udGUltb_8riW6CaVM5Sh1WzIb1w6R4mb/view?usp=sharing

export default HomeView;
