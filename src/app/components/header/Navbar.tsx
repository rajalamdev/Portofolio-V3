"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DynamicSvgIcon from "../svg/DynamicSvgIcon";
import ButtonEnableDisable from "../ButtonEnableDisable";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import useAudio from "@/hooks/useAudio";

const Navbar = () => {
  const pathname = usePathname();
  const audio = useAudio('/music/background.mp3', { volume: 1, playbackRate: 1, loop: true})

  const context = useAppContext();  

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if(context.enabledMusic){
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [context.enabledMusic])

  const navLinks = [
    { text: "_hello", href: "/" },
    { text: "_about", href: "/about" },
    { text: "_projects", href: "/projects" },
    { text: "_blog", href: "/blog" },
    { text: "_contact", href: "/contact" },
  ];

  const active = "text-header-primary border-b-2 border-b-accent-primary";

  return (
    <header className="h-[7%]">
      <nav className="border-b h-full border-line flex justify-between w-full items-center relative z-20 bg-bg-primary">
        <Link
          href="/"
          className="lg:max-w-[275px] flex items-center lg:w-full h-full flex-grow-0 flex-shrink-0 lg:border-r border-line hover:opacity-80 button-hover pl-6"
        >
          <h4>raj-alam</h4>
        </Link>
        <ul className="hidden lg:flex flex-1 h-full">
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
        <div className="hidden lg:flex items-center max-w-[150px] h-full w-full border-l border-line pl-4 pr-6 gap-4 justify-end">
          <DynamicSvgIcon name="moon" className="w-6 cursor-pointer hover:opacity-80 fill-accent-primary" />
          <div onClick={() => setShowSettings(!showSettings)}>
            <DynamicSvgIcon name="settings" className="w-6 cursor-pointer hover:opacity-80" />
          </div>
        </div>
        <div className="pr-6 lg:hidden">
          =
        </div>

        {/* settings */}
        <div className={`fixed left-0 right-0 bottom-0 top-0 transition-opacity duration-300   ${showSettings ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} flex backdrop-blur-sm bg-black/20 justify-center items-center`}>
          <div className={`max-w-[350px] h-[400px] ${showSettings ? "opacity-100" : "opacity-0"} transition-all bg-bg-primary border border-line w-full rounded-lg flex flex-col p-4 relative`}>
            <div className="flex justify-end pb-2">
              <button onClick={() => setShowSettings(false)}>
                <DynamicSvgIcon name="xmark" className="w-3" />
              </button>
            </div>
            <h3 className="text-center text-header-primary font-semibold text-base mb-4">Settings</h3>
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <DynamicSvgIcon name="sound" className="w-6" />
                  <p>Enable Music Background</p>
                </div>
                <div onClick={() => context.setEnabledMusic(!context.enabledMusic)}>
                  <ButtonEnableDisable enabled={context.enabledMusic} name="music" />
                </div>
              </div>
              <div onClick={() => context.setEnabled3dSpline(!context.enabled3dSpline && !context.smallDevices)} className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <DynamicSvgIcon name="_3d" className="w-6" />
                  <p>Enable 3D Spline</p>
                </div>
                <ButtonEnableDisable enabled={context.enabled3dSpline} name="3d" />
              </div>
            </div>
            <p className="flex items-end text-center">Created by raj-alam and the design inspired by yanka</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
