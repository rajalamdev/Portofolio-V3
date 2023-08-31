"use client"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
const SpotifyNowPlayingSkeleton = () => {
    return (
        <SkeletonTheme baseColor="var(--line)" highlightColor="var(--tertiary)">
            <div className='w-full mx-auto p-2 flex gap-2'>
                <div className="w-1/4">
                    <Skeleton height={50} />
                </div>
                <div className="flex-1">
                    <Skeleton width={80} />
                    <Skeleton width={"100%"} />
                    <Skeleton width={"30%"} />
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default SpotifyNowPlayingSkeleton