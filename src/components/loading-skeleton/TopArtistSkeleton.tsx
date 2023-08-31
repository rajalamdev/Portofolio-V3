"use client"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
const TopArtistSkeleton = () => {
    return Array(10).fill(0).map(() => {
        return (
            <SkeletonTheme baseColor="var(--line)" highlightColor="var(--tertiary)">
                <div className='w-full mx-auto py-4 border-b border-line p-4 rounded flex gap-2'>
                    <div className="w-24">
                        <Skeleton height={90} />
                    </div>
                    <div className="flex-1">
                        <Skeleton width={80} className="mb-2" />
                        <Skeleton width={"100%"} />
                        <Skeleton width={"80%"} />
                    </div>
                </div>
            </SkeletonTheme>
        )
    })

}

export default TopArtistSkeleton