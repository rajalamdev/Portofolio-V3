import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getNowPlaying } from '@/lib/spotify';
 
export async function GET(request: NextRequest, res: NextResponse) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return NextResponse.json({ isPlaying: false }, { status: 200})
  }
 
  const song = await response.json()
  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists.map((_artist:any) => _artist.name).join(', ')
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  return NextResponse.json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  })
}