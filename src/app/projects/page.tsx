import ProjectsClient from "./ProjectsClient"

const fetchProjectsApi = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate[image]=*&populate[project_categories][populate]=icons`, {
    cache: 'force-cache',
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
  })
  return await res.json();
}

const fetchProjectsCategoriesApi = async () => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/project-categories?populate[icons]=*`, {
    cache: 'force-cache',
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
   })

   return await res.json();
}

const Projects = async () => {
  const data = await Promise.all([fetchProjectsApi(), fetchProjectsCategoriesApi()])
  return (
    <>
      <ProjectsClient projectsApi={data[0]} projectsCategoriesApi={data[1]} />
    </>
  )
}

export default Projects