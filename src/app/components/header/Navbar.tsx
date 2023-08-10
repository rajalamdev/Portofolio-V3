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

  const active = "text-header-primary border-b-2 border-b-[#43D9AD]";

  return (
    <header>
      <nav className="border-b border-line flex w-full">
        <Link
          href="/"
          className="w-[21%] border-r border-line py-3 hover:opacity-80 button-hover pl-6"
        >
          <h4>raj-alam</h4>
        </Link>
        <ul className="flex w-[69%] items-center">
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
        <div className="flex-1 border-l border-line pr-6"></div>
      </nav>
    </header>
  );
};

export default Navbar;