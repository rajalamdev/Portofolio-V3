import ProjectsClient from "./ProjectsClient"
import Image from "next/image"

const fetchProjectsApi = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/projects`, {
    cache: 'no-store',
  })
  return await res.json();
}

const Projects = async () => {
  const { projects } = await fetchProjectsApi();

  // Deduplicate projects by id
  const uniqueProjects = Array.from(
    new Map(projects.map(item => [item.id, item])).values()
  );

  // Build categories from tags
  const allTags = Array.from(new Set(uniqueProjects.flatMap((p) => p.tags)));
  const projectsCategoriesApi = allTags.map((tag, i) => ({
    id: i,
    query: tag,
    // Optionally add icon mapping here
  }));

  return (
    <div className="relative w-full h-full overflow-auto">
        <ProjectsClient 
          projectsApi={uniqueProjects} 
          projectsCategoriesApi={projectsCategoriesApi} 
        />
    </div>
  )
}

export default Projects