import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  LabelList,
} from 'recharts'
import type { ChartConfig } from '../lib/chapters'

const COLORS = {
  primary: '#008751',
  charts: ['#008751', '#eab308', '#3b82f6', '#ef4444', '#8b5cf6', '#f97316'],
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
  unit?: string
}

function CustomTooltip({ active, payload, label, unit }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg text-sm">
        <p className="font-bold text-gray-800 mb-1">{label}</p>
        {payload.map((entry, index) => {
          const textStyle = { color: entry.color }
          const dotStyle = { backgroundColor: entry.color }
          return (
            <p
              key={index}
              className="flex items-center space-x-2"
              style={textStyle}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={dotStyle}
              />
              <span>
                {entry.name}: <b>{entry.value}{unit}</b>
              </span>
            </p>
          )
        })}
      </div>
    )
  }
  return null
}

interface ChartRendererProps {
  config: ChartConfig
}

export function ChartRenderer({ config }: ChartRendererProps) {
  if (!config) return null

  const unit = config.unit !== undefined ? config.unit : '%'
  const domain = config.domain || [0, 100]

  const ChartWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-6 border-l-4 border-green-500 pl-3">
        {config.title}
      </h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  )

  if (config.type === 'bar') {
    return (
      <ChartWrapper>
        <BarChart
          data={config.data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            dy={10}
            interval={0}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={domain}
            tickFormatter={(val) => `${val}${unit}`}
            width={40}
          />
          <Tooltip
            content={<CustomTooltip unit={unit} />}
            cursor={{ fill: '#f0fdf4' }}
          />
          <Bar
            dataKey="value"
            fill={config.color || COLORS.primary}
            radius={[4, 4, 0, 0]}
            barSize={50}
            animationDuration={1000}
          >
            <LabelList
              dataKey="value"
              position="top"
              formatter={(val: number) => `${val}${unit}`}
              style={{ fill: '#4b5563', fontSize: '12px', fontWeight: 'bold' }}
            />
          </Bar>
        </BarChart>
      </ChartWrapper>
    )
  }

  if (config.type === 'line') {
    return (
      <ChartWrapper>
        <LineChart
          data={config.data}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={domain}
            tickFormatter={(val) => `${val}${unit}`}
            width={40}
          />
          <Tooltip content={<CustomTooltip unit={unit} />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={config.color || COLORS.primary}
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />
        </LineChart>
      </ChartWrapper>
    )
  }

  if (config.type === 'pie') {
    return (
      <ChartWrapper>
        <PieChart>
          <Pie
            data={config.data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
            animationDuration={1000}
          >
            {config.data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS.charts[index % COLORS.charts.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ChartWrapper>
    )
  }

  return null
}
