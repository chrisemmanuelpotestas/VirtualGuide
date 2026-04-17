'use client'

import { useState, useEffect, useMemo } from 'react'
import { Header } from '@/components/header'
import { SearchFilters } from '@/components/search-filters'
import { DestinationCard } from '@/components/destination-card'
import { Spinner } from '@/components/ui/spinner'
import { createClient } from '@/lib/supabase/client'
import type { Destination, CategoryType } from '@/lib/types'

export default function ExplorePage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 10000])

  useEffect(() => {
    async function fetchDestinations() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('rating', { ascending: false })

      if (error) {
        console.error('Error fetching destinations:', error)
      } else {
        setDestinations(data || [])
      }
      setLoading(false)
    }

    fetchDestinations()
  }, [])

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          destination.name.toLowerCase().includes(query) ||
          destination.description.toLowerCase().includes(query) ||
          destination.region.toLowerCase().includes(query) ||
          destination.province.toLowerCase().includes(query) ||
          destination.activities.some((a) => a.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory && destination.category !== selectedCategory) {
        return false
      }

      // Region filter
      if (selectedRegion && destination.region !== selectedRegion) {
        return false
      }

      // Budget filter
      if (destination.average_budget_per_day) {
        if (
          destination.average_budget_per_day < budgetRange[0] ||
          destination.average_budget_per_day > budgetRange[1]
        ) {
          return false
        }
      }

      return true
    })
  }, [destinations, searchQuery, selectedCategory, selectedRegion, budgetRange])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Explore Destinations</h1>
          <p className="mt-2 text-muted-foreground">
            Discover Philippine tourist destinations for your travel planning and academic research.
          </p>
        </div>

        <div className="mb-8">
          <SearchFilters
            onSearch={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            onRegionChange={setSelectedRegion}
            onBudgetChange={setBudgetRange}
            selectedCategory={selectedCategory}
            selectedRegion={selectedRegion}
            budgetRange={budgetRange}
            searchQuery={searchQuery}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner className="h-8 w-8" />
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 py-20 text-center">
            <p className="text-lg font-medium text-foreground">No destinations found</p>
            <p className="mt-1 text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredDestinations.length} destination
                {filteredDestinations.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
