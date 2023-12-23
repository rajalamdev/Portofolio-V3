"use client"
import React, { useState } from 'react'
import Spline from "@splinetool/react-spline"
import { useAppContext } from '@/context/AppContext';

const Mini3dGame = () => {
  const [splineLoading, setSplineLoading] = useState(true);
  const context = useAppContext();

  return (
    <div className={`hidden ${context.enabled3dSpline ? "lg:block" : "hidden"}`}>
          {splineLoading && <p className="absolute right-28 lg:right-64 animate-pulse lg:top-48 ">Rendering 3d Games...</p>}
          <Spline
          onLoad={() => {
            setSplineLoading(false)
          }}
          scene="https://prod.spline.design/mtpnyKMdEtYOpwXE/scene.splinecode"
          className="absolute z-0 -top-0 w-max h-max lg:-right-[600px]" />
    </div>
  )
}

export default Mini3dGame