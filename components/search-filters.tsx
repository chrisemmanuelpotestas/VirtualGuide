'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { CATEGORIES, REGIONS, type CategoryType } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SearchFiltersProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: CategoryType | null) => void
  onRegionChange: (region: string | null) => void
  onBudgetChange: (budget: [number, number]) => void
  selectedCategory: CategoryType | null
  selectedRegion: string | null
  budgetRange: [number, number]
  searchQuery: string
}

export function SearchFilters({
  onSearch,
  onCategoryChange,
  onRegionChange,
  onBudgetChange,
  selectedCategory,
  selectedRegion,
  budgetRange,
  searchQuery,
}: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const hasActiveFilters = selectedCategory || selectedRegion || budgetRange[0] > 0 || budgetRange[1] < 10000

  const clearAllFilters = () => {
    onCategoryChange(null)
    onRegionChange(null)
    onBudgetChange([0, 10000])
    onSearch('')
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search destinations, activities, or regions..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(showAdvanced && 'bg-primary/10 border-primary')}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
              !
            </Badge>
          )}
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() =>
              onCategoryChange(selectedCategory === category.value ? null : category.value)
            }
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
              selectedCategory === category.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-foreground hover:bg-muted'
            )}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Region</label>
              <Select
                value={selectedRegion || ''}
                onValueChange={(value) => onRegionChange(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All regions</SelectItem>
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <label className="text-sm font-medium text-foreground">
                Budget per day (PHP {budgetRange[0].toLocaleString()} - {budgetRange[1].toLocaleString()})
              </label>
              <Slider
                value={budgetRange}
                onValueChange={(value) => onBudgetChange(value as [number, number])}
                max={10000}
                min={0}
                step={500}
                className="mt-2"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <Badge variant="secondary" className="gap-1">
                    {CATEGORIES.find((c) => c.value === selectedCategory)?.label}
                    <button onClick={() => onCategoryChange(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedRegion && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedRegion}
                    <button onClick={() => onRegionChange(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
