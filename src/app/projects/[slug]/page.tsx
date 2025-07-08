import ProjectDetailClient from "./ProjectDetailClient";

const fetchProjectsApi = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/projects`, {
    cache: 'no-store',
  });
  return await res.json();
};

const fetchProjectBySlug = async (slug: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/projects/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Project not found');
  return await res.json();
};

const ProjectDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { projects } = await fetchProjectsApi();
  const project = await fetchProjectBySlug(params.slug);

  return (
    <div className="bg-gradient-to-br from-primary to-accent/30 h-full">
      <ProjectDetailClient project={project} allProjects={projects} />
    </div>
  );
};

export default ProjectDetailPage;
