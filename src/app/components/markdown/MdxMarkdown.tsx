"use client"
import { MDXRemote } from "next-mdx-remote";

type Props = {  
    data: any
}

const MdxMarkdown = ({ data } : Props) => {
  return (
    <div className="text-white">
      <MDXRemote {...data} />
    </div>
  )
}

export default MdxMarkdown