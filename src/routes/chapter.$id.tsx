import { createFileRoute, notFound } from '@tanstack/react-router'
import { Icon } from '../components/Icon'
import { ChartRenderer } from '../components/ChartRenderer'
import { getChapter } from '../lib/chapters'
import type { Chapter } from '../lib/chapters'

export const Route = createFileRoute('/chapter/$id')({
  loader: ({ params }) => {
    const id = parseInt(params.id, 10)
    const chapter = getChapter(id)
    if (!chapter) {
      throw notFound()
    }
    return chapter
  },
  component: ChapterView,
})

function ChapterView() {
  const chapter = Route.useLoaderData() as Chapter

  return (
    <div className="space-y-8 fade-in">
      {/* Header Card */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 border-l-8 border-l-green-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-green-900">
          <Icon name={chapter.icon} size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Chapter {chapter.id}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {chapter.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            {chapter.intro}
          </p>
        </div>

        {/* Subsections List */}
        {chapter.subsections && chapter.subsections.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Key Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {chapter.subsections.map((sub, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 rounded-md bg-gray-50 text-gray-600 text-sm font-medium border border-gray-200"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Highlights Grid */}
      {chapter.highlights && chapter.highlights.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chapter.highlights.map((h, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center hover:border-green-300 transition-colors"
            >
              <p className="text-3xl font-extrabold text-green-700">{h.value}</p>
              <p className="text-xs font-semibold text-gray-500 uppercase mt-1">
                {h.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Charts Section */}
      {chapter.charts && chapter.charts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {chapter.charts.map((chartConfig, idx) => (
            <ChartRenderer key={idx} config={chartConfig} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
          <Icon name="Info" size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-500">
            No charts available for this chapter
          </h3>
          <p className="text-gray-400">
            Refer to the full PDF report for detailed tables.
          </p>
        </div>
      )}
    </div>
  )
}
