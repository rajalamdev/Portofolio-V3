"use client"
import Markdown from "@/components/markdown/Markdown";
import Image from "next/image";

export default function Home() {
  const markdownSource = `
# header

* list
* items

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ 'remark-gfm' |

~~~tsx:index.html
function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {
  const value: T = parseModel(chunk._response, chunk._value);
  const initializedChunk: InitializedChunk<T> = (chunk: any);
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}
~~~
`;
  return (
    <main className="flex justify-center w-full min-h-screen p-8 overflow-hidden">
      <section className="border w-full rounded-lg bg-bg-primary relative border-line">
        <Image
          src={"/blob-blur-primary.png"}
          width={700}
          height={700}
          alt="Blob Blur Background"
          className="absolute right-0 z-0"
        />
        <div className="relative z-10">
          <Markdown content={markdownSource}></Markdown>
        </div>
      </section>
    </main>
  );
}
