"use client"
import React, { ReactNode } from 'react'
import ReactMarkdown from "react-markdown";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';

type Props = {
  content: string
}

const Markdown = ({content}: Props) => {
  return (
    <ReactMarkdown
        className="text-[#bbb] line-numbers"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeCodeTitles, rehypePrism]}
    >
      {content}
    </ReactMarkdown>
  )
}

export default Markdown