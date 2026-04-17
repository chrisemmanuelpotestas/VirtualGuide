'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Heart } from 'lucide-react'
import type { Destination } from '@/lib/types'
import { cn } from '@/lib/utils'

interface DestinationCardProps {
  destination: Destination
  isSaved?: boolean
  onToggleSave?: (id: string) => void
  showActions?: boolean
}

const categoryColors: Record<string, string> = {
  beach: 'bg-sky-100 text-sky-800',
  mountain: 'bg-emerald-100 text-emerald-800',
  cultural: 'bg-amber-100 text-amber-800',
  urban: 'bg-slate-100 text-slate-800',
  adventure: 'bg-orange-100 text-orange-800',
  nature: 'bg-green-100 text-green-800',
  historical: 'bg-stone-100 text-stone-800',
}

export function DestinationCard({
  destination,
  isSaved = false,
  onToggleSave,
  showActions = true,
}: DestinationCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={destination.image_url}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {showActions && onToggleSave && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onToggleSave(destination.id)
            }}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm transition-colors hover:bg-white"
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-colors',
                isSaved ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              )}
            />
          </button>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <Badge className={cn('mb-2', categoryColors[destination.category])}>
            {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
          </Badge>
          <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
          <div className="flex items-center gap-1 text-sm text-white/90">
            <MapPin className="h-3.5 w-3.5" />
            <span>{destination.province}, {destination.region}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {destination.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{destination.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">
              ({destination.review_count} reviews)
            </span>
          </div>
          {destination.average_budget_per_day && (
            <span className="text-sm font-medium text-primary">
              {destination.currency} {destination.average_budget_per_day.toLocaleString()}/day
            </span>
          )}
        </div>

        {showActions && (
          <div className="mt-4 flex gap-2">
            <Button asChild className="flex-1" size="sm">
              <Link href={`/explore/${destination.id}`}>View Details</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/planner?destination=${destination.id}`}>Add to Trip</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
