"use client"
import React, { useState } from 'react'
import Spline from "@splinetool/react-spline"
import { useAppContext } from '@/context/AppContext';

const Mini3dGame = () => {
  const [splineLoading, setSplineLoading] = useState(true);
  const context = useAppContext();

  return (
    <div className={`hidden ${context.enabled3dSpline ? "lg:block" : "hidden"} bg-red-500`}>
          {splineLoading && <p className="absolute right-28 lg:right-64 animate-pulse lg:top-48 ">Rendering 3d Games...</p>}
          <Spline
          onLoad={() => {
            setSplineLoading(false)
          }}
          scene="https://prod.spline.design/mtpnyKMdEtYOpwXE/scene.splinecode"
          className="absolute z-10 w-full h-full -top-0 bottom-0 left-[650px]" />
          {/* className='w-full h-full' /> */}
    </div>
  )
}

export default Mini3dGame