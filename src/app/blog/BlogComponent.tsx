"use client"
import Image from "next/image"
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon"
import convertStringToTime from "@/utils/convertStringToTime"
import convertToMinsRead from "@/utils/convertToMinsRead"
import { useEffect, useState } from "react"
import useSWR from 'swr'
import ProjectSkeleton from "@/components/loading-skeleton/ProjectSkeleton"
import BlogSkeleton from "@/components/loading-skeleton/BlogSkeleton"

const fetcher = (url: string) => fetch(url, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
}).then(r => r.json())

const BlogComponent = () => {

  const { data, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[image]=*&sort[0]=createdAt:desc`, fetcher)
  const [blog, setBlog] = useState(data)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(data) {
      setBlog(data)
      setIsLoading(false)
    }
  }, [data])

  const testHandler = async (currentBlog: any) => {
    const findBlogIndex = blog.data.findIndex((b: any) => b.id === currentBlog.id)
    const updatedCurrentBlog = blog.data[findBlogIndex] = {
      id: blog.data[findBlogIndex].id,
      attributes: {
        ...blog.data[findBlogIndex].attributes,
        views: blog.data[findBlogIndex].attributes.views + 1
      }
    }

    const cloneBlog = {...blog};
    cloneBlog.data[findBlogIndex] = updatedCurrentBlog
    setBlog(cloneBlog)
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs/${currentBlog.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      },
      body: JSON.stringify({
        data: {views: blog.data[findBlogIndex].attributes.views}
      })
    })
  }

    return (
      <div className={`${!isLoading && "columns-1 sm:columns-2 lg:columns-3 gap-4"}`}>
      {isLoading && <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"><BlogSkeleton /></div>}
      {!isLoading && blog.data.map((blog: any, index: number) => {
        return (
          <div className="break-inside-avoid mb-4">
            <div className="rounded overflow-hidden border border-line cursor-pointer">
              <div>
                  <Image src={blog.attributes.image.data.attributes.formats.medium.url} width={blog.attributes.image.data.attributes.formats.medium.width} height={blog.attributes.image.data.attributes.formats.medium.height} alt="image" placeholder="blur" blurDataURL={blog.attributes.image.data.attributes.placeholder} />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex gap-4">
                  <div className="flex gap-2 items-center">
                    <DynamicSvgIcon name="eye" className="w-5" />
                    <p className="text-accent">{blog.attributes.views} views</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <DynamicSvgIcon name="time" className="w-5" />
                    <p className="text-accent">{convertToMinsRead(blog.attributes.content)} mins read</p>
                  </div>
                </div>
                <button onClick={() => testHandler(blog)}>test</button>
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-secondary">{blog.attributes.title}</h3>
                  <h6 className="">{convertStringToTime(blog.attributes.publishedAt)}</h6>
                  <p className="line-clamp-3">{blog.attributes.description}</p>
                  <div className="text-secondary">
                    {"-> continue-reading"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
    )

}

export default BlogComponent