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
    <header>
      <nav className="border-b border-line flex w-full relative z-10 bg-bg-primary">
        <Link
          href="/"
          className="max-w-[275px] w-full flex-grow-0 flex-shrink-0 border-r border-line py-3 hover:opacity-80 button-hover pl-6"
        >
          <h4>raj-alam</h4>
        </Link>
        <ul className="flex flex-1 items-center">
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
                } px-6 border-r border-line py-3 text-center button-hover`}
              >
                {nav.text}
              </Link>
            );
          })}
        </ul>
        <div className="max-w-[150px] w-full border-l border-line pr-6">ukjygkjp</div>
      </nav>
    </header>
  );
};

export default Navbar;
