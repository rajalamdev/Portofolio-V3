import Layout from "../../components/layout/Layout"
import fs from "fs/promises"
import path from "path"
import { getPlaiceholder } from "plaiceholder"
import Image from "next/image"
import StaticBlurImage from "@/components/images/StaticBlurImage"

const Projects =  () => {

  return (
    <div>
      <StaticBlurImage src="/me.webp" width={120} height={120} alt="image" />
    </div>
  )
}

export default Projects