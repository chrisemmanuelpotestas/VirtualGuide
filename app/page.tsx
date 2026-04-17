import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/header'
import {
  MapPin,
  Calendar,
  BarChart3,
  BookOpen,
  ArrowRight,
  Compass,
  Users,
  GraduationCap,
} from 'lucide-react'

const features = [
  {
    icon: Compass,
    title: 'Virtual Destination Exploration',
    description:
      'Explore Philippine tourist destinations through detailed descriptions, photos, and interactive information.',
  },
  {
    icon: Calendar,
    title: 'Itinerary Planning',
    description:
      'Create and customize travel itineraries with budget computation, accommodation options, and activity scheduling.',
  },
  {
    icon: BarChart3,
    title: 'Destination Analysis',
    description:
      'Compare destinations based on accessibility, cost, cultural significance, and environmental factors.',
  },
  {
    icon: BookOpen,
    title: 'Educational Resources',
    description:
      'Access curated travel information aligned with Tourism Management curriculum requirements.',
  },
]

const destinations = [
  {
    name: 'Boracay Island',
    region: 'Western Visayas',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    category: 'Beach',
  },
  {
    name: 'Banaue Rice Terraces',
    region: 'Cordillera',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600',
    category: 'Cultural',
  },
  {
    name: 'El Nido, Palawan',
    region: 'MIMAROPA',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600',
    category: 'Beach',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1920"
            alt="Philippine beach landscape"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              <GraduationCap className="h-4 w-4" />
              <span>For Tourism Management Students</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="text-balance">Your Virtual Guide to Philippine Tourism</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              An interactive digital platform designed to enhance your itinerary planning and
              destination analysis skills. Explore, plan, and learn with comprehensive travel
              information at your fingertips.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="/explore">
                  Start Exploring
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 text-white hover:bg-white/20 hover:text-white border-white/30">
                <Link href="/planner">Plan Your Trip</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <span className="text-balance">Tools for Modern Tourism Education</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Bridging theoretical knowledge with practical tourism planning skills through
              interactive digital tools.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 bg-muted/50">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Featured Destinations
              </h2>
              <p className="mt-2 text-muted-foreground">
                Explore popular Philippine tourist spots for your academic projects
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/explore">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.name}
                href="/explore"
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {destination.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-white/80">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{destination.region}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild>
              <Link href="/explore">
                View All Destinations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary px-8 py-16 text-center sm:px-16">
            <Users className="mx-auto h-12 w-12 text-primary-foreground/80" />
            <h2 className="mt-6 text-3xl font-bold text-primary-foreground">
              <span className="text-balance">Ready to enhance your tourism planning skills?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              Join fellow Tourism Management students in exploring, planning, and mastering
              destination analysis with Virtual Guide.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/sign-up">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link href="/explore">Browse Destinations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Virtual Guide</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              A research project by BSIT 3A students at First City Providential College
            </p>
            <div className="flex gap-6">
              <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground">
                Explore
              </Link>
              <Link href="/planner" className="text-sm text-muted-foreground hover:text-foreground">
                Plan Trip
              </Link>
              <Link href="/compare" className="text-sm text-muted-foreground hover:text-foreground">
                Compare
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
