import Footer from "../footer/Footer";
import Navbar from "../header/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="flex justify-center w-full h-screen p-0 lg:p-7 overflow-hidden">
        <section className="border w-full h-full rounded-lg bg-bg-primary relative border-line overflow-hidden flex flex-col">
          <Navbar />
          <main className="overflow-x-hidden overflow-y-auto w-full h-[85%]">{children}</main>
          <Footer />
        </section>
      </section>
    </>
  );
};

export default Layout;
