"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { text: "_hello", href: "/" },
    { text: "_about-me", href: "/about" },
    { text: "_projects", href: "/projects" },
    { text: "_blog", href: "/blog" },
    { text: "_contact-me", href: "/contact" },
  ];

  const active = "text-header-primary border-b-2 border-b-accent-primary";

  return (
    <header className="h-[7%]">
      <nav className="border-b h-full border-line flex w-full items-center relative z-10 bg-bg-primary">
        <Link
          href="/"
          className="max-w-[275px] flex items-center w-full h-full flex-grow-0 flex-shrink-0 border-r border-line hover:opacity-80 button-hover pl-6"
        >
          <h4>raj-alam</h4>
        </Link>
        <ul className="flex flex-1 h-full">
          {navLinks.map((nav) => {
            return (
              <Link
                key={nav.href}
                href={nav.href}
                className={`${nav.href === pathname ? active : ""} 
                ${
                  pathname.includes("/blog") && nav.href === "/blog"
                    ? active
                    : ""
                } px-6 border-r h-full border-line text-center button-hover flex items-center`}
              >
                {nav.text}
              </Link>
            );
          })}
        </ul>
        <div className="max-w-[150px] h-full w-full border-l border-line pr-6 flex items-center">ukjygkjp</div>
      </nav>
    </header>
  );
};

export default Navbar;
