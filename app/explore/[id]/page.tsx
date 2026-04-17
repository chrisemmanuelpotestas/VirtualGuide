import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/lib/supabase/server'
import {
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Clock,
  Plane,
  Bus,
  Ship,
  Hotel,
  Lightbulb,
  Activity,
  ArrowLeft,
  Plus,
} from 'lucide-react'
import type { Destination, Accommodation, Transportation } from '@/lib/types'

const transportIcons: Record<string, typeof Plane> = {
  flight: Plane,
  bus: Bus,
  ferry: Ship,
  van: Bus,
  private_car: Bus,
  tricycle: Bus,
  jeepney: Bus,
}

const accommodationTypes: Record<string, string> = {
  hotel: 'Hotel',
  resort: 'Resort',
  hostel: 'Hostel',
  homestay: 'Homestay',
  airbnb: 'Airbnb',
  glamping: 'Glamping',
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [destinationResult, accommodationsResult, transportationResult] = await Promise.all([
    supabase.from('destinations').select('*').eq('id', id).single(),
    supabase.from('accommodations').select('*').eq('destination_id', id),
    supabase.from('transportation').select('*').eq('destination_id', id),
  ])

  if (destinationResult.error || !destinationResult.data) {
    notFound()
  }

  const destination = destinationResult.data as Destination
  const accommodations = (accommodationsResult.data || []) as Accommodation[]
  const transportation = (transportationResult.data || []) as Transportation[]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[300px] w-full">
        <Image
          src={destination.image_url}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mx-auto max-w-7xl">
            <Button variant="ghost" size="sm" asChild className="mb-4 text-white hover:bg-white/20 hover:text-white">
              <Link href="/explore">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Explore
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* Header Info */}
        <div className="-mt-16 relative z-10 mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge className="mb-3 capitalize">{destination.category}</Badge>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{destination.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {destination.province}, {destination.region}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {destination.rating.toFixed(1)} ({destination.review_count} reviews)
                </span>
                {destination.best_time_to_visit && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Best: {destination.best_time_to_visit}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <Link href={`/planner?destination=${destination.id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Itinerary
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/compare?destinations=${destination.id}`}>Compare</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="travel">Getting There</TabsTrigger>
                <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">About</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {destination.long_description || destination.description}
                    </p>
                  </div>

                  {destination.highlights.length > 0 && (
                    <div>
                      <h2 className="mb-3 text-xl font-semibold text-foreground">Highlights</h2>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight) => (
                          <Badge key={highlight} variant="secondary">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {destination.travel_tips.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Lightbulb className="h-5 w-5 text-amber-500" />
                          Travel Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {destination.travel_tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="activities" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Things to Do</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {destination.activities.map((activity) => (
                      <Card key={activity}>
                        <CardContent className="flex items-center gap-3 p-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Activity className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{activity}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="travel" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Transportation Options</h2>
                  {transportation.length === 0 ? (
                    <p className="text-muted-foreground">No transportation information available.</p>
                  ) : (
                    <div className="space-y-4">
                      {transportation.map((transport) => {
                        const Icon = transportIcons[transport.type] || Bus
                        return (
                          <Card key={transport.id}>
                            <CardContent className="flex items-start gap-4 p-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                <Icon className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-foreground capitalize">
                                    {transport.type.replace('_', ' ')} from {transport.from_location}
                                  </h3>
                                  {transport.estimated_cost && (
                                    <span className="font-semibold text-primary">
                                      PHP {transport.estimated_cost.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                  {transport.duration_hours && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" />
                                      {transport.duration_hours} hours
                                    </span>
                                  )}
                                  {transport.frequency && <span>{transport.frequency}</span>}
                                </div>
                                {transport.notes && (
                                  <p className="mt-2 text-sm text-muted-foreground">{transport.notes}</p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="accommodation" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Where to Stay</h2>
                  {accommodations.length === 0 ? (
                    <p className="text-muted-foreground">No accommodation information available.</p>
                  ) : (
                    <div className="space-y-4">
                      {accommodations.map((accommodation) => (
                        <Card key={accommodation.id}>
                          <CardContent className="flex items-start gap-4 p-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                              <Hotel className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-foreground">{accommodation.name}</h3>
                                <span className="font-semibold text-primary">
                                  PHP {accommodation.price_per_night.toLocaleString()}/night
                                </span>
                              </div>
                              <div className="mt-1 flex items-center gap-2">
                                <Badge variant="secondary">
                                  {accommodationTypes[accommodation.type]}
                                </Badge>
                                {accommodation.rating > 0 && (
                                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                    {accommodation.rating.toFixed(1)}
                                  </span>
                                )}
                              </div>
                              {accommodation.amenities.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {accommodation.amenities.map((amenity) => (
                                    <Badge key={amenity} variant="outline" className="text-xs">
                                      {amenity}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Budget Estimate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Daily budget</span>
                    <span className="text-xl font-semibold text-foreground">
                      {destination.average_budget_per_day
                        ? `${destination.currency} ${destination.average_budget_per_day.toLocaleString()}`
                        : 'N/A'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Includes basic accommodation, meals, transportation, and activities.
                  </p>
                </div>
              </CardContent>
            </Card>

            {destination.latitude && destination.longitude && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <div className="text-center text-sm text-muted-foreground">
                      <MapPin className="mx-auto mb-2 h-8 w-8" />
                      <p>Coordinates:</p>
                      <p className="font-mono text-xs">
                        {destination.latitude.toFixed(4)}, {destination.longitude.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" asChild>
                  <Link href={`/planner?destination=${destination.id}`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Itinerary
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/compare?destinations=${destination.id}`}>Compare with Others</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
