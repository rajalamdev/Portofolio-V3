import { getTopArtist } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.search;
    const response = await getTopArtist(query);

    const { items } = await response.json();
    const getBase64 = async (url: string) => {
        const buffer = await fetch(url).then(async (res) => {
            return Buffer.from(await res.arrayBuffer());
        })
        const { base64 } = await getPlaiceholder(buffer);
        return base64;
    }

    const artists = await Promise.all(items.map(async (item: any) =>  {
        const name = item.name;
        const songUrl = item.external_urls.spotify;
        const imageUrl = item.images[0].url;
        const genres = item.genres.map((genre: any) => genre).join(", ");
        const hashImage = await getBase64(imageUrl);

        return {
            name,
            songUrl,
            imageUrl,
            genres,
            hashImage
        }
    }))

    return NextResponse.json({
        artists
    })
}