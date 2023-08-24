import { getTopArtist } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.search;
    const response = await getTopArtist(query);

    const { items } = await response.json();
    const artists = items.map((item: any) => ({
        name: item.name,
        songUrl: item.external_urls.spotify,
        genres: item.genres.map((genre: any) => genre).join(", "),
        imageUrl: item.images[0].url
    }))

    return NextResponse.json({
        artists
    })
}