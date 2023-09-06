"use client"
import { useEffect, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
const ProjectSkeleton = () => {
    const randomSkeleton = Math.ceil(Math.random() * 6 + 1)
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true)
    }, [])

    return hasMounted && Array(randomSkeleton).fill(0).map(() => {
        return (
            <SkeletonTheme baseColor="var(--line)" highlightColor="var(--tertiary)">
                <div className='w-full mx-auto py-4 border border-line p-4 rounded'>
                    <div className="flex flex-col gap-1">
                        {/* <Skeleton circle width={40} height={40} /> */}
                        <Skeleton width={140} />
                        <Skeleton width={"100%"} />
                        <Skeleton width={"80%"} />
                    </div>
                    <div className='w-full mt-2'>
                        <Skeleton height={180} />
                    </div>
                    <div className='w-full mt-2'>
                        <Skeleton width={80} />
                    </div>
                </div>
            </SkeletonTheme>
        )
    })

}

export default ProjectSkeleton