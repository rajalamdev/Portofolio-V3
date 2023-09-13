"use client"
import DynamicBlurImage from "@/components/images/DynamicBlurImage"
import Layout from "../../components/layout/Layout"
import DynamicSvgIcon from "../../components/svg/DynamicSvgIcon"
import Image from "next/image"
import { useEffect, useState } from "react"

const Contact = () => {
  const contactBoxList = [
    {name: "LinkedIn", icon: "linkedin", href: ""},
    {name: "Instagram", icon: "instagram", href: ""},
    {name: "Github", icon: "github", href: ""},
    {name: "Spotify", icon: "spotify", href: ""},
  ]

  const [time, setTime] = useState("")
  const [DMY, setDMY] = useState("")

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString()
    setTime(currentTime)

    const getDMY = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    setDMY(getDMY)

    setInterval(() => {
      const currentTime = new Date().toLocaleTimeString()
      setTime(currentTime)
    }, 1000)
  }, [])

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden px-6 sm:px-12 flex flex-col relative">
        <div className="flex h-20 gap-4 top-0 left-0 mb-8">
          <div className="bg-accent w-1 h-full"></div>
          <div className="self-end">
            <h3 className="text-xl font-semibold text-secondary mb-1">CONTACT</h3>
            <p className="text-base">feel-free-to-contact-me 🥸</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:flex-wrap flex-1">
          <div className="flex-1 flex justify-center items-center">
            <form className="space-y-6 max-w-[400px] w-full">
              <label htmlFor="name" className="relative w-full block">
                <span className="absolute bg-primary -top-[10px] px-2 left-2 peer z-10 cursor-pointer">_email</span>
                <input type="text" name="name" id="name" className="text-secondary outline-none bg-transparent border border-tertiary py-2 px-4 rounded w-full focus:scale-x-105 focus:border-accent transition-transform duration-300" autoComplete="false" required placeholder="yourgmail@gmail.com" />
              </label>
              <label htmlFor="name" className="relative w-full block">
                <span className="absolute bg-primary -top-[10px] px-2 left-2 peer z-10 cursor-pointer">_subject</span>
                <input type="email" name="subject" id="subject" className="text-secondary outline-none bg-transparent border border-tertiary py-2 px-4 rounded w-full focus:scale-x-105 focus:border-accent transition-transform duration-300" autoComplete="false" required placeholder="ex: greetings" />
              </label>
              <label htmlFor="name" className="relative w-full block">
                <span className="absolute bg-primary -top-[10px] px-2 left-2 peer z-10 cursor-pointer">_message</span>
                <textarea value="Just wanted to say hi!" name="name" id="name" className="min-h-[100px] max-h-[120px] text-secondary outline-none bg-transparent border border-tertiary p-2 rounded w-full focus:scale-x-105 focus:border-accent transition-transform duration-300 px-4" autoComplete="false" required />
              </label>
              <button type="submit" className="py-2 px-4 bg-accent rounded text-black active:ring-2 ring-accent ring-offset-4 ring-offset-primary">send-message</button>
            </form>
          </div>

          <div className="h-full flex flex-row lg:flex-col lg:w-4 items-center lg:px-8 space-x-4 lg:space-x-0 my-8 lg:my-0">
            <div className="w-full lg:w-[2px] h-[2px] bg-line lg:flex-1"></div>
            <p className="text-xl font-semibold py-2">OR</p>
            <div className="w-full lg:w-[2px] h-[2px] bg-line lg:flex-1"></div>
          </div>

          <div className="flex-1 flex gap-8 justify-center flex-wrap content-center">
            {contactBoxList.map(contact => {
              return (
                <div className="group lg:w-56 w-64 lg:h-[120px] h-[130px] cursor-pointer" key={contact.name}>
                  <div className="bg-accent w-full h-full rounded-br-3xl rounded-tl-3xl flex justify-center items-center relative group-hover:-translate-y-4 transition-all duration-300">
                    <DynamicSvgIcon name={contact.icon} className="w-10 fill-secondary" />
                    <p className="absolute text-secondary bottom-0 opacity-0 group-hover:opacity-100 group-hover:-bottom-8 -z-10 transition-all duration-300">{contact.name}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="flex h-20 gap-4 mt-8 justify-end">
          <div className="self-center">
            <h3 className="text-xl font-semibold text-secondary mb-1 text-right">{DMY}</h3>
            <p className="text-base text-right">{time}</p>
          </div>
          <div className="bg-accent w-1 h-full"></div>
        </div>
    </div>
  )
}

export default Contact