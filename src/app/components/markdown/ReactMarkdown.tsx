"use client"
import React, { ReactNode } from 'react'
import ReactMarkdown from "react-markdown";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';

type Props = {
  content: string,
  className: string
}

/** 
--- Note for styling code block ---
passing the className to the Markdown components to apply this style:
line-numbers: add line numbers to code block
disable-highlight: disable the highlight to code block
transparent: make the code block background transparent
**/ 

const Markdown = ({content, className}: Props) => {
  return (
    <ReactMarkdown
        className={`text-[#bbb] ${className}`}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeCodeTitles, rehypePrism]}
    >
      {content}
    </ReactMarkdown>
  )
}

export default Markdown