'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Hotel, Plane, Camera, Utensils, Clock, DollarSign } from 'lucide-react'
import type { Destination, ItineraryItem } from '@/lib/types'

interface BudgetSummaryProps {
  items: ItineraryItem[]
  numberOfDays: number
  destinations: Destination[]
}

const categoryConfig = {
  accommodation: { label: 'Accommodation', icon: Hotel, color: 'bg-blue-500' },
  transportation: { label: 'Transportation', icon: Plane, color: 'bg-purple-500' },
  activity: { label: 'Activities', icon: Camera, color: 'bg-green-500' },
  meal: { label: 'Meals', icon: Utensils, color: 'bg-orange-500' },
  free_time: { label: 'Free Time', icon: Clock, color: 'bg-gray-500' },
}

export function BudgetSummary({ items, numberOfDays, destinations }: BudgetSummaryProps) {
  const breakdown = useMemo(() => {
    const result: Record<string, number> = {
      accommodation: 0,
      transportation: 0,
      activity: 0,
      meal: 0,
      free_time: 0,
    }

    items.forEach((item) => {
      if (item.activity_type && result[item.activity_type] !== undefined) {
        result[item.activity_type] += item.estimated_cost
      }
    })

    return result
  }, [items])

  const totalBudget = useMemo(() => {
    return Object.values(breakdown).reduce((sum, val) => sum + val, 0)
  }, [breakdown])

  const estimatedDailyBudget = useMemo(() => {
    const avgBudget = destinations.reduce((sum, d) => {
      return sum + (d.average_budget_per_day || 0)
    }, 0)
    return destinations.length > 0 ? avgBudget / destinations.length : 0
  }, [destinations])

  const suggestedTotal = estimatedDailyBudget * numberOfDays

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5 text-primary" />
          Budget Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Budget */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Total Estimated Budget</p>
          <p className="text-3xl font-bold text-foreground">
            PHP {totalBudget.toLocaleString()}
          </p>
          {numberOfDays > 0 && (
            <p className="text-sm text-muted-foreground">
              ~PHP {Math.round(totalBudget / numberOfDays).toLocaleString()}/day
            </p>
          )}
        </div>

        {/* Suggested Budget */}
        {suggestedTotal > 0 && (
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Suggested budget</span>
              <span className="font-medium text-foreground">
                PHP {suggestedTotal.toLocaleString()}
              </span>
            </div>
            <Progress
              value={suggestedTotal > 0 ? (totalBudget / suggestedTotal) * 100 : 0}
              className="mt-2 h-2"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {totalBudget <= suggestedTotal
                ? `PHP ${(suggestedTotal - totalBudget).toLocaleString()} under budget`
                : `PHP ${(totalBudget - suggestedTotal).toLocaleString()} over suggested`}
            </p>
          </div>
        )}

        {/* Category Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Breakdown by Category</h4>
          {Object.entries(breakdown).map(([category, amount]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig]
            const percentage = totalBudget > 0 ? (amount / totalBudget) * 100 : 0
            const Icon = config.icon

            return (
              <div key={category} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded ${config.color}`}
                    >
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-muted-foreground">{config.label}</span>
                  </div>
                  <span className="font-medium text-foreground">
                    PHP {amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={percentage} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Per Day Breakdown */}
        {numberOfDays > 0 && items.length > 0 && (
          <div className="border-t border-border pt-4">
            <h4 className="mb-3 text-sm font-medium text-foreground">Daily Breakdown</h4>
            <div className="space-y-2">
              {Array.from({ length: numberOfDays }, (_, i) => i + 1).map((day) => {
                const dayItems = items.filter((item) => item.day_number === day)
                const dayTotal = dayItems.reduce((sum, item) => sum + item.estimated_cost, 0)

                return (
                  <div key={day} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Day {day}</span>
                    <span className="font-medium text-foreground">
                      PHP {dayTotal.toLocaleString()}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {items.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Add activities to see budget breakdown
          </p>
        )}
      </CardContent>
    </Card>
  )
}
