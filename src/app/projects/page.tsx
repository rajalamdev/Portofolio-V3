"use client"
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon"
import { useEffect, useState } from "react"

const Projects =  () => {
  const [filterLanguage, setFilterLanguage] = useState([
    {name: "next-js", icon: "nextjs", language: "nextjs", active: false},
    {name: "tailwind", icon: "tailwind", language: "tailwind", active: false},
    {name: "react-js", icon: "react", language: "reactjs", active: false},
    {name: "vue-js", icon: "react", language: "vuejs", active: false},
    {name: "react-native", icon: "react", language: "react_native", active: false},
  ])

  const [filteredLanguage, setFilteredLanguage] = useState<any>([])

  useEffect(() => {
    // console.log(filteredLanguage)
  }, [filteredLanguage])

  function filteredLanguageHandler(currentLanguage: any){
    if(filteredLanguage.some(lang => lang === currentLanguage.language)){
      setFilteredLanguage([...filteredLanguage, currentLanguage.language])
    }

    const findCurrentLanguage = filterLanguage.findIndex(lang => lang.language === currentLanguage.language)
    const editedCurrentLanguage = filterLanguage[findCurrentLanguage] = {
      ...filterLanguage[findCurrentLanguage],
      active: !filterLanguage[findCurrentLanguage].active
    }

    const updatedFilterLanguage = [...filterLanguage]
    updatedFilterLanguage[findCurrentLanguage] = editedCurrentLanguage
    setFilterLanguage(updatedFilterLanguage)
  }
  
  return (
    <div className="h-full">
      <section className="max-w-[275px] border-r border-line h-full flex-grow-0 flex-shrink-0">
          <h4 className="sticky top-0 z-10 bg-primary cursor-pointer text-secondary flex gap-2 py-2 px-6 border-b border-line">
            <DynamicSvgIcon name="trianglePrimary" className={`w-[10px]`}/> projects
          </h4>
          <div className="flex gap-2 flex-wrap p-4">
            {filterLanguage.map((language) => {
              return (
              <div onClick={() => filteredLanguageHandler(language)} className={`${language.active && "bg-accent text-black"} cursor-pointer flex gap-2 border border-line p-2 rounded`}>
                <DynamicSvgIcon name={`${language.icon}`} className="w-5" />
                <p>{language.name}</p>
              </div>
            )
            })}
          </div>
      </section>
    </div>
  )
}

export default Projects