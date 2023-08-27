import Image from "next/image"
import fs from "fs/promises"
import { getPlaiceholder } from "plaiceholder"

interface ImageAttr {
    src: string,
    width: number,
    height: number,
    alt: string,
    className?: string 
}

const StaticBlurImage = async ({ src, width, height, alt, className }: ImageAttr) => {
  const buffer = await fs.readFile(`./public/me.webp`)  
  const { base64 } = await getPlaiceholder(buffer)
  return (
    <figure>
        <Image 
            src={src}
            width={width}
            height={height}
            alt={alt}
            placeholder="blur"
            blurDataURL={base64}
            className={className}
        />
    </figure>
  )
}

export default StaticBlurImage