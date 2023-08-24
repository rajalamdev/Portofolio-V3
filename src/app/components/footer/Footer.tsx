"use client";

import DynamicSvgIcon from "../svg/DynamicSvgIcon";

const Footer = () => {
  const findMeInLinks = [
    {
      name: "linkedin",
      href: "https://linkedin.com/in/rajalam-dev",
    },
    {
      name: "instagram",
      href: "https://instagram.com/rajalam.dev",
    },
    {
      name: "spotify",
      href: "https://open.spotify.com/user/282hoo67ycjs0zlqef1asq74h?si=4865dce312d1481f",
    },
  ];

  return (
    <footer className="border-t border-line h-[7%] w-full flex justify-between z-10 bg-bg-primary relative">
      <div className="flex">
        <h4 className="px-6 border-r border-line h-auto flex items-center">find me in: </h4>
        <div className="flex justify-center items-center">
          {findMeInLinks.map((link) => {
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                className={`px-4 border-r border-line button-hover h-full`}
              >
                <DynamicSvgIcon
                  name={link.name}
                  className={`w-4 fill-text-primary h-full`}
                />
              </a>
            );
          })}
        </div>
      </div>
      <a
        href="https://github.com/rajalamdev"
        target="_blank"
        className="px-4 border-l border-line button-hover flex items-center gap-2"
      >
        <p>@rajalamdev</p>
        <DynamicSvgIcon name="github" className="w-5" />
      </a>
    </footer>
  );
};

export default Footer;
