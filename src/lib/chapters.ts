import type { IconName } from '../components/Icon'

// Chapter 1
import chapter1Metadata from '../data/chapters/1/metadata.json'
import chapter1Chart1 from '../data/chapters/1/survey-response-rates.json'

// Chapter 2
import chapter2Metadata from '../data/chapters/2/metadata.json'
import chapter2Chart1 from '../data/chapters/2/electricity-by-residence.json'
import chapter2Chart2 from '../data/chapters/2/population-age-structure.json'
import chapter2Chart3 from '../data/chapters/2/clean-fuels-reliance.json'

// Chapter 3
import chapter3Metadata from '../data/chapters/3/metadata.json'
import chapter3Chart1 from '../data/chapters/3/educational-attainment.json'
import chapter3Chart2 from '../data/chapters/3/internet-usage-by-wealth.json'

// Chapter 4
import chapter4Metadata from '../data/chapters/4/metadata.json'
import chapter4Chart1 from '../data/chapters/4/marital-status-distribution.json'
import chapter4Chart2 from '../data/chapters/4/median-age-first-intercourse.json'

// Chapter 5
import chapter5Metadata from '../data/chapters/5/metadata.json'
import chapter5Chart1 from '../data/chapters/5/tfr-by-zone.json'
import chapter5Chart2 from '../data/chapters/5/fertility-trends.json'

// Chapter 6
import chapter6Metadata from '../data/chapters/6/metadata.json'
import chapter6Chart1 from '../data/chapters/6/fertility-planning-status.json'
import chapter6Chart2 from '../data/chapters/6/ideal-family-size-by-wealth.json'

// Chapter 7
import chapter7Metadata from '../data/chapters/7/metadata.json'
import chapter7Chart1 from '../data/chapters/7/contraceptive-use-mix.json'
import chapter7Chart2 from '../data/chapters/7/source-of-modern-methods.json'

// Chapter 8
import chapter8Metadata from '../data/chapters/8/metadata.json'
import chapter8Chart1 from '../data/chapters/8/childhood-mortality-rates.json'

// Chapter 9
import chapter9Metadata from '../data/chapters/9/metadata.json'
import chapter9Chart1 from '../data/chapters/9/place-of-delivery.json'
import chapter9Chart2 from '../data/chapters/9/delivery-assistance.json'

// Chapter 10
import chapter10Metadata from '../data/chapters/10/metadata.json'
import chapter10Chart1 from '../data/chapters/10/vaccination-coverage.json'
import chapter10Chart2 from '../data/chapters/10/treatment-seeking.json'

// Chapter 11
import chapter11Metadata from '../data/chapters/11/metadata.json'
import chapter11Chart1 from '../data/chapters/11/nutritional-status.json'
import chapter11Chart2 from '../data/chapters/11/breastfeeding-practices.json'

// Chapter 12
import chapter12Metadata from '../data/chapters/12/metadata.json'
import chapter12Chart1 from '../data/chapters/12/itn-ownership-vs-usage.json'
import chapter12Chart2 from '../data/chapters/12/source-of-itns.json'

// Chapter 13
import chapter13Metadata from '../data/chapters/13/metadata.json'
import chapter13Chart1 from '../data/chapters/13/prevention-knowledge.json'

// Chapter 14
import chapter14Metadata from '../data/chapters/14/metadata.json'
import chapter14Chart1 from '../data/chapters/14/disability-by-domain.json'

// Chapter 15
import chapter15Metadata from '../data/chapters/15/metadata.json'
import chapter15Chart1 from '../data/chapters/15/decision-making.json'

// Chapter 16
import chapter16Metadata from '../data/chapters/16/metadata.json'
import chapter16Chart1 from '../data/chapters/16/sanitation-facilities.json'

// Chapter 17
import chapter17Metadata from '../data/chapters/17/metadata.json'
import chapter17Chart1 from '../data/chapters/17/experience-of-violence.json'

// Chapter 18
import chapter18Metadata from '../data/chapters/18/metadata.json'
import chapter18Chart1 from '../data/chapters/18/fgm-prevalence-by-age.json'

// Chapter 19
import chapter19Metadata from '../data/chapters/19/metadata.json'
import chapter19Chart1 from '../data/chapters/19/covid-awareness-action.json'

export interface ChartDataPoint {
  name: string
  value: number
}

