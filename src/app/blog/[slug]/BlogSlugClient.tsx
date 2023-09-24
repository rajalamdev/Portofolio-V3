"use client"
import MdxMarkdown from "@/components/markdown/MdxMarkdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mutate } from "swr";
// import { revalidatePath } from "next/cache";

const BlogSlugClient = ({ dataBlog, content }: {dataBlog: any, content: any}) => {
  const [blogAPI, setBlogAPI] = useState(dataBlog)
  const router = useRouter()

  useEffect(() => {
    console.log(dataBlog.attributes.views)
    const incrementViews = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs/${dataBlog.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            },
            body: JSON.stringify({
                data: {views: dataBlog.attributes.views + 1}
            })
        })
        mutate(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[image]=*&populate[blog_categories]=*&sort[0]=createdAt:desc`)
        router.refresh()
    }
    incrementViews()
  }, [])

  return (
    <>
        <MdxMarkdown data={content} />
    </>
  )
}

export default BlogSlugClient