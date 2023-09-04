"use client"
import Image from "next/image"
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon"
import convertStringToTime from "@/utils/convertStringToTime"
import convertToMinsRead from "@/utils/convertToMinsRead"
import { useEffect, useState } from "react"
import useSWR from 'swr'

const BlogComponent = ({ data, blurImage  }: {data: any, blurImage: any}) => {

  // const { data, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[image]=*`)

  const [blog, setBlog] = useState(data)
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
      <div className="columns-3 gap-4">
      

      {blog && blog.data.map((blog: any, index: number) => {
        return (
          <div className="break-inside-avoid mb-4">
            <div className="rounded overflow-hidden border border-line cursor-pointer">
              <div className="relative w-full h-48">
                  {blurImage[index]}
                  {/* <Image src={blog.attributes.image.data.attributes.formats.medium.url} width={1000} height={300} alt="image" placeholder="blur" blurDataURL={blog.attributes.image.data.attributes.formats.medium.hash} /> */}
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
                  <p>{blog.attributes.description}</p>
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