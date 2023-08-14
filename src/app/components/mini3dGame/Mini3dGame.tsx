"use client"
import React, { useState } from 'react'
import Spline from "@splinetool/react-spline"

const Mini3dGame = () => {
  const [splineLoading, setSplineLoading] = useState(true);

  return (
    <div>
          {splineLoading && <p className="absolute right-28 lg:right-64 animate-pulse lg:top-72 top-96">Rendering spline...</p>}
          <Spline
          onLoad={() => {
            setSplineLoading(false)
          }}
          scene="https://prod.spline.design/mtpnyKMdEtYOpwXE/scene.splinecode"
          // className="absolute z-0 lg:-top-64 -top-36 scale-[.6] hidden md:block w-max h-max lg:-right-56 cursor-grab active:cursor-grabbing" />
          className="absolute z-0 -top-0 scale-[.85] hidden lg:block w-max h-max lg:-right-[600px]" />
    </div>
  )
}

export default Mini3dGame