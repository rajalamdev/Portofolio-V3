import Image from "next/image";

export default async function Home() {

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
          {/* <Markdown content={markdownSource} className={"line-numbers disable-highlight"}></Markdown> */}
        </div>
      </section>
    </main>
  );
}
