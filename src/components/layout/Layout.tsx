import Footer from "../footer/Footer";
import Navbar from "../header/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="flex justify-center w-full h-screen p-0 lg:p-7">
        <section className="border w-full h-full rounded-lg bg-primary overflow-auto md:overflow-hidden relative border-line">
          <Navbar />
          <main className="w-full h-[86%]">{children}</main>
          <Footer />
        </section>
      </section>
    </>
  );
};

export default Layout;
