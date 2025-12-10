import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { defineEventHandler, getQuery, setHeader } from 'h3'
import { OGTemplate } from '../og-template'

// Import chapter metadata directly
import chapter1 from '../../data/chapters/1/metadata.json'
import chapter2 from '../../data/chapters/2/metadata.json'
import chapter3 from '../../data/chapters/3/metadata.json'
import chapter4 from '../../data/chapters/4/metadata.json'
import chapter5 from '../../data/chapters/5/metadata.json'
import chapter6 from '../../data/chapters/6/metadata.json'
import chapter7 from '../../data/chapters/7/metadata.json'
import chapter8 from '../../data/chapters/8/metadata.json'
import chapter9 from '../../data/chapters/9/metadata.json'
import chapter10 from '../../data/chapters/10/metadata.json'
import chapter11 from '../../data/chapters/11/metadata.json'
import chapter12 from '../../data/chapters/12/metadata.json'
import chapter13 from '../../data/chapters/13/metadata.json'
import chapter14 from '../../data/chapters/14/metadata.json'
import chapter15 from '../../data/chapters/15/metadata.json'
import chapter16 from '../../data/chapters/16/metadata.json'
import chapter17 from '../../data/chapters/17/metadata.json'
import chapter18 from '../../data/chapters/18/metadata.json'
import chapter19 from '../../data/chapters/19/metadata.json'

const chapters: Record<number, typeof chapter1> = {
  1: chapter1,
  2: chapter2,
  3: chapter3,
  4: chapter4,
  5: chapter5,
  6: chapter6,
  7: chapter7,
  8: chapter8,
  9: chapter9,
  10: chapter10,
  11: chapter11,
  12: chapter12,
  13: chapter13,
  14: chapter14,
  15: chapter15,
  16: chapter16,
  17: chapter17,
  18: chapter18,
  19: chapter19,
}

// Fetch font at runtime (Inter from Google Fonts)
async function loadFont(): Promise<ArrayBuffer> {
  const response = await fetch(
    'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff'
  )
  return response.arrayBuffer()
}

let fontData: ArrayBuffer | null = null

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = (query.type as string) || 'home'
  const id = query.id ? parseInt(query.id as string, 10) : undefined

  // Load font if not cached
  if (!fontData) {
    fontData = await loadFont()
  }

  // Get chapter data if needed
  let chapterData = null
  if (type === 'chapter' && id && chapters[id]) {
    chapterData = chapters[id]
  }

  // Generate SVG with Satori
  const svg = await satori(
    OGTemplate({
      type: type as 'home' | 'chapter',
      title: chapterData?.title,
      chapterId: chapterData?.id,
      description: chapterData?.intro,
      highlights: chapterData?.highlights,
    }),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  )

  // Convert SVG to PNG
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  })
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  // Set headers
  setHeader(event, 'Content-Type', 'image/png')
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')

  return pngBuffer
})
