import type { ChapterHighlight } from '../lib/chapters'

interface OGTemplateProps {
  type: 'home' | 'chapter'
  title?: string
  chapterId?: number
  description?: string
  highlights?: ChapterHighlight[]
}

export function OGTemplate({
  type,
  title,
  chapterId,
  description,
  highlights,
}: OGTemplateProps) {
  if (type === 'home') {
    return (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f8fafc',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '40px 60px',
            background: 'linear-gradient(135deg, #008751 0%, #006b41 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontSize: '18px',
                color: 'rgba(255,255,255,0.8)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Official Data Release
            </span>
          </div>
          <span
            style={{
              fontSize: '20px',
              color: 'white',
              fontWeight: 600,
            }}
          >
            nigeriastats.com
          </span>
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#1e293b',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Nigeria Demographic &
          </h1>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#008751',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Health Survey 2024
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#64748b',
              marginTop: '24px',
              maxWidth: '800px',
            }}
          >
            Interactive data explorer covering fertility, mortality, nutrition,
            and health indicators across all 36 states + FCT
          </p>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            padding: '0 60px 50px',
          }}
        >
          {[
            { label: 'Chapters', value: '19' },
            { label: 'Households', value: '42K+' },
            { label: 'States', value: '36 + FCT' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#008751',
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: '16px', color: '#94a3b8' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Chapter template
  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8fafc',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '32px 60px',
          background: 'linear-gradient(135deg, #008751 0%, #006b41 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 600,
            }}
          >
            NIGERIA DHS 2024
          </span>
        </div>
        <span style={{ fontSize: '18px', color: 'white', fontWeight: 500 }}>
          nigeriastats.com
        </span>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '50px 60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              backgroundColor: '#dcfce7',
              color: '#166534',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '16px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Chapter {chapterId}
          </span>
        </div>

        <h1
          style={{
            fontSize: '56px',
            fontWeight: 800,
            color: '#1e293b',
            lineHeight: 1.2,
            margin: 0,
            marginBottom: '20px',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: '22px',
            color: '#64748b',
            lineHeight: 1.5,
            maxWidth: '900px',
            margin: 0,
          }}
        >
          {description && description.length > 150
            ? `${description.slice(0, 150)}...`
            : description}
        </p>
      </div>

      {/* Highlights Row */}
      {highlights && highlights.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '32px',
            padding: '0 60px 50px',
          }}
        >
          {highlights.slice(0, 4).map((h) => (
            <div
              key={h.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                padding: '20px 28px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
              }}
            >
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#008751',
                }}
              >
                {h.value}
              </span>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>
                {h.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
