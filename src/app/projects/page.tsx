"use client"
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Projects =  () => {
  const [queryLanguage, setQueryLanguage] = useState<any>([])
  // process.env.NEXT_PUBLIC_BASE_URL
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate[image]=*&populate[project_categories][populate]=icons${queryLanguage.map((q: string, index: number) => `&filters[$and][${index}][project_categories][query][$contains]=${q}`).join("")}`, fetcher)


  const [filterLanguage, setFilterLanguage] = useState([
    {name: "next-js", icon: "nextjs", active: false},
    {name: "tailwind", icon: "tailwind", active: false},
    {name: "react-js", icon: "react", active: false},
    {name: "vue-js", icon: "react", active: false},
    {name: "react-native", icon: "react", active: false},
  ])

  // &filters[project_categories][query][$contains]=tailwind&filters[project_categories][query][$contains]=nextjs
  function filteredLanguageHandler(currentLanguage: any){
    if(!queryLanguage.some((query: string) => query === currentLanguage.name)){
      setQueryLanguage([...queryLanguage, currentLanguage.name])
    }
    
    if(queryLanguage.some((query: string) => query === currentLanguage.name)){
      const filteredQuery = queryLanguage.filter((query: string) => query != currentLanguage.name)
      setQueryLanguage(filteredQuery)
    }

    const findCurrentLanguage = filterLanguage.findIndex(lang => lang.name === currentLanguage.name)
    const editedCurrentLanguage = filterLanguage[findCurrentLanguage] = {
      ...filterLanguage[findCurrentLanguage],
      active: !filterLanguage[findCurrentLanguage].active
    }

    const updatedFilterLanguage = [...filterLanguage]
    updatedFilterLanguage[findCurrentLanguage] = editedCurrentLanguage
    setFilterLanguage(updatedFilterLanguage)
  }
  
  return (
    <div className="h-full flex">
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
      <section className="overflow-auto w-full p-6">
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {data.data.map((project: any) => {
              return (
                <Link href={`/projects/${project.attributes.slug}`} className="border border-line p-4 rounded flex flex-col gap-4 hover:scale-[1.02] cursor-pointer transition-transform">
                  <div className="space-y-1 flex-1">
                    <h4 className="text-secondary">{project.attributes.title}</h4>
                    <p className="line-clamp-3">{project.attributes.description}</p>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="w-full h-[180px] relative rounded overflow-hidden">
                      <Image src={project.attributes.image.data[0].attributes.formats.medium.url} fill className="object-cover" alt="project image" />
                      <div className="flex justify-end gap-2 flex-wrap absolute top-0 right-0 p-2">
                        {project.attributes.project_categories.data.map((icon: any) => {
                          return (
                            <div className="p-1 flex gap-2 bg-accent">
                              <DynamicSvgIcon name={icon.attributes.icons.data[0].attributes.title} className="w-4 fill-black" />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <p className="text-accent">
                    {"view-projects ->"}
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default Projects