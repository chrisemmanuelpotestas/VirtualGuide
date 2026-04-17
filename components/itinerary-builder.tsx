'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Plus,
  Hotel,
  Plane,
  Camera,
  Utensils,
  Clock,
  Trash2,
  GripVertical,
  Edit2,
} from 'lucide-react'
import { format, addDays } from 'date-fns'
import type { Destination, ItineraryItem } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ItineraryBuilderProps {
  numberOfDays: number
  startDate: Date
  items: ItineraryItem[]
  destinations: Destination[]
  onAddItem: (item: Omit<ItineraryItem, 'id' | 'itinerary_id' | 'created_at'>) => void
  onUpdateItem: (itemId: string, updates: Partial<ItineraryItem>) => void
  onDeleteItem: (itemId: string) => void
}

const activityTypes = [
  { value: 'accommodation', label: 'Accommodation', icon: Hotel },
  { value: 'transportation', label: 'Transportation', icon: Plane },
  { value: 'activity', label: 'Activity', icon: Camera },
  { value: 'meal', label: 'Meal', icon: Utensils },
  { value: 'free_time', label: 'Free Time', icon: Clock },
] as const

const timeSlots = [
  '06:00 AM',
  '07:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
]

export function ItineraryBuilder({
  numberOfDays,
  startDate,
  items,
  destinations,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}: ItineraryBuilderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null)
  const [selectedDay, setSelectedDay] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    activity_type: 'activity' as ItineraryItem['activity_type'],
    time_slot: '',
    estimated_cost: 0,
    duration_hours: 2,
    destination_id: '',
    notes: '',
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      activity_type: 'activity',
      time_slot: '',
      estimated_cost: 0,
      duration_hours: 2,
      destination_id: '',
      notes: '',
    })
    setEditingItem(null)
  }

  const handleOpenDialog = (dayNumber: number, item?: ItineraryItem) => {
    setSelectedDay(dayNumber)
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        description: item.description || '',
        activity_type: item.activity_type,
        time_slot: item.time_slot || '',
        estimated_cost: item.estimated_cost,
        duration_hours: item.duration_hours || 2,
        destination_id: item.destination_id || '',
        notes: item.notes || '',
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (editingItem) {
      onUpdateItem(editingItem.id, {
        ...formData,
        day_number: selectedDay,
      })
    } else {
      onAddItem({
        ...formData,
        day_number: selectedDay,
        order_index: items.filter((i) => i.day_number === selectedDay).length,
      })
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const getItemsByDay = (dayNumber: number) => {
    return items
      .filter((item) => item.day_number === dayNumber)
      .sort((a, b) => {
        if (a.time_slot && b.time_slot) {
          return a.time_slot.localeCompare(b.time_slot)
        }
        return a.order_index - b.order_index
      })
  }

  const getActivityIcon = (type: ItineraryItem['activity_type']) => {
    const found = activityTypes.find((t) => t.value === type)
    return found ? found.icon : Camera
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: numberOfDays }, (_, i) => i + 1).map((dayNumber) => {
        const dayDate = addDays(startDate, dayNumber - 1)
        const dayItems = getItemsByDay(dayNumber)

        return (
          <Card key={dayNumber}>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div>
                <CardTitle className="text-lg">Day {dayNumber}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {format(dayDate, 'EEEE, MMMM d, yyyy')}
                </p>
              </div>
              <Button size="sm" onClick={() => handleOpenDialog(dayNumber)}>
                <Plus className="mr-1 h-4 w-4" />
                Add Activity
              </Button>
            </CardHeader>
            <CardContent>
              {dayItems.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No activities planned for this day
                  </p>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleOpenDialog(dayNumber)}
                    className="mt-2"
                  >
                    Add your first activity
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {dayItems.map((item) => {
                    const Icon = getActivityIcon(item.activity_type)
                    const destination = destinations.find((d) => d.id === item.destination_id)

                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="mt-0.5 text-muted-foreground">
                          <GripVertical className="h-4 w-4" />
                        </div>
                        <div
                          className={cn(
                            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
                            item.activity_type === 'accommodation' && 'bg-blue-100 text-blue-700',
                            item.activity_type === 'transportation' && 'bg-purple-100 text-purple-700',
                            item.activity_type === 'activity' && 'bg-green-100 text-green-700',
                            item.activity_type === 'meal' && 'bg-orange-100 text-orange-700',
                            item.activity_type === 'free_time' && 'bg-gray-100 text-gray-700'
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-medium text-foreground">{item.title}</h4>
                              {destination && (
                                <p className="text-xs text-primary">{destination.name}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-primary">
                                PHP {item.estimated_cost.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          {item.description && (
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            {item.time_slot && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {item.time_slot}
                              </span>
                            )}
                            {item.duration_hours && (
                              <span>Duration: {item.duration_hours}h</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleOpenDialog(dayNumber, item)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => onDeleteItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}

      {/* Add/Edit Activity Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Activity' : 'Add Activity'} - Day {selectedDay}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Activity Type</label>
              <Select
                value={formData.activity_type || undefined}
                onValueChange={(value) =>
                  setFormData({ ...formData, activity_type: value as ItineraryItem['activity_type'] })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Island Hopping Tour"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Destination</label>
              <Select
                value={formData.destination_id}
                onValueChange={(value) => setFormData({ ...formData, destination_id: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((destination) => (
                    <SelectItem key={destination.id} value={destination.id}>
                      {destination.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Time</label>
                <Select
                  value={formData.time_slot}
                  onValueChange={(value) => setFormData({ ...formData, time_slot: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Duration (hours)</label>
                <Input
                  type="number"
                  min={0.5}
                  step={0.5}
                  value={formData.duration_hours}
                  onChange={(e) =>
                    setFormData({ ...formData, duration_hours: parseFloat(e.target.value) || 0 })
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Estimated Cost (PHP)</label>
              <Input
                type="number"
                min={0}
                value={formData.estimated_cost}
                onChange={(e) =>
                  setFormData({ ...formData, estimated_cost: parseFloat(e.target.value) || 0 })
                }
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Add details about this activity..."
                className="mt-1"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes..."
                className="mt-1"
                rows={2}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.title}>
              {editingItem ? 'Update' : 'Add'} Activity
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
