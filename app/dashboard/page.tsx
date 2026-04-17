import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { 
  MapPin, 
  Calendar, 
  Heart, 
  Plus, 
  ArrowRight,
  Compass,
  Clock,
  Star
} from "lucide-react"
import Image from "next/image"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  // Fetch user's itineraries
  const { data: itineraries } = await supabase
    .from("itineraries")
    .select("*, itinerary_items(count)")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(5)

  // Fetch user's saved destinations
  const { data: savedDestinations } = await supabase
    .from("saved_destinations")
    .select("*, destinations(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(6)

  // Fetch recommended destinations based on preferences
  const { data: recommendations } = await supabase
    .from("destinations")
    .select("*")
    .order("rating", { ascending: false })
    .limit(4)

  const statusColors: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    planned: "bg-primary/10 text-primary",
    completed: "bg-accent/20 text-accent-foreground"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {profile?.full_name || user.email?.split("@")[0]}
          </h1>
          <p className="text-muted-foreground mt-1">
            Continue planning your Philippine adventures
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{itineraries?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Itineraries</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-full bg-accent/20">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{savedDestinations?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Saved Places</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-full bg-chart-3/20">
                <Compass className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {itineraries?.filter(i => i.status === "completed").length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Trips Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Itineraries Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Itineraries</h2>
              <Button asChild size="sm">
                <Link href="/planner">
                  <Plus className="h-4 w-4 mr-2" />
                  New Itinerary
                </Link>
              </Button>
            </div>

            {itineraries && itineraries.length > 0 ? (
              <div className="space-y-4">
                {itineraries.map((itinerary) => (
                  <Card key={itinerary.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{itinerary.title}</h3>
                            <Badge className={statusColors[itinerary.status] || ""}>
                              {itinerary.status}
                            </Badge>
                          </div>
                          {itinerary.description && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                              {itinerary.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {itinerary.start_date && itinerary.end_date && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(itinerary.start_date).toLocaleDateString()} - {new Date(itinerary.end_date).toLocaleDateString()}
                              </span>
                            )}
                            {itinerary.total_budget && (
                              <span className="flex items-center gap-1">
                                PHP {Number(itinerary.total_budget).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/planner?id=${itinerary.id}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-semibold mb-1">No itineraries yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start planning your first Philippine adventure
                  </p>
                  <Button asChild>
                    <Link href="/planner">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Itinerary
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            <div className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
              <div className="grid grid-cols-2 gap-4">
                {recommendations?.map((dest) => (
                  <Link key={dest.id} href={`/explore/${dest.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-32">
                        <Image
                          src={dest.image_url}
                          alt={dest.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <h3 className="text-white font-semibold text-sm">{dest.name}</h3>
                          <div className="flex items-center gap-1 text-white/80 text-xs">
                            <Star className="h-3 w-3 fill-current" />
                            {Number(dest.rating).toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Saved Destinations Sidebar */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Saved Places</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/explore">View All</Link>
              </Button>
            </div>

            {savedDestinations && savedDestinations.length > 0 ? (
              <div className="space-y-3">
                {savedDestinations.map((saved) => (
                  <Link key={saved.id} href={`/explore/${saved.destinations.id}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={saved.destinations.image_url}
                            alt={saved.destinations.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">
                            {saved.destinations.name}
                          </h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {saved.destinations.province}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                  <Heart className="h-8 w-8 text-muted-foreground/50 mb-3" />
                  <h3 className="font-medium text-sm mb-1">No saved places</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Explore destinations and save your favorites
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/explore">Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/explore">
                    <Compass className="h-4 w-4 mr-2" />
                    Explore Destinations
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/compare">
                    <MapPin className="h-4 w-4 mr-2" />
                    Compare Destinations
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/planner">
                    <Calendar className="h-4 w-4 mr-2" />
                    Plan New Trip
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
