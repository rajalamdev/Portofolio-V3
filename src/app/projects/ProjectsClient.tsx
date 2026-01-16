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
      // Sort: featured first, then by created date descending
      const sorted = [...projectsApi].sort((a, b) => {
        // Featured projects come first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Then sort by date
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });
      setProjects(sorted);
    } else {
      const filtered = projectsApi.filter((project: any) =>
        queryLanguage.every((query) => project.tags.includes(query))
      );
      // Sort filtered: featured first, then by created date descending
      const sorted = [...filtered].sort((a, b) => {
        // Featured projects come first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Then sort by date
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });
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
        {/* Scrollable container for mobile */}
        <div className="w-full h-full flex justify-center items-center relative z-10">
          <div className="w-full md:max-w-5xl overflow-x-auto overflow-y-hidden scrollbar-hide px-2">
            <div className="flex gap-2 md:gap-3 justify-center items-center min-w-max md:flex-wrap md:min-w-0 py-5">
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
                    className={`py-1 px-2 md:py-1.5 md:px-3 flex-shrink-0 ${isActive ? "bg-accent ring-1 ring-accent text-black" : "bg-primary ring-1 ring-accent text-secondary"} text-xs md:text-sm rounded ring-offset-2 ring-offset-primary flex items-center gap-1.5 md:gap-2 transition-all duration-200 hover:scale-105`}>
                    <DynamicSvgIcon name={iconName} className={`${iconClass} w-3 h-3 md:w-3.5 md:h-3.5`} style={iconStyle} />
                    {cat.query}
                  </button>
                );
              })}
            </div>
          </div>
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
            {projects.map((project: any) => {
              const maxVisibleTags = 4;
              const visibleTags = project.tags.slice(0, maxVisibleTags);
              const remainingCount = project.tags.length - maxVisibleTags;
              
              return (
              <Link
                href={`/projects/${project.slug}`}
                key={project.id}
                className={`relative border p-0 rounded-2xl overflow-hidden group min-h-[260px] flex flex-col justify-end shadow-2xl bg-black/60 transition-all duration-300 hover:scale-[1.03] ${
                  project.featured 
                    ? 'border-accent ring-2 ring-accent/50 ring-offset-2 ring-offset-primary shadow-accent/40 hover:shadow-accent/60 hover:ring-accent' 
                    : 'border-line hover:shadow-accent/30'
                } hover:shadow-2xl`}
              >
                {/* Featured Label */}
                {project.featured && (
                  <div className="absolute top-3 left-3 z-20 bg-accent text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <span>⭐</span>
                    <span>FEATURED</span>
                  </div>
                )}
                
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
                    {visibleTags.map((tag: string, idx: number) => (
                      <span key={idx} className="bg-[#1c2a3a] text-accent text-xs px-3 py-1 rounded-full font-semibold shadow hover:bg-accent/70 transition-all duration-200 cursor-pointer">
                        {tag}
                      </span>
                    ))}
                    {remainingCount > 0 && (
                      <span className="bg-[#1c2a3a]/50 text-gray-400 text-xs px-3 py-1 rounded-full font-semibold shadow">
                        +{remainingCount} more
                      </span>
                    )}
                  </div>
                  <div className="text-accent mt-auto font-semibold underline underline-offset-2 hover:text-white transition-colors duration-200">
                    {"view project →"}
                  </div>
                </div>
              </Link>
            );
            })}
          </div>
      </div>
      }
      {/* Cards/message area */}
    </section>
  )
}

export default ProjectsClient