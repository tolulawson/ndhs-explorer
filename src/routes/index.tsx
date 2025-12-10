import { createFileRoute, Link } from '@tanstack/react-router'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import { Icon } from '../components/Icon'
import { regionalFertilityData } from '../lib/chapters'
import { getBaseUrl, getCanonicalUrl } from '../lib/url'

export const Route = createFileRoute('/')({
  head: () => {
    const baseUrl = getBaseUrl()
    const canonicalUrl = getCanonicalUrl()
    const title =
      'Nigeria DHS 2024 Explorer | Interactive Health Data Visualization'
    const description =
      'Explore comprehensive data on population, health, and nutrition from the Nigeria Demographic and Health Survey 2024. Interactive charts covering fertility, mortality, vaccination, and more.'

    return {
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: canonicalUrl },
        { property: 'og:image', content: `${baseUrl}/og/home.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: `${baseUrl}/og/home.png` },
      ],
      links: [{ rel: 'canonical', href: canonicalUrl }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Nigeria DHS 2024 Explorer',
            url: canonicalUrl,
            description,
            publisher: {
              '@type': 'Organization',
              name: 'National Population Commission (NPC) [Nigeria] and ICF',
            },
          }),
        },
      ],
    }
  },
  component: LandingView,
})

function LandingView() {
  const keyStats = [
    {
      label: 'Households Surveyed',
      value: '42,000',
      icon: 'Home' as const,
      color: 'bg-blue-500',
      sub: 'Nationally Representative',
    },
    {
      label: 'Fertility Rate',
      value: '5.3',
      icon: 'Baby' as const,
      color: 'bg-pink-500',
      sub: 'Children per Woman',
    },
    {
      label: 'Basic Vaccination',
      value: '58%',
      icon: 'Syringe' as const,
      color: 'bg-purple-500',
      sub: 'Children 12-23 mos',
    },
    {
      label: 'U5 Mortality',
      value: '110',
      icon: 'Activity' as const,
      color: 'bg-red-500',
      sub: 'Deaths per 1,000 births',
    },
  ]

  return (
    <div className="space-y-8 fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <Icon name="Activity" size={400} />
        </div>
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 bg-green-800 rounded-full text-xs font-semibold mb-4 border border-green-500">
            OFFICIAL DATA RELEASE
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Nigeria Demographic and
            <br />
            Health Survey 2024
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mb-8 leading-relaxed">
            Explore comprehensive data on population, health, and nutrition from
            the 2024 NDHS. This tool provides interactive access to key
            indicators from all 19 chapters of the final report.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/chapter/$id"
              params={{ id: '1' }}
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-all shadow-lg flex items-center transform hover:-translate-y-1"
            >
              Start Exploring <Icon name="ChevronRight" size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4 hover:shadow-md transition-shadow cursor-default group"
          >
            <div
              className={`${stat.color} p-3 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform`}
            >
              <Icon name={stat.icon} size={24} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm font-semibold text-gray-700">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Fertility Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Regional Disparities: Fertility
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Total Fertility Rate (TFR) by Geopolitical Zone
            </p>
          </div>
          <div className="hidden sm:block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            Chapter 5 Data
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={regionalFertilityData.data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                width={30}
                domain={[0, 8]}
              />
              <Tooltip cursor={{ fill: '#f0fdf4' }} />
              <Bar
                dataKey="value"
                fill="#008751"
                radius={[4, 4, 0, 0]}
                barSize={60}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  style={{ fontWeight: 'bold', fill: '#374151' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
