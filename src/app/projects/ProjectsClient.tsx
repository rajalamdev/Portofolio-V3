"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon";
import { tagIconColorList } from "@/constant/tagIconColor";
import { formatDate } from "@/utils/formatDate";

// TESTING
interface ProjectsClientProps {
  projectsApi: any[];
  projectsCategoriesApi: any[];
  showFilter?: boolean;
}

const ProjectsClient = ({ projectsApi, projectsCategoriesApi, showFilter = false }: ProjectsClientProps) => {
  const [projects, setProjects] = useState<any[]>(projectsApi);
  const [queryLanguage, setQueryLanguage] = useState<string[]>([]);

  function filterCategoryHandler(tag: string) {
    setQueryLanguage((prevQueryLanguage) => {
      if (!prevQueryLanguage.includes(tag)) {
        return [...prevQueryLanguage, tag];
      } else {
        return prevQueryLanguage.filter((q) => q !== tag);
      }
    });
  }

  useEffect(() => {
    if (queryLanguage.length === 0) {
      // Sort all projects by created date descending
      const sorted = [...projectsApi].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      setProjects(sorted);
    } else {
      const filtered = projectsApi.filter((project: any) =>
        queryLanguage.every((query) => project.tags.includes(query))
      );
      // Sort filtered projects by created date descending
      const sorted = [...filtered].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      setProjects(sorted);
    }
  }, [queryLanguage, projectsApi]);

  return (
    <section className="flex flex-col h-full w-full overflow-auto">
      <div className="relative z-30 w-full h-72 flex justify-center items-center">
        <Image 
          src="/bg-projects.webp"
          alt="Projects Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="flex gap-3 md:gap-4 md:max-w-5xl h-full flex-wrap justify-center items-center content-start pt-5 sm:pt-0 sm:content-center relative z-10 px-2">
          {projectsCategoriesApi.map((cat: any) => {
            const isActive = queryLanguage.includes(cat.query);
            const found = tagIconColorList.find(item => item.tag === cat.query);
            const iconName = found?.icon || 'file';
            const iconClass = isActive ? 'text-primary' : '';
            const iconStyle = !isActive && found?.color ? { color: found.color } : {};
            return (
              <button 
                key={cat.id}
                onClick={() => filterCategoryHandler(cat.query)}
                className={`py-1 px-2 md:py-2 md:px-4  ${isActive ? "bg-accent ring-1 md:ring-2 ring-accent text-black" : "bg-primary ring-1 md:ring-2 ring-accent text-white"} text-xs md:text-base rounded ring-offset-2 ring-offset-primary flex items-center gap-2`}>
                <DynamicSvgIcon name={iconName} className={`${iconClass} w-2 h-2 md:w-4 md:h-4`} style={iconStyle} />
                {cat.query}
              </button>
            );
          })}
        </div>
      </div>
      {projects.length === 0 && 
          <div className="flex justify-center items-center flex-1">
            <p className="text-xl text-center font-semibold">OOPS! THE PROJECT DOESN&apos;T YET EXIST, IT&apos;S COMING SOON...</p>
          </div>
      }
      {projects.length > 0 && 
      <div className="flex-1 min-h-0 -mt-8 px-6 relative z-50">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6 pb-8">
            {projects.map((project: any) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.id}
                className="relative border border-line p-0 rounded-2xl overflow-hidden group min-h-[260px] flex flex-col justify-end shadow-2xl bg-black/60 transition-transform duration-300 hover:scale-[1.03] hover:shadow-accent/30 hover:shadow-2xl"
              >
                {/* Thumbnail as background */}
                <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-black/80 transition-all duration-300 group-hover:bg-transparent"></div>
                </div>
                {/* Card content */}
                <div className="relative z-10 p-6 flex flex-col gap-3 h-full">
                  <h4 className="text-accent text-xl font-bold drop-shadow-md mb-1">{project.title}</h4>
                  <p className="text-xs text-gray-400 mb-1">Created at: {formatDate(project.created)}</p>
                  <p className="line-clamp-3 text-secondary drop-shadow-md mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="bg-[#1c2a3a] text-accent text-xs px-3 py-1 rounded-full font-semibold shadow hover:bg-accent/70 transition-all duration-200 cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-accent mt-auto font-semibold underline underline-offset-2 hover:text-white transition-colors duration-200">
                    {"view project →"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
      </div>
      }
      {/* Cards/message area */}
    </section>
  )
}

export default ProjectsClient