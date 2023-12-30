import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import remarkGfm from "remark-gfm";
import { serialize } from "next-mdx-remote/serialize";
import MdxMarkdown from "@/components/markdown/MdxMarkdown";
import Navbar from "@/components/header/Navbar";
import BlogSlugClient from "./BlogSlugClient";

async function getPost(slug: string) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate[image]=*`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      // cache: 'force-cache'
      next: { revalidate: 0}
    })
    const res = await req.json();
    
  
    const html = await serialize(res.data[0].attributes.content, {
      mdxOptions: {
        rehypePlugins: [
          rehypeCodeTitles,
          rehypePrism
      ],
        remarkPlugins: [
            remarkGfm
        ]
      }
    });
    return {blog: res.data[0], content: html}
  }

const page = async ({ params }: { params: { slug: string }}) => {
  const dataPost = await getPost(params.slug)
  console.log(dataPost)
  return (
    <section className="h-full overflow-auto">
        <BlogSlugClient dataBlog={dataPost.blog} content={dataPost.content} />
    </section>
  )
}

export default page