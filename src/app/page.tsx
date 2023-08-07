import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center w-full min-h-screen p-8 overflow-hidden">
      <section className="border w-full rounded-lg bg-bg-primary relative border-line">
        <Image
          src={"/blob-blur-primary.png"}
          width={700}
          height={700}
          alt="Blob Blur Background"
          className="absolute right-0"
        />
      </section>
    </main>
  );
}
