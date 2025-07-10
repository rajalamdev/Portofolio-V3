"use client";

import DynamicSvgIcon from "../svg/DynamicSvgIcon";

const Footer = () => {
  const findMeInLinks = [
    {
      name: "linkedin",
      href: "https://linkedin.com/in/rajalamdev",
    },
    {
      name: "instagram",
      href: "https://instagram.com/rajalamdev",
    },
    {
      name: "spotify",
      href: "https://open.spotify.com/user/282hoo67ycjs0zlqef1asq74h?si=4865dce312d1481f",
    },
  ];

  return (
    <footer className="border-t border-line h-[7%] w-full flex sm:justify-between z-10 bg-primary relative">
      <div className="flex w-[275px]">
        <h4 className="px-6 h-auto flex items-center border-r border-line">find me in: </h4>
        <div className="flex justify-center items-center flex-1">
          {findMeInLinks.map((link) => {
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                className={`px-4 flex-1 border-r border-line button-hover h-full`}
              >
                <DynamicSvgIcon
                  name={link.name}
                  className={`w-4 h-full`}
                />
              </a>
            );
          })}
        </div>
      </div>
      <a
        href="https://github.com/rajalamdev"
        target="_blank"
        className="px-4 border-l border-line button-hover items-center gap-2 sm:flex hidden"
      >
        <p>@rajalamdev</p>
        <DynamicSvgIcon name="github" className="w-5" />
      </a>
    </footer>
  );
};

export default Footer;
