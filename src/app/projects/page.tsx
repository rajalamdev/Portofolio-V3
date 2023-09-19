"use client"
import ProjectSkeleton from "@/components/loading-skeleton/ProjectSkeleton"
import ProjectsCategoriesSkeleton from "@/components/loading-skeleton/ProjectsCategoriesSkeleton"
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"


const fetcher = (url: string) => fetch(url, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
}).then(res => res.json())


const Projects =  () => {
  const [queryLanguage, setQueryLanguage] = useState<any>([])
  const { data: projectsAPI} = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate[image]=*&populate[project_categories][populate]=icons`, fetcher)
  const { data: projectsCategoriesAPI } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/project-categories?populate[icons]=*`, fetcher)
  const [projects, setProjects] = useState(projectsAPI)
  const [projectsCategories, setProjectsCategories] = useState(projectsCategoriesAPI)
  const [isLoading, setIsLoading] = useState(true)
  const [categoriesInclude, setCategoriesInclude] = useState<any>([])

  useEffect(() => {
    if(projectsAPI && projectsCategoriesAPI){
      setProjects(projectsAPI)
      setProjectsCategories(projectsCategoriesAPI)
      setIsLoading(false)
    }
  }, [projectsAPI, projectsCategoriesAPI])

  useEffect(() => {
    if(!queryLanguage.length && projects){
      setProjects(projectsAPI)
      setCategoriesInclude([])
      return 
    }

    if(projects){
      const filteredProjects = projectsAPI.data.filter((project: any) => queryLanguage
        .every((query: any) => project.attributes.project_categories.data
        .some((d: any) => d.attributes.query == query))) 

      setProjects({data: filteredProjects, meta: projects.meta})

      const getAllQueries = filteredProjects
        .map((data: any) => data.attributes.project_categories.data.map((data: any) => data.attributes.query))
        .reduce((prev: any, cur: any) => prev.concat(cur), [])

      const removeDuplicate = Array.from(new Set(getAllQueries))
      setCategoriesInclude(removeDuplicate)
    }
  }, [queryLanguage])
  
  function filterCategoryHandler(currentCategory: any){
    if(!queryLanguage.some((query: string) => query === currentCategory.attributes.query)){
      setQueryLanguage([...queryLanguage, currentCategory.attributes.query])
    }
    
    if(queryLanguage.some((query: string) => query === currentCategory.attributes.query)){
      const filteredQuery = queryLanguage.filter((query: string) => query != currentCategory.attributes.query)
      setQueryLanguage(filteredQuery)
    }
  }
  
  return (
    <div className="h-full flex md:flex-row flex-col">
      <section className="md:max-w-[275px] border-r border-line md:overflow-auto md:flex-grow-0 md:flex-shrink-0">
          <h4 className="sticky top-0 z-10 bg-primary cursor-pointer text-secondary flex gap-2 py-2 px-6 border-b border-line">
            <DynamicSvgIcon name="trianglePrimary" className={`w-[10px]`}/> projects
          </h4>
          <div className="flex gap-2 flex-wrap p-6 md:p-4 justify-center md:justify-start">
            {isLoading && <ProjectsCategoriesSkeleton />}
            {!isLoading && projectsCategories.data.map((cat: any) => {
              return (
              <button disabled={categoriesInclude.length && !categoriesInclude.includes(cat.attributes.query)}  onClick={() => filterCategoryHandler(cat)} className={`${queryLanguage.includes(cat.attributes.query) && "bg-accent text-black"} ${categoriesInclude.length && !categoriesInclude.includes(cat.attributes.query) && "opacity-50 cursor-not-allowed"} flex gap-2 border border-line p-2 rounded`}>
                <DynamicSvgIcon name={`${cat.attributes.icons.data[0].attributes.title}`} className="w-5" />
                <p>{cat.attributes.query}</p>
              </button>
            )
            })}
          </div>
      </section>
      <section className="overflow-auto w-full p-6 h-full border-t border-line md:border-transparent">
        {!isLoading && !projects.data.length && <div className="flex justify-center items-center h-full"><p className="text-xl font-semibold">OOPS! THE PROJECT DOESN'T YET EXIST, IT'S COMING SOON...</p></div>}
        {isLoading && <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"><ProjectSkeleton /></div>}
        {!isLoading && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {projects.data.map((project: any) => {
              return (
                <Link href={`/projects/${project.attributes.slug}`} className="border border-line p-4 rounded flex flex-col gap-4 hover:scale-[1.02] cursor-pointer transition-transform">
                  <div className="space-y-1 flex-1">
                    <h4 className="text-secondary">{project.attributes.title}</h4>
                    <p className="line-clamp-3">{project.attributes.description}</p>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="w-full h-[180px] relative rounded overflow-hidden">
                      <Image src={project.attributes.image.data.attributes.formats.medium.url} fill className="object-cover" alt="project image" />
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