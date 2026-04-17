'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import type { Destination } from '@/lib/types'

interface ComparisonChartProps {
  destinations: Destination[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function ComparisonChart({ destinations }: ComparisonChartProps) {
  const budgetData = useMemo(() => {
    return destinations.map((d, index) => ({
      name: d.name.length > 15 ? d.name.substring(0, 15) + '...' : d.name,
      budget: d.average_budget_per_day || 0,
      fill: COLORS[index % COLORS.length],
    }))
  }, [destinations])

  const ratingData = useMemo(() => {
    return destinations.map((d, index) => ({
      name: d.name.length > 15 ? d.name.substring(0, 15) + '...' : d.name,
      rating: d.rating,
      reviews: d.review_count,
      fill: COLORS[index % COLORS.length],
    }))
  }, [destinations])

  const radarData = useMemo(() => {
    const metrics = [
      { key: 'rating', label: 'Rating', max: 5 },
      { key: 'activities', label: 'Activities', max: 10 },
      { key: 'affordability', label: 'Affordability', max: 5 },
      { key: 'popularity', label: 'Popularity', max: 5 },
    ]

    return metrics.map((metric) => {
      const point: Record<string, string | number> = { metric: metric.label }

      destinations.forEach((d) => {
        let value = 0
        switch (metric.key) {
          case 'rating':
            value = d.rating
            break
          case 'activities':
            value = Math.min(d.activities.length, 10)
            break
          case 'affordability':
            // Inverse of budget (lower budget = higher affordability)
            const budget = d.average_budget_per_day || 5000
            value = Math.max(5 - (budget / 2000), 1)
            break
          case 'popularity':
            // Based on review count
            value = Math.min(d.review_count / 20, 5)
            break
        }
        point[d.name] = Number(value.toFixed(1))
      })

      return point
    })
  }, [destinations])

  const activitiesData = useMemo(() => {
    return destinations.map((d, index) => ({
      name: d.name.length > 15 ? d.name.substring(0, 15) + '...' : d.name,
      activities: d.activities.length,
      highlights: d.highlights.length,
      fill: COLORS[index % COLORS.length],
    }))
  }, [destinations])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Budget Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daily Budget Comparison (PHP)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`PHP ${value.toLocaleString()}`, 'Budget']}
                />
                <Bar dataKey="budget" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Rating Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rating Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'rating') return [value.toFixed(1), 'Rating']
                    return [value, 'Reviews']
                  }}
                />
                <Bar dataKey="rating" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart - Overall Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="metric"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 5]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                />
                {destinations.map((d, index) => (
                  <Radar
                    key={d.id}
                    name={d.name}
                    dataKey={d.name}
                    stroke={COLORS[index % COLORS.length]}
                    fill={COLORS[index % COLORS.length]}
                    fillOpacity={0.2}
                  />
                ))}
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Activities & Highlights Count */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activities & Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activitiesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="activities" name="Activities" fill="#0088FE" radius={[4, 4, 0, 0]} />
                <Bar dataKey="highlights" name="Highlights" fill="#00C49F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
