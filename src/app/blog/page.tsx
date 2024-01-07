import { getNowPlaying } from "@/lib/spotify";
import Layout from "../../components/layout/Layout";
import useSWR from "swr";
import Image from "next/image";
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon";
import convertToMinsRead from "@/utils/convertToMinsRead";
import convertStringToTime from "@/utils/convertStringToTime";
import { useEffect, useState } from "react";
import BlogClient from "./BlogClient";
import DynamicBlurImage from "@/components/images/DynamicBlurImage";

const getBlogs = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[image]=*&populate[blog_categories]=*&sort[0]=createdAt:desc`,
    {
      cache: 'no-store',
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
      // next: { revalidate: 1},
    }
  );
  return await res.json();
};

const getAllCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-categories`, {
    cache: 'force-cache',
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
  })
  return await res.json();
}

const Blog = async () => {
  const data = await Promise.all([getBlogs(), getAllCategories()]);

  return (
    <>
      <div className="overflow-auto h-full sm:px-12 sm:py-10 p-6">
        <BlogClient blogs={data[0]} categories={data[1]} />
      </div>
    </>
  );
};

export default Blog;
