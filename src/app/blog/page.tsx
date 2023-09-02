"use client"
import { getNowPlaying } from "@/lib/spotify"
import Layout from "../../components/layout/Layout"
import useSWR from "swr"
import Image from "next/image"
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon"
import convertToMinsRead from "@/utils/convertToMinsRead"
import convertStringToTime from "@/utils/convertStringToTime"
import { useState } from "react"

// const getNowPlayingSpotify = async () => {
//   const res = await fetch("http://localhost:3000/api/now-playing", { next: { revalidate: 1 } })
//   return await res.json()

// }

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Blog = () => {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[image]=*`, fetcher)

  return (
    <div className="overflow-auto h-full p-12">
      <div className="columns-3 gap-4">
        {!isLoading && data.data.map((blog: any) => {
          return (
            <div className="break-inside-avoid mb-4">
              <div className="rounded overflow-hidden border border-line cursor-pointer">
                <div className="relative">
                  <Image src={blog.attributes.image.data.attributes.formats.large.url} width={1000} height={300} alt="image" />
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
    </div>
  )
}

export default Blog