"use client"
import MdxMarkdown from "@/components/markdown/MdxMarkdown";
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon";
import { useAppContext } from "@/context/AppContext";
import convertStringToTime from "@/utils/convertStringToTime";
import convertToMinsRead from "@/utils/convertToMinsRead";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { mutate } from "swr";

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
        // mutate(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[image]=*&populate[blog_categories]=*&sort[0]=createdAt:desc`)
        router.refresh()
    }
    incrementViews()
  }, [])

  return (
    <>
        <div className="py-4 px-28 space-y-2 text-secondary">
            <div className="relative w-full h-[450px]">
                <Image src={blogAPI.attributes.image.data.attributes.url} fill alt="blog image header" className="object-cover rounded-xl" placeholder="blur" blurDataURL={blogAPI.attributes.image.data.attributes.placeholder} />
            </div>
            <h1 className="text-3xl text-secondary font-bold py-2">{blogAPI.attributes.title}</h1>
            <p>Written on {convertStringToTime(blogAPI.attributes.createdAt)}</p>
            <p>Last updated {convertStringToTime(blogAPI.attributes.updatedAt)}</p>
            <div className="pt-4 flex gap-4 pb-2">
                <div className="flex items-center gap-1">
                    <DynamicSvgIcon name="time" className="w-5 text-secondary" />
                    <p className="text-accent">{convertToMinsRead(blogAPI.attributes.content)} min read</p>
                </div>
                <div className="flex items-center gap-1">
                    <DynamicSvgIcon name="eye" className="w-5 text-secondary" />
                    <p className="text-accent">{blogAPI.attributes.views} views</p>
                </div>
            </div>
            <div className="w-full h-[2px] bg-line"></div>
        </div>
        <div className="overflow-x-hidden flex px-28">
            <div className="w-3/4 pr-4 text-base colorful prose prose-invert text-[#c9ced3] max-w-none">
                <MdxMarkdown data={content} />
            </div>
            <div className="flex-1 bg-red-500">
            </div>
        </div>
    </>
  )
}

export default BlogSlugClient