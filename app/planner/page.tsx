'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ItineraryBuilder } from '@/components/itinerary-builder'
import { DestinationSelector } from '@/components/destination-selector'
import { BudgetSummary } from '@/components/budget-summary'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { createClient } from '@/lib/supabase/client'
import { CalendarIcon, Save, Share2, Download } from 'lucide-react'
import { format, differenceInDays, addDays } from 'date-fns'
import type { Destination, ItineraryItem } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ItineraryData {
  title: string
  description: string
  startDate: Date | undefined
  endDate: Date | undefined
  items: ItineraryItem[]
}

function PlannerContent() {
  const searchParams = useSearchParams()
  const destinationId = searchParams.get('destination')

  const [destinations, setDestinations] = useState<Destination[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [itinerary, setItinerary] = useState<ItineraryData>({
    title: '',
    description: '',
    startDate: undefined,
    endDate: undefined,
    items: [],
  })

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

        // If a destination ID was passed, add it to selected
        if (destinationId && data) {
          const found = data.find((d) => d.id === destinationId)
          if (found) {
            setSelectedDestinations([found])
          }
        }
      }
      setLoading(false)
    }

    fetchDestinations()
  }, [destinationId])

  const numberOfDays =
    itinerary.startDate && itinerary.endDate
      ? differenceInDays(itinerary.endDate, itinerary.startDate) + 1
      : 0

  const handleAddDestination = (destination: Destination) => {
    if (!selectedDestinations.find((d) => d.id === destination.id)) {
      setSelectedDestinations([...selectedDestinations, destination])
    }
  }

  const handleRemoveDestination = (destinationId: string) => {
    setSelectedDestinations(selectedDestinations.filter((d) => d.id !== destinationId))
    // Also remove items associated with this destination
    setItinerary({
      ...itinerary,
      items: itinerary.items.filter((item) => item.destination_id !== destinationId),
    })
  }

  const handleAddItem = (item: Omit<ItineraryItem, 'id' | 'itinerary_id' | 'created_at'>) => {
    const newItem: ItineraryItem = {
      ...item,
      id: crypto.randomUUID(),
      itinerary_id: '',
      created_at: new Date().toISOString(),
    }
    setItinerary({
      ...itinerary,
      items: [...itinerary.items, newItem],
    })
  }

  const handleUpdateItem = (itemId: string, updates: Partial<ItineraryItem>) => {
    setItinerary({
      ...itinerary,
      items: itinerary.items.map((item) =>
        item.id === itemId ? { ...item, ...updates } : item
      ),
    })
  }

  const handleDeleteItem = (itemId: string) => {
    setItinerary({
      ...itinerary,
      items: itinerary.items.filter((item) => item.id !== itemId),
    })
  }

  const totalBudget = itinerary.items.reduce((sum, item) => sum + (item.estimated_cost || 0), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Main Planner Area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Trip Details */}
        <Card>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Trip Title</label>
              <Input
                placeholder="e.g., Palawan Adventure 2024"
                value={itinerary.title}
                onChange={(e) => setItinerary({ ...itinerary, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                placeholder="Describe your trip..."
                value={itinerary.description}
                onChange={(e) => setItinerary({ ...itinerary, description: e.target.value })}
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'mt-1 w-full justify-start text-left font-normal',
                        !itinerary.startDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {itinerary.startDate
                        ? format(itinerary.startDate, 'PPP')
                        : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={itinerary.startDate}
                      onSelect={(date) =>
                        setItinerary({
                          ...itinerary,
                          startDate: date,
                          endDate:
                            date && itinerary.endDate && date > itinerary.endDate
                              ? addDays(date, 1)
                              : itinerary.endDate,
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'mt-1 w-full justify-start text-left font-normal',
                        !itinerary.endDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {itinerary.endDate ? format(itinerary.endDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={itinerary.endDate}
                      onSelect={(date) => setItinerary({ ...itinerary, endDate: date })}
                      disabled={(date) =>
                        itinerary.startDate ? date < itinerary.startDate : false
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {numberOfDays > 0 && (
              <p className="text-sm text-muted-foreground">
                Trip duration: {numberOfDays} day{numberOfDays !== 1 ? 's' : ''}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Destination Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Selected Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <DestinationSelector
              destinations={destinations}
              selectedDestinations={selectedDestinations}
              onAdd={handleAddDestination}
              onRemove={handleRemoveDestination}
            />
          </CardContent>
        </Card>

        {/* Itinerary Builder */}
        {numberOfDays > 0 && selectedDestinations.length > 0 && (
          <ItineraryBuilder
            numberOfDays={numberOfDays}
            startDate={itinerary.startDate!}
            items={itinerary.items}
            destinations={selectedDestinations}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        )}

        {numberOfDays === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Select your travel dates to start building your itinerary
              </p>
            </CardContent>
          </Card>
        )}

        {numberOfDays > 0 && selectedDestinations.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Add destinations to start building your itinerary
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <BudgetSummary
          items={itinerary.items}
          numberOfDays={numberOfDays}
          destinations={selectedDestinations}
        />

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" disabled={!itinerary.title}>
              <Save className="mr-2 h-4 w-4" />
              Save Itinerary
            </Button>
            <Button variant="outline" className="w-full" disabled={!itinerary.title}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="w-full" disabled={!itinerary.title}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PlannerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Trip Planner</h1>
          <p className="mt-2 text-muted-foreground">
            Create detailed travel itineraries with budget computation and activity scheduling.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Spinner className="h-8 w-8" />
            </div>
          }
        >
          <PlannerContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
