"use client"
import useAudio from "../hooks/useAudio";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Mini3dGame from "./components/mini3dGame/Mini3dGame";
import { useAppContext } from "@/context/AppContext";
// import Vercel from "../../public/vercel.svg"

export default function Home() {
  const audio = useAudio('/music/background.mp3', { volume: 1, playbackRate: 1 })

  const context = useAppContext();

  return (
    <>
      <section className="w-full sm:w-max relative z-10 h-full flex flex-col text-sm sm:text-base lg:pl-32 lg:pt-24 gap-12 justify-center lg:justify-start px-6">
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-center w-max gap-2">
              <p className="bg-accent-primary h-2 w-2 rounded-full inline-block"></p>
              <h3>{"<Hello World/>"}</h3>
              <p className="animate-waving-hand text-lg">👋</p>
              {/* <button onClick={() => audio?.play()}>sdfsdf</button> */}
            </div>
            <h1 className="[word-spacing:-7px] text-header-primary font-semibold text-4xl">I am Raj Alam</h1>
            <h2>{"> Fullstack JavaScript Developer"}</h2>
          </div>
          <div className="w-full space-y-1">
            <div className="sm:hidden space-y-1">
              <p className="italic">// Based in South Tangerang,</p>
              <p className="italic">// Indonesia 🇮🇩</p>
            </div>
            <p className="italic hidden sm:block">// Based in South Tangerang, Indonesia 🇮🇩</p>
            <p>
              <span className="text-[#c678dd]">const </span>
              <span className="text-header-primary">curriculumVitae </span>
              <span className="text-[#61afef]">= </span>
              <a href="/" className="cursor-link"><span className="text-[#98c379]">{'"https://github.com/example/url"'}</span></a>
            </p>
          </div>
      </section>
      <section>
        {/* <Vercel className="fill-slate-200 text-red-500 w-8 h-8" /> */}
        {/* <Mini3dGame /> */}
      </section>
    </>
  );
}
