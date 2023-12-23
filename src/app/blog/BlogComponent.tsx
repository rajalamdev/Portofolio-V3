"use client"
import Image from "next/image"
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon"
import convertStringToTime from "@/utils/convertStringToTime"
import convertToMinsRead from "@/utils/convertToMinsRead"
import { useEffect, useRef, useState } from "react"
import useSWR from 'swr'
import ProjectSkeleton from "@/components/loading-skeleton/ProjectSkeleton"
import BlogSkeleton from "@/components/loading-skeleton/BlogSkeleton"
import BlogCategoriesSkeleton from "@/components/loading-skeleton/BlogCategoriesSkeleton"
import Link from "next/link"

const fetcher = (url: string) => fetch(url, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
}).then(r => r.json())

const BlogComponent = ({ blogs, categories }: {blogs: any, categories: any}) => {
  // const { data: blogAPI } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[image]=*&populate[blog_categories]=*&sort[0]=createdAt:desc`, fetcher)
  // const { data: blogCategoriesAPI } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-categories`, fetcher)
  const [blog, setBlog] = useState(blogs)
  const [blogCategories, setBlogCategories] = useState(categories)
  const [isLoading, setIsLoading] = useState(true)
  const [categoriesInclude, setCategoriesInclude] = useState<any>([])
  const [currentCategory, setCurrentCategory] = useState("")
  const [searchBlog, setSearchBlog] = useState("")
  const [activeCategories, setActiveCategories] = useState<any>([])
  const inputRef = useRef<any>(null)
  const sortBy = [
    {name: "sort-by-date", icon: "calendar"},
    {name: "sort-by-views", icon: "eye"},
  ]
  const [currentSortBy, setCurrentSortBy] = useState({name: "sort-by-date", icon: "calendar"})
  const [showSortBy, setShowSortBy] = useState(false)

  // useEffect(() => {
  //   if(blogAPI && blogCategoriesAPI) {
  //     setBlog(blogAPI)  
  //     setBlogCategories(blogCategoriesAPI)
  //     setIsLoading(false)
  //   }
  // }, [blogAPI, blogCategories])

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
    if(currentSortBy.icon === "calendar"){
      setBlog(blogs)
    } else {
      const copyBlog = blogs.data.slice();
      const sortByViews = copyBlog.sort((blogX: any, blogY: any) => blogY.attributes.views - blogX.attributes.views)
      setBlog({data: sortByViews, meta: blog.meta})
    }
  }, [currentSortBy])

  useEffect(() => {
    if(!searchBlog.length && blog){
      setBlog(blogs)
      setSearchBlog("")
      setCategoriesInclude([])
      setActiveCategories([])
      return
    }

    if(blog){
      const splitSearch = searchBlog.toString().split(" ")
      setActiveCategories(splitSearch)
      
      const searchBlogFilter = blogs.data.filter((blog: any) => 
        splitSearch.every(s => blog.attributes.title.toLowerCase().includes(s.toLowerCase()))
        ||
        splitSearch.every(s => blog.attributes.blog_categories.data.some((cat: any) => cat.attributes.title.toLowerCase().includes(s.toLowerCase())))  
      )
      const getAllCategories = searchBlogFilter.map((blog: any) => blog.attributes.blog_categories.data
        .map((cat: any) => cat.attributes.title))
        .reduce((prev: any, cur: any) => prev.concat(cur), [])

      const removeDuplicateCategories = Array.from(new Set(getAllCategories))
      setBlog({data: searchBlogFilter, meta: blog.meta})
      setCategoriesInclude(removeDuplicateCategories)
      console.log(currentCategory)
     
    }
  }, [searchBlog])

  function filterHandler(currentCategory: any){
    setCurrentCategory(currentCategory.attributes.title)
    inputRef.current.focus()
    if(!searchBlog.includes(currentCategory.attributes.title)){
      setSearchBlog(prev => prev != "" ? `${prev.trim()} ${currentCategory.attributes.title}` : currentCategory.attributes.title)
    }else {
      const splitSearch = searchBlog.toString().split(" ")
      const removeCurrentSearch = splitSearch.filter((s: any) => s !== currentCategory.attributes.title)
      setSearchBlog(removeCurrentSearch.join(""))
    }
  }

  function sortHandler(currentBy: any){
    const setNewSort = sortBy.filter(by => by.name == currentBy.name)
    setCurrentSortBy(setNewSort[0])
    setShowSortBy(false)
  }

    return (
      <>
        <div className="space-y-4 text-secondary mb-8">
          <div className="border-l-2 border-accent flex flex-wrap justify-between items-end">
            <div className="px-4 text-xl md:text-2xl font-bold">
              <h3>Sharing my <span className="text-accent">Stories</span>,</h3>
              <h3>Thoughts & Experiences.</h3>
            </div>
            <div className="relative md:w-52 w-full p-4 pl-4 pr-0">
              <button onClick={() => setShowSortBy(!showSortBy)} className="border border-tertiary px-4 py-2 rounded flex justify-between items-center w-full active:scale-95 transition-all">
                <div className="flex gap-2 items-center">
                  <DynamicSvgIcon name={currentSortBy.icon} className="w-4" />
                  <p>{currentSortBy.name}</p>
                </div>
                <DynamicSvgIcon name="filter" className="w-4" />

              </button>
              <div className={`absolute ${showSortBy ? "z-10 opacity-100" : "-z-50 opacity-0"} transition-all bg-primary rounded -bottom-20 border border-tertiary left-0 right-0`}>
                {sortBy.map(by => <button onClick={() => sortHandler(by)} className={`${by.name === currentSortBy.name && "bg-accent text-black"} py-2 px-2 w-full`}>{by.name}</button>)}
              </div>
            </div>
          </div>
          <div className="relative">
            <input ref={inputRef} value={searchBlog} onChange={(e) => setSearchBlog(e.target.value)} type="text" name="" placeholder="Search..." className="py-2 px-4 rounded transition-all duration-300 bg-transparent outline-0 border border-tertiary focus:border-accent w-full" />
            <div onClick={() => setSearchBlog("")}>
              <DynamicSvgIcon name="refresh" className="w-5 absolute right-2 top-2 cursor-pointer hover:rotate-45 transition-all active:scale-95" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap cursor-pointer">
            {/* {isLoading && <BlogCategoriesSkeleton />} */}
            {isLoading && blogCategories.data.map((cat: any) => <button disabled={(!blog.data.length && cat.attributes.title != currentCategory) || (categoriesInclude.length && !categoriesInclude.includes(cat.attributes.title))} onClick={() => filterHandler(cat)} className={`py-1 rounded px-2 ${activeCategories.includes(cat.attributes.title) && blog.data.length ? "bg-accent text-black" : !blog.data.length && cat.attributes.title == currentCategory ? "bg-accent text-black" : "bg-line"} ${!blog.data.length && cat.attributes.title != currentCategory ? "opacity-50 cursor-not-allowed" : categoriesInclude.length && !categoriesInclude.includes(cat.attributes.title) && "opacity-50 cursor-not-allowed"}`}>{cat.attributes.title}</button>)}        
          </div>
        </div>
        {!isLoading && !blog.data.length && <p className="w-full text-center mt-32 text-xl font-semibold">OOPS! THE BLOG DOESN'T YET EXIST, IT'S COMING SOON...</p>}
        {/* {isLoading && <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"><BlogSkeleton /></div>} */}
        {isLoading && (
          <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
            {blog.data.map((blog: any, index: number) => {
              return (
                <div className="border border-line rounded hover:-translate-y-2 transition-all duration-300 ">
                  <Link href={`blog/${blog.attributes.slug}`} className="rounded overflow-hidden cursor-pointer">
                    <div className="relative">
                        <Image src={blog.attributes.image.data.attributes.formats.medium.url} width={blog.attributes.image.data.attributes.formats.medium.width} height={blog.attributes.image.data.attributes.formats.medium.height} alt="image" placeholder="blur" blurDataURL={blog.attributes.image.data.attributes.placeholder} />
                        <div className="absolute z-10 right-2 bottom-2 flex gap-2 flex-wrap">
                          {blog.attributes.blog_categories.data.map((cat: any) => <div className={`rounded py-1 px-2 bg-line ${activeCategories.includes(cat.attributes.title) ? "text-accent" : "text-secondary"}`}>{cat.attributes.title}</div>)}
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
                  </Link>
                </div>
              )
            })}
          </div>
        )}
    </>
    )

}

export default BlogComponent