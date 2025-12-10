import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { defineEventHandler, getQuery, setHeader } from 'h3'

// Import chapter metadata
import chapter1 from '../../src/data/chapters/1/metadata.json'
import chapter2 from '../../src/data/chapters/2/metadata.json'
import chapter3 from '../../src/data/chapters/3/metadata.json'
import chapter4 from '../../src/data/chapters/4/metadata.json'
import chapter5 from '../../src/data/chapters/5/metadata.json'
import chapter6 from '../../src/data/chapters/6/metadata.json'
import chapter7 from '../../src/data/chapters/7/metadata.json'
import chapter8 from '../../src/data/chapters/8/metadata.json'
import chapter9 from '../../src/data/chapters/9/metadata.json'
import chapter10 from '../../src/data/chapters/10/metadata.json'
import chapter11 from '../../src/data/chapters/11/metadata.json'
import chapter12 from '../../src/data/chapters/12/metadata.json'
import chapter13 from '../../src/data/chapters/13/metadata.json'
import chapter14 from '../../src/data/chapters/14/metadata.json'
import chapter15 from '../../src/data/chapters/15/metadata.json'
import chapter16 from '../../src/data/chapters/16/metadata.json'
import chapter17 from '../../src/data/chapters/17/metadata.json'
import chapter18 from '../../src/data/chapters/18/metadata.json'
import chapter19 from '../../src/data/chapters/19/metadata.json'

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

// OG Template component for Satori (using object syntax)
function OGTemplate({
  type,
  title,
  chapterId,
  description,
}: {
  type: 'home' | 'chapter'
  title?: string
  chapterId?: number
  description?: string
}) {
  if (type === 'home') {
    return {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f8fafc',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '40px 60px',
                background: 'linear-gradient(135deg, #008751 0%, #006b41 100%)',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '18px',
                      color: 'rgba(255,255,255,0.8)',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                    },
                    children: 'Official Data Release',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { fontSize: '20px', color: 'white', fontWeight: 600 },
                    children: 'nigeriastats.com',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '64px',
                      fontWeight: 800,
                      color: '#1e293b',
                      lineHeight: 1.1,
                    },
                    children: 'Nigeria Demographic &',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '64px',
                      fontWeight: 800,
                      color: '#008751',
                      lineHeight: 1.1,
                    },
                    children: 'Health Survey 2024',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      color: '#64748b',
                      marginTop: '24px',
                      maxWidth: '800px',
                    },
                    children:
                      'Interactive data explorer covering fertility, mortality, nutrition, and health indicators across all 36 states + FCT',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', gap: '40px', padding: '0 60px 50px' },
              children: [
                { label: 'Chapters', value: '19' },
                { label: 'Households', value: '42K+' },
                { label: 'States', value: '36 + FCT' },
              ].map((stat) => ({
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column' },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '36px',
                          fontWeight: 700,
                          color: '#008751',
                        },
                        children: stat.value,
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: { fontSize: '16px', color: '#94a3b8' },
                        children: stat.label,
                      },
                    },
                  ],
                },
              })),
            },
          },
        ],
      },
    }
  }

  // Chapter template - clean green background with white text
  return {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #008751 0%, #005a36 100%)',
        fontFamily: 'Inter',
      },
      children: [
        // Top bar with branding
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '40px 60px 0',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.7)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                  },
                  children: 'Nigeria DHS 2024',
                },
              },
              {
                type: 'span',
                props: {
                  style: {
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 500,
                  },
                  children: 'nigeriastats.com',
                },
              },
            ],
          },
        },
        // Main content
        {
          type: 'div',
          props: {
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 60px',
            },
            children: [
              // Chapter badge
              {
                type: 'span',
                props: {
                  style: {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    fontSize: '18px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '24px',
                    alignSelf: 'flex-start',
                  },
                  children: `Chapter ${chapterId}`,
                },
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '72px',
                    fontWeight: 800,
                    color: 'white',
                    lineHeight: 1.1,
                    marginBottom: '24px',
                  },
                  children: title,
                },
              },
              // Description
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '26px',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.5,
                    maxWidth: '900px',
                  },
                  children:
                    description && description.length > 180
                      ? `${description.slice(0, 180)}...`
                      : description,
                },
              },
            ],
          },
        },
      ],
    },
  }
}

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
    fitTo: { mode: 'width', value: 1200 },
  })
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  // Set headers
  setHeader(event, 'Content-Type', 'image/png')
  setHeader(event, 'Cache-Control', 'public, max-age=86400, s-maxage=86400')

  return pngBuffer
})

