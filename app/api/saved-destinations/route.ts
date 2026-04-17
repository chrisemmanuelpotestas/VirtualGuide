import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const { data, error } = await supabase
    .from("saved_destinations")
    .select("destination_id")
    .eq("user_id", user.id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data.map(d => d.destination_id))
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const body = await request.json()
  const { destination_id } = body
  
  if (!destination_id) {
    return NextResponse.json({ error: "destination_id is required" }, { status: 400 })
  }
  
  const { error } = await supabase
    .from("saved_destinations")
    .insert({
      user_id: user.id,
      destination_id,
    })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
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
  const { destination_id } = body
  
  if (!destination_id) {
    return NextResponse.json({ error: "destination_id is required" }, { status: 400 })
  }
  
  const { error } = await supabase
    .from("saved_destinations")
    .delete()
    .eq("user_id", user.id)
    .eq("destination_id", destination_id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}
