'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, Plus, X, MapPin, Star } from 'lucide-react'
import type { Destination } from '@/lib/types'

interface DestinationSelectorProps {
  destinations: Destination[]
  selectedDestinations: Destination[]
  onAdd: (destination: Destination) => void
  onRemove: (destinationId: string) => void
}

export function DestinationSelector({
  destinations,
  selectedDestinations,
  onAdd,
  onRemove,
}: DestinationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const filteredDestinations = destinations.filter((destination) => {
    if (!searchQuery) return false
    const query = searchQuery.toLowerCase()
    return (
      destination.name.toLowerCase().includes(query) ||
      destination.province.toLowerCase().includes(query) ||
      destination.region.toLowerCase().includes(query)
    )
  })

  const availableDestinations = filteredDestinations.filter(
    (d) => !selectedDestinations.find((s) => s.id === d.id)
  )

  return (
    <div className="space-y-4">
      {/* Selected Destinations */}
      {selectedDestinations.length > 0 && (
        <div className="flex flex-wrap gap-2">
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
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{destination.name}</p>
                <p className="text-xs text-muted-foreground truncate">{destination.province}</p>
              </div>
              <button
                onClick={() => onRemove(destination.id)}
                className="ml-2 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search destinations to add..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowDropdown(true)
          }}
          onFocus={() => setShowDropdown(true)}
          className="pl-10"
        />

        {/* Dropdown */}
        {showDropdown && searchQuery && (
          <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-lg border border-border bg-card shadow-lg">
            {availableDestinations.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground text-center">
                No destinations found
              </p>
            ) : (
              <ScrollArea className="max-h-64">
                <div className="p-2">
                  {availableDestinations.slice(0, 5).map((destination) => (
                    <button
                      key={destination.id}
                      onClick={() => {
                        onAdd(destination)
                        setSearchQuery('')
                        setShowDropdown(false)
                      }}
                      className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-muted"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded">
                        <Image
                          src={destination.image_url}
                          alt={destination.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{destination.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {destination.province}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {destination.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <Plus className="h-4 w-4 text-primary" />
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  )
}
