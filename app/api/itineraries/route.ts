import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { data, error } = await supabase
    .from("itineraries")
    .select(`
      *,
      itinerary_items (
        *,
        destinations (name, image_url)
      )
    `)
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const body = await request.json()
  const { title, description, start_date, end_date, total_budget, items } = body
  
  // Create itinerary
  const { data: itinerary, error: itineraryError } = await supabase
    .from("itineraries")
    .insert({
      user_id: user.id,
      title,
      description,
      start_date,
      end_date,
      total_budget,
      status: "draft",
    })
    .select()
    .single()
  
  if (itineraryError) {
    return NextResponse.json({ error: itineraryError.message }, { status: 500 })
  }
  
  // Add items if provided
  if (items && items.length > 0) {
    const itemsWithItineraryId = items.map((item: Record<string, unknown>, index: number) => ({
      ...item,
      itinerary_id: itinerary.id,
      order_index: index,
    }))
    
    const { error: itemsError } = await supabase
      .from("itinerary_items")
      .insert(itemsWithItineraryId)
    
    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 500 })
    }
  }
  
  return NextResponse.json(itinerary)
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const body = await request.json()
  const { id, title, description, start_date, end_date, total_budget, status, items } = body
  
  if (!id) {
    return NextResponse.json({ error: "Itinerary ID is required" }, { status: 400 })
  }
  
  // Update itinerary
  const { error: updateError } = await supabase
    .from("itineraries")
    .update({
      title,
      description,
      start_date,
      end_date,
      total_budget,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)
  
  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }
  
  // Update items if provided
  if (items) {
    // Delete existing items
    await supabase
      .from("itinerary_items")
      .delete()
      .eq("itinerary_id", id)
    
    // Insert new items
    if (items.length > 0) {
      const itemsWithItineraryId = items.map((item: Record<string, unknown>, index: number) => ({
        ...item,
        itinerary_id: id,
        order_index: index,
        id: undefined, // Remove existing IDs to create new records
      }))
      
      const { error: itemsError } = await supabase
        .from("itinerary_items")
        .insert(itemsWithItineraryId)
      
      if (itemsError) {
        return NextResponse.json({ error: itemsError.message }, { status: 500 })
      }
    }
  }
  
  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const body = await request.json()
  const { id } = body
  
  if (!id) {
    return NextResponse.json({ error: "Itinerary ID is required" }, { status: 400 })
  }
  
  const { error } = await supabase
    .from("itineraries")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}
