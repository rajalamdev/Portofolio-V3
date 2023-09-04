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

const getNowPlayingSpotify = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate[image]=*&sort[0]=createdAt:desc`,
    {
      next: { revalidate: 0 },
      // headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
    }
  );
  return await res.json();
};

const Blog = async () => {
  const data = await getNowPlayingSpotify();

  const getImageUrl = data.data.map((img: any) => img.attributes.image.data.attributes.formats.medium.url)
  const blurImage = getImageUrl.map((img: any) => <DynamicBlurImage src={img} alt="image" width={1000} height={300} />)

  return (
    <>
      <div className="overflow-auto h-full p-12">
        <BlogComponent data={data} blurImage={blurImage} />
      </div>
    </>
  );
};

export default Blog;
