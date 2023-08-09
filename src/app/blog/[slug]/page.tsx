import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import remarkGfm from "remark-gfm";
import { serialize } from "next-mdx-remote/serialize";
import MdxMarkdown from "@/app/components/markdown/MdxMarkdown";

async function getPost(slug: string) {
    const req = await fetch("http://localhost:1337/api/posts")
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
    return html
  }

const page = async ({ params }: { params: { slug: string }}) => {
  const dataPost = await getPost(params.slug)

  return (
    <>
        <MdxMarkdown data={dataPost} />
    </>
  )
}

export default page