export interface ChartConfig {
  title: string
  type: 'bar' | 'line' | 'pie'
  data: ChartDataPoint[]
  color?: string
  unit?: string
  domain?: [number, number]
}

export interface ChapterHighlight {
  label: string
  value: string
}

export interface ChapterMetadata {
  id: number
  title: string
  icon: IconName
  intro: string
  subsections: string[]
  highlights: ChapterHighlight[]
}

export interface Chapter extends ChapterMetadata {
  charts: ChartConfig[]
}

const chaptersData: Record<number, Chapter> = {
  1: {
    ...(chapter1Metadata as ChapterMetadata),
    charts: [chapter1Chart1 as ChartConfig],
  },
  2: {
    ...(chapter2Metadata as ChapterMetadata),
    charts: [
      chapter2Chart1 as ChartConfig,
      chapter2Chart2 as ChartConfig,
      chapter2Chart3 as ChartConfig,
    ],
  },
  3: {
    ...(chapter3Metadata as ChapterMetadata),
    charts: [chapter3Chart1 as ChartConfig, chapter3Chart2 as ChartConfig],
  },
  4: {
    ...(chapter4Metadata as ChapterMetadata),
    charts: [chapter4Chart1 as ChartConfig, chapter4Chart2 as ChartConfig],
  },
  5: {
    ...(chapter5Metadata as ChapterMetadata),
    charts: [chapter5Chart1 as ChartConfig, chapter5Chart2 as ChartConfig],
  },
  6: {
    ...(chapter6Metadata as ChapterMetadata),
    charts: [chapter6Chart1 as ChartConfig, chapter6Chart2 as ChartConfig],
  },
  7: {
    ...(chapter7Metadata as ChapterMetadata),
    charts: [chapter7Chart1 as ChartConfig, chapter7Chart2 as ChartConfig],
  },
  8: {
    ...(chapter8Metadata as ChapterMetadata),
    charts: [chapter8Chart1 as ChartConfig],
  },
  9: {
    ...(chapter9Metadata as ChapterMetadata),
    charts: [chapter9Chart1 as ChartConfig, chapter9Chart2 as ChartConfig],
  },
  10: {
    ...(chapter10Metadata as ChapterMetadata),
    charts: [chapter10Chart1 as ChartConfig, chapter10Chart2 as ChartConfig],
  },
  11: {
    ...(chapter11Metadata as ChapterMetadata),
    charts: [chapter11Chart1 as ChartConfig, chapter11Chart2 as ChartConfig],
  },
  12: {
    ...(chapter12Metadata as ChapterMetadata),
    charts: [chapter12Chart1 as ChartConfig, chapter12Chart2 as ChartConfig],
  },
  13: {
    ...(chapter13Metadata as ChapterMetadata),
    charts: [chapter13Chart1 as ChartConfig],
  },
  14: {
    ...(chapter14Metadata as ChapterMetadata),
    charts: [chapter14Chart1 as ChartConfig],
  },
  15: {
    ...(chapter15Metadata as ChapterMetadata),
    charts: [chapter15Chart1 as ChartConfig],
  },
  16: {
    ...(chapter16Metadata as ChapterMetadata),
    charts: [chapter16Chart1 as ChartConfig],
  },
  17: {
    ...(chapter17Metadata as ChapterMetadata),
    charts: [chapter17Chart1 as ChartConfig],
  },
  18: {
    ...(chapter18Metadata as ChapterMetadata),
    charts: [chapter18Chart1 as ChartConfig],
  },
  19: {
    ...(chapter19Metadata as ChapterMetadata),
    charts: [chapter19Chart1 as ChartConfig],
  },
}

export function getAllChapters(): ChapterMetadata[] {
  return Object.values(chaptersData).map(({ charts: _, ...metadata }) => metadata)
}

export function getChapter(id: number): Chapter | undefined {
  return chaptersData[id]
}

export function getChapterMetadata(id: number): ChapterMetadata | undefined {
  const chapter = chaptersData[id]
  if (!chapter) return undefined
  const { charts: _, ...metadata } = chapter
  return metadata
}

export function getChapterCharts(id: number): ChartConfig[] {
  return chaptersData[id]?.charts ?? []
}

// For the landing page regional fertility chart
export const regionalFertilityData = chapter5Chart1 as ChartConfig
