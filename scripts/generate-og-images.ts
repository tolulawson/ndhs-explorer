import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.resolve(__dirname, '../public/og')
const chaptersDir = path.resolve(__dirname, '../src/data/chapters')

// Fetch font
async function loadFont(): Promise<ArrayBuffer> {
  const response = await fetch(
    'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff'
  )
  return response.arrayBuffer()
}

// OG Template - Home
function homeTemplate() {
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

// OG Template - Chapter
function chapterTemplate(chapterId: number, title: string, description: string) {
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
                    description.length > 180
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

async function generateImage(
  template: ReturnType<typeof homeTemplate>,
  outputPath: string,
  fontData: ArrayBuffer
) {
  const svg = await satori(template as React.ReactNode, {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Inter', data: fontData, weight: 400, style: 'normal' }],
  })

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  const pngBuffer = resvg.render().asPng()

  fs.writeFileSync(outputPath, pngBuffer)
}

async function main() {
  console.log('Generating OG images...')

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Load font once
  const fontData = await loadFont()

  // Generate home OG image
  await generateImage(homeTemplate(), path.join(outputDir, 'home.png'), fontData)
  console.log('  ✓ home.png')

  // Get all chapter IDs
  const chapterIds = fs
    .readdirSync(chaptersDir)
    .filter((f) => fs.statSync(path.join(chaptersDir, f)).isDirectory())
    .map((id) => parseInt(id))
    .sort((a, b) => a - b)

  // Generate chapter OG images
  for (const id of chapterIds) {
    const metadataPath = path.join(chaptersDir, String(id), 'metadata.json')
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'))

    await generateImage(
      chapterTemplate(id, metadata.title, metadata.intro),
      path.join(outputDir, `chapter-${id}.png`),
      fontData
    )
    console.log(`  ✓ chapter-${id}.png`)
  }

  console.log(`\nGenerated ${chapterIds.length + 1} OG images`)
}

main()
