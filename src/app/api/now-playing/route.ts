import { NextResponse } from 'next/server'
import { getNowPlaying } from '@/lib/spotify';
import { getPlaiceholder } from 'plaiceholder';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ isPlaying: false }, { status: 200 })
  }

  const song = await response.json()
  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ')
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  const buffer = await fetch(albumImageUrl).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64 } = await getPlaiceholder(buffer);

  return NextResponse.json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
    hashImage: base64
  })
}