import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const searchParams = request.nextUrl.searchParams
  
  const category = searchParams.get("category")
  const region = searchParams.get("region")
  const search = searchParams.get("search")
  const minBudget = searchParams.get("minBudget")
  const maxBudget = searchParams.get("maxBudget")
  const sortBy = searchParams.get("sortBy") || "rating"
  
  let query = supabase
    .from("destinations")
    .select("*")
  
  if (category && category !== "all") {
    query = query.eq("category", category)
  }
  
  if (region && region !== "all") {
    query = query.eq("region", region)
  }
  
  if (search) {
    query = query.or(`name.ilike.%${search}%,province.ilike.%${search}%,description.ilike.%${search}%`)
  }
  
  if (minBudget) {
    query = query.gte("average_budget_per_day", parseFloat(minBudget))
  }
  
  if (maxBudget) {
    query = query.lte("average_budget_per_day", parseFloat(maxBudget))
  }
  
  // Apply sorting
  switch (sortBy) {
    case "rating":
      query = query.order("rating", { ascending: false })
      break
    case "budget_low":
      query = query.order("average_budget_per_day", { ascending: true })
      break
    case "budget_high":
      query = query.order("average_budget_per_day", { ascending: false })
      break
    case "name":
      query = query.order("name", { ascending: true })
      break
    default:
      query = query.order("rating", { ascending: false })
  }
  
  const { data, error } = await query
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
