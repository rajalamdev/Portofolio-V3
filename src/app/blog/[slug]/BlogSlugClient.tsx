"use client"
import MdxMarkdown from "@/components/markdown/MdxMarkdown";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { mutate } from "swr";
// import { revalidatePath } from "next/cache";

const BlogSlugClient = ({ dataBlog, content }: {dataBlog: any, content: any}) => {
  const [blogAPI, setBlogAPI] = useState(dataBlog)
  const router = useRouter()

  useEffect(() => {
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
        // context.setBlogView((prev: any) => prev + 1)


        startTransition(() => {
            setBlogAPI((prev: any) => {
                return {
                    ...prev,
                    attributes: {
                        ...prev.attributes,
                        views: prev.attributes.views + 1
                    }
                }
            })
            
            router.refresh()
        })
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