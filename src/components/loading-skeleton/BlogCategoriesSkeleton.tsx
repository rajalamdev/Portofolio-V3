"use client"
import { useEffect, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
const BlogCategoriesSkeleton = () => {
   
    return (
        <SkeletonTheme baseColor="var(--line)" highlightColor="var(--tertiary)">
            <Skeleton width={100} height={20} />
            <Skeleton width={110} height={20} />

            <Skeleton width={80} height={20} />
            <Skeleton width={120} height={20} />

            <Skeleton width={100} height={20} />
            <Skeleton width={80} height={20} />

            <Skeleton width={123} height={20} />
            <Skeleton width={90} height={20} />

        </SkeletonTheme>
    )

}

export default BlogCategoriesSkeleton