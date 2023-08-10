"use client"
import Spline from "@splinetool/react-spline"
import Image from "next/image";
import { useState } from "react";
import ReactMarkdownComponent from "./components/markdown/ReactMarkdown";

export default function Home() {
  const [splineLoading, setSplineLoading] = useState(true);

  const codeIntroduction = `
~~~js

~~~
  `;

  return (
    <>
      <section className="w-full sm:w-max relative z-10 h-full flex flex-col text-sm sm:text-base lg:pl-44 lg:pt-24 gap-12 justify-center lg:justify-start px-6">
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-center w-max gap-2">
              <p className="bg-accent-primary h-2 w-2 rounded-full inline-block"></p>
              <h3>{"<Hello World/>"}</h3>
              <p className="animate-waving-hand text-lg">👋</p>
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
              <span className="text-[#98c379]">{'"https://github.com/example/url"'}</span>
            </p>
          </div>
      </section>
      <section>
        
        <div>
          {splineLoading && <p className="absolute right-28 lg:right-64 animate-pulse lg:top-72 top-96">Rendering spline...</p>}
          <Spline
          onLoad={() => {
            setSplineLoading(false)
          }}
          scene="https://prod.spline.design/lz89iZ289zK7zc8q/scene.splinecode"
          className="absolute z-0 lg:-top-64 -top-36 scale-[.6] hidden md:block w-max h-max lg:-right-56 cursor-grab active:cursor-grabbing" />
        </div>
      </section>
    </>
  );
}
