import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Target, 
  Eye, 
  GraduationCap, 
  Users, 
  Code2, 
  Database, 
  Layout, 
  Cloud,
  ArrowRight,
  MapPin,
  Calendar,
  BarChart3,
  BookOpen
} from 'lucide-react'

const teamMembers = [
  { name: 'Team Member 1', role: 'Project Lead / Full Stack Developer' },
  { name: 'Team Member 2', role: 'Backend Developer / Database Admin' },
  { name: 'Team Member 3', role: 'Frontend Developer / UI Designer' },
  { name: 'Team Member 4', role: 'Quality Assurance / Documentation' },
]

const techStack = [
  { 
    icon: Code2, 
    name: 'Next.js 16 & React 19', 
    description: 'Modern frontend framework with server-side rendering' 
  },
  { 
    icon: Database, 
    name: 'Supabase (PostgreSQL)', 
    description: 'Cloud database with real-time capabilities and authentication' 
  },
  { 
    icon: Layout, 
    name: 'Tailwind CSS & shadcn/ui', 
    description: 'Utility-first CSS with accessible component library' 
  },
  { 
    icon: Cloud, 
    name: 'Vercel', 
    description: 'Cloud deployment with edge functions and CDN' 
  },
]

const features = [
  {
    icon: MapPin,
    title: 'Virtual Destination Exploration',
    description: 'Browse and explore Philippine tourist destinations with detailed information, photos, and travel guides.',
  },
  {
    icon: Calendar,
    title: 'Smart Itinerary Planning',
    description: 'Create customized travel itineraries with budget computation, accommodation options, and activity scheduling.',
  },
  {
    icon: BarChart3,
    title: 'Destination Comparison',
    description: 'Compare multiple destinations based on accessibility, cost, cultural significance, and environmental factors.',
  },
  {
    icon: BookOpen,
    title: 'Educational Resources',
    description: 'Access curated travel information aligned with Tourism Management curriculum requirements.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <GraduationCap className="h-4 w-4" />
                <span>Academic Research Project</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                <span className="text-balance">About Virtual Guide</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                A capstone project developed by BSIT 4A students at First City Providential College,
                designed to revolutionize tourism education through technology.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide Tourism Management students with an innovative digital platform that bridges 
                    theoretical knowledge with practical tourism planning skills, enabling them to explore, 
                    analyze, and plan Philippine destinations effectively for their academic and professional growth.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the leading educational tool for tourism students in the Philippines, 
                    fostering a new generation of tourism professionals equipped with modern digital 
                    skills and comprehensive knowledge of Philippine destinations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Key Features
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Comprehensive tools designed for modern tourism education
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="border-0 bg-background">
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

    

       
        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-primary px-8 py-16 text-center sm:px-16">
              <h2 className="text-3xl font-bold text-primary-foreground">
                <span className="text-balance">Ready to explore Philippine destinations?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
                Start your virtual journey today and enhance your tourism planning skills.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/explore">
                    Explore Destinations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
