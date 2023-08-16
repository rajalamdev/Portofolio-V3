"use client";

import DynamicSvgIcon from "../svg/DynamicSvgIcon";

const Footer = () => {
  const findMeInLinks = [
    {
      name: "linkedin",
      href: "https://linkedin.com/in/rajalam-dev",
      color: "group-hover:fill-[#0A66C2]",
    },
    {
      name: "instagram",
      href: "https://instagram.com/rajalam.dev",
      color: "group-hover:fill-[#E1306C]",
    },
  ];

  return (
    <footer className="border-t border-line absolute bottom-0 w-full flex justify-between z-10 bg-bg-primary">
      <div className="flex">
        <h4 className="px-6 py-3 border-r border-line">find me in: </h4>
        <div className="flex justify-center items-center">
          {findMeInLinks.map((link) => {
            return (
              <a
                href={link.href}
                target="_blank"
                className={`px-4 py-3 border-r border-line button-hover group`}
              >
                <DynamicSvgIcon
                  name={link.name}
                  className={`w-4 fill-text-primary ${link.color}`}
                />
              </a>
            );
          })}
        </div>
      </div>
      <a
        href="https://github.com/rajalamdev"
        target="_blank"
        className="px-4 py-3 border-l border-line button-hover flex items-start gap-2"
      >
        <p>@rajalamdev</p>
        <DynamicSvgIcon name="github" className="w-5" />
      </a>
    </footer>
  );
};

export default Footer;
