"use client"
import { MDXRemote } from "next-mdx-remote";

type Props = {  
    data: any
}

const MdxMarkdown = ({ data } : Props) => {
  return (
    <>
      <MDXRemote {...data} />
    </>
  )
}

export default MdxMarkdown