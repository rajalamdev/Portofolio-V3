"use client";
import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import MusicCode from "./MusicCode.mdx";
import TopArtistSkeleton from "@/components/loading-skeleton/TopArtistSkeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Music = () => {
  const [queryArtistsTimeRange, setQueryArtistsTimeRange] = useState(
    "time_range=short_term"
  );
  const [artistsTimeRange, setArtistsTimeRange] = useState("Last month");

  const {
    data: dataArtists,
    error: errorArtists,
    isLoading: isLoadingArtists,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/top-artist?${queryArtistsTimeRange}&limit=10`,
    fetcher
  );

  function artistsTimeRangeHanlder(e: any) {
    const time = e.target.name;
    switch (time) {
      case "Last month":
        setQueryArtistsTimeRange("time_range=short_term");
        break;
      case "Last 6 months":
        setQueryArtistsTimeRange("time_range=medium_term");
        break;
      case "All time":
        setQueryArtistsTimeRange("time_range=long_term");
        break;
    }
    setArtistsTimeRange(time);
  }

  const timeRange = ["Last month", "Last 6 months", "All time"];

  return (
    <section className="grid grid-cols-2 h-full">
      <div className="border-r border-line overflow-auto">
        <MusicCode />
      </div>
      <div className="overflow-auto px-4 py-4">
        <div>
          <h4 className="text-base font-medium text-secondary">
            //_my-top-artists
          </h4>
          <div className="space-x-4 my-4">
            {timeRange.map((time) => (
              <button
                className={`${
                  artistsTimeRange === time && "bg-accent text-black"
                } border p-2 rounded border-line`}
                name={time}
                onClick={artistsTimeRangeHanlder}
              >
                {time}
              </button>
            ))}
          </div>
          <div>
            {isLoadingArtists && <div><TopArtistSkeleton /></div>}
            {!isLoadingArtists &&
              dataArtists.artists?.map((artist: any, index: number) => {
                return (
                  <a
                    href={artist.songUrl}
                    target="_blank"
                    className="flex gap-4 border-b border-line py-4"
                  >
                    <span className="text-right">{index + 1}</span>
                    <Image
                      src={artist.imageUrl}
                      width={80}
                      height={80}
                      alt="artist image"
                      className="object-cover"
                    />
                    <div className="space-y-2">
                      <h5 className="text-secondary [word-spacing:-4px]">
                        {artist.name}
                      </h5>
                      <p className="[word-spacing:-4px]">{artist.genres}</p>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>
        <div>
          <h4 className="pb-4 mt-6 text-base font-medium text-secondary">
            //_my-top-playlist
          </h4>
          <iframe
            src="https://open.spotify.com/embed/playlist/4pRzrggM6Psa9mTADQWs3m?utm_source=generator"
            width="100%"
            height="380"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Music;
