"use client"
import Image from "next/image"
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon"
import convertStringToTime from "@/utils/convertStringToTime"
import convertToMinsRead from "@/utils/convertToMinsRead"
import { useEffect, useState } from "react"
import useSWR from 'swr'
import ProjectSkeleton from "@/components/loading-skeleton/ProjectSkeleton"
import BlogSkeleton from "@/components/loading-skeleton/BlogSkeleton"
import BlogCategoriesSkeleton from "@/components/loading-skeleton/BlogCategoriesSkeleton"

const fetcher = (url: string) => fetch(url, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
}).then(r => r.json())

const BlogComponent = () => {

  const { data: blogAPI } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[image]=*&populate[blog_categories]=*&sort[0]=createdAt:desc`, fetcher)
  const { data: blogCategoriesAPI } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-categories`, fetcher)
  const [blog, setBlog] = useState(blogAPI)
  const [blogCategories, setBlogCategories] = useState(blogCategoriesAPI)
  const [isLoading, setIsLoading] = useState(true)
  const [filterCategories, setFilterCategories] = useState<any>([])

  useEffect(() => {
    if(blogAPI && blogCategoriesAPI) {
      setBlog(blogAPI)  
      setBlogCategories(blogCategoriesAPI)
      setIsLoading(false)
    }
  }, [blogAPI, blogCategories])

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

  useEffect(() => {
    console.log(filterCategories)
  }, [filterCategories])

  function filterHandler(currentCategory: any){
    if(!filterCategories.includes(currentCategory.attributes.title)) return setFilterCategories([...filterCategories, currentCategory.attributes.title]) 
    const removeCurrentCategory = filterCategories.filter((cat: any) => cat !== currentCategory.attributes.title)
    setFilterCategories(removeCurrentCategory)
  }

    return (
      <>
        <div className="space-y-4 text-secondary mb-8">
          <div className="border-l-2 px-2 border-accent text-xl font-bold">
            <h3>Sharing my <span className="text-accent">Stories</span>,</h3>
            <h3>Thoughts & Experiences.</h3>
          </div>
          <div>
            <input type="text" name="" placeholder="Search..." className="py-2 px-4 bg-transparent border border-tertiary focus:border-accent w-full" />
          </div>
          <div className="flex gap-2 flex-wrap cursor-pointer">
            {isLoading && <BlogCategoriesSkeleton />}
            {!isLoading && blogCategories.data.map((cat: any) => <div onClick={() => filterHandler(cat)} className={`py-1 rounded px-2 ${filterCategories.includes(cat.attributes.title) ? "bg-accent text-black" : "bg-line"}`}>{cat.attributes.title}</div>)}        
          </div>
        </div>
        <div className={`${!isLoading && "columns-1 sm:columns-2 lg:columns-3 gap-4"}`}>
          {isLoading && <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"><BlogSkeleton /></div>}
          {!isLoading && blog.data.map((blog: any, index: number) => {
            return (
              <div className="break-inside-avoid mb-4">
                <div className="rounded overflow-hidden border border-line cursor-pointer">
                  <div className="relative">
                      <Image src={blog.attributes.image.data.attributes.formats.medium.url} width={blog.attributes.image.data.attributes.formats.medium.width} height={blog.attributes.image.data.attributes.formats.medium.height} alt="image" placeholder="blur" blurDataURL={blog.attributes.image.data.attributes.placeholder} />
                      <div className="absolute right-2 bottom-2 z-50 flex gap-2 flex-wrap">
                        {blog.attributes.blog_categories.data.map((cat: any) => <div className={`rounded py-1 px-2 bg-line text-secondary`}>{cat.attributes.title}</div>)}
                      </div>
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
    </>
    )

}

export default BlogComponent