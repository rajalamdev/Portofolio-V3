import Image from "next/image"
import { getPlaiceholder } from "plaiceholder"

interface ImageAttr {
    src: string,
    width: number,
    height: number,
    alt: string,
    className?: string 
}

const DynamicBlurImage = async ({ src, width, height, alt, className }: ImageAttr) => {
  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer())
  })  
  
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

export default DynamicBlurImage