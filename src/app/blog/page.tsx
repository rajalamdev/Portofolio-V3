import { getNowPlaying } from "@/lib/spotify";
import Layout from "../../components/layout/Layout";
import useSWR from "swr";
import Image from "next/image";
import DynamicSvgIcon from "@/components/svg/DynamicSvgIcon";
import convertToMinsRead from "@/utils/convertToMinsRead";
import convertStringToTime from "@/utils/convertStringToTime";
import { useEffect, useState } from "react";
import BlogComponent from "./BlogComponent";
import DynamicBlurImage from "@/components/images/DynamicBlurImage";

// const getNowPlayingSpotify = async () => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[image]=*&sort[0]=createdAt:desc`,
//     {
//       next: { revalidate: 0 },
//       headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
//     }
//   );
//   return await res.json();
// };

const Blog = async () => {
  // const data = await getNowPlayingSpotify();


  return (
    <>
      <div className="overflow-auto h-full sm:px-12 sm:py-10 p-6">
        <BlogComponent />
      </div>
    </>
  );
};

export default Blog;
