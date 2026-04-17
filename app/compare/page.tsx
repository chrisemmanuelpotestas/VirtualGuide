'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/components/header'
import { ComparisonChart } from '@/components/comparison-chart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import {
  MapPin,
  Star,
  DollarSign,
  Calendar,
  Activity,
  CheckCircle,
  XCircle,
  Plus,
  X,
  ArrowRight,
} from 'lucide-react'
import type { Destination } from '@/lib/types'
import Link from 'next/link'

function CompareContent() {
  const searchParams = useSearchParams()
  const initialDestination = searchParams.get('destinations')

  const [destinations, setDestinations] = useState<Destination[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDestinations() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name')

      if (error) {
        console.error('Error fetching destinations:', error)
      } else {
        setDestinations(data || [])

        // If initial destination provided
        if (initialDestination && data) {
          const ids = initialDestination.split(',')
          const validIds = ids.filter((id) => data.some((d) => d.id === id))
          setSelectedIds(validIds)
        }
      }
      setLoading(false)
    }

    fetchDestinations()
  }, [initialDestination])

  const selectedDestinations = destinations.filter((d) => selectedIds.includes(d.id))
  const availableDestinations = destinations.filter((d) => !selectedIds.includes(d.id))

  const handleAddDestination = (id: string) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleRemoveDestination = (id: string) => {
    setSelectedIds(selectedIds.filter((i) => i !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Destination Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Destinations to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {selectedDestinations.map((destination) => (
              <div
                key={destination.id}
                className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-2 pr-3"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded">
                  <Image
                    src={destination.image_url}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-foreground">{destination.name}</span>
                <button
                  onClick={() => handleRemoveDestination(destination.id)}
                  className="ml-2 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            {selectedIds.length < 4 && (
              <Select onValueChange={handleAddDestination}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Add destination..." />
                </SelectTrigger>
                <SelectContent>
                  {availableDestinations.map((destination) => (
                    <SelectItem key={destination.id} value={destination.id}>
                      {destination.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          {selectedIds.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">
              Select 2-4 destinations to compare their features, costs, and characteristics.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {selectedDestinations.length >= 2 && (
        <>
          {/* Overview Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {selectedDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={destination.image_url}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute left-3 top-3 capitalize">
                    {destination.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">{destination.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {destination.province}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{destination.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Budget/Day</p>
                      <p className="font-medium">
                        {destination.average_budget_per_day
                          ? `PHP ${destination.average_budget_per_day.toLocaleString()}`
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <Button asChild size="sm" className="mt-4 w-full">
                    <Link href={`/explore/${destination.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Chart */}
          <ComparisonChart destinations={selectedDestinations} />

          {/* Detailed Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 text-left text-sm font-medium text-muted-foreground">
                        Feature
                      </th>
                      {selectedDestinations.map((d) => (
                        <th
                          key={d.id}
                          className="py-3 text-left text-sm font-medium text-foreground"
                        >
                          {d.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 text-sm text-muted-foreground">Region</td>
                      {selectedDestinations.map((d) => (
                        <td key={d.id} className="py-3 text-sm text-foreground">
                          {d.region}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-muted-foreground">Category</td>
                      {selectedDestinations.map((d) => (
                        <td key={d.id} className="py-3 text-sm text-foreground capitalize">
                          {d.category}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-muted-foreground">Rating</td>
                      {selectedDestinations.map((d) => (
                        <td key={d.id} className="py-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-foreground">
                              {d.rating.toFixed(1)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({d.review_count})
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-muted-foreground">Budget/Day</td>
                      {selectedDestinations.map((d) => (
                        <td key={d.id} className="py-3 text-sm font-medium text-primary">
                          {d.average_budget_per_day
                            ? `PHP ${d.average_budget_per_day.toLocaleString()}`
                            : 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-muted-foreground">Best Time to Visit</td>
                      {selectedDestinations.map((d) => (
                        <td key={d.id} className="py-3 text-sm text-foreground">
                          {d.best_time_to_visit || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-muted-foreground">Activities</td>
                      {selectedDestinations.map((d) => (
                        <td key={d.id} className="py-3 text-sm text-foreground">
                          {d.activities.length} activities
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Activities Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Available Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {selectedDestinations.map((destination) => (
                  <div key={destination.id}>
                    <h4 className="mb-3 font-medium text-foreground">{destination.name}</h4>
                    <ul className="space-y-2">
                      {destination.activities.map((activity) => (
                        <li
                          key={activity}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Activity className="h-3.5 w-3.5 text-primary" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Highlights Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Key Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {selectedDestinations.map((destination) => (
                  <div key={destination.id}>
                    <h4 className="mb-3 font-medium text-foreground">{destination.name}</h4>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Action */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
              <div>
                <h3 className="font-semibold text-foreground">Ready to plan your trip?</h3>
                <p className="text-sm text-muted-foreground">
                  Add these destinations to your itinerary planner
                </p>
              </div>
              <Button asChild>
                <Link href={`/planner?destination=${selectedIds[0]}`}>
                  Start Planning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {selectedDestinations.length < 2 && (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Select at least 2 destinations
            </h3>
            <p className="mt-2 text-muted-foreground">
              Choose destinations from the dropdown above to compare their features side by side
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Compare Destinations</h1>
          <p className="mt-2 text-muted-foreground">
            Analyze and compare multiple destinations to make informed travel decisions.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Spinner className="h-8 w-8" />
            </div>
          }
        >
          <CompareContent />
        </Suspense>
      </main>
    </div>
  )
}
