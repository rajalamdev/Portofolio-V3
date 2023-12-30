"use client"
import { MDXRemote } from "next-mdx-remote";

type Props = {  
    data: any
}

const MdxMarkdown = ({ data } : Props) => {
  return (
    <div className="overflow-x-hidden colorful prose prose-invert text-[#c9ced3] max-w-none flex">
      <div className="p-8 w-3/4 text-base">
        <MDXRemote {...data} />
      </div>
      <div className="bg-red-500 flex-1">

      </div>
    </div>
  )
}

export default MdxMarkdown