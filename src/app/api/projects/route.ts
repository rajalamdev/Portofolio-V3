import { NextResponse } from 'next/server';
import { projects } from '@/constant/projects';

export async function GET() {
  return NextResponse.json({ projects });
}
