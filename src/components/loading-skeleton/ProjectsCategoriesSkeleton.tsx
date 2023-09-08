"use client"
import { useEffect, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
const ProjectsCategoriesSkeleton = () => {
   
    return (
        <SkeletonTheme baseColor="var(--line)" highlightColor="var(--tertiary)">
            <Skeleton width={100} height={25} />
            <Skeleton width={110} height={25} />

            <Skeleton width={80} height={25} />
            <Skeleton width={120} height={25} />

            <Skeleton width={100} height={25} />
            <Skeleton width={80} height={25} />

            <Skeleton width={123} height={25} />
            <Skeleton width={90} height={25} />

            <Skeleton width={80} height={25} />
            <Skeleton width={130} height={25} />
        </SkeletonTheme>
    )

}

export default ProjectsCategoriesSkeleton