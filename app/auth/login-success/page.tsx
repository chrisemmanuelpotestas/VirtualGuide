"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, CheckCircle, Loader2 } from "lucide-react"

export default function LoginSuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      router.push("/dashboard")
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>
            You have successfully signed in to Virtual Guide
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Compass className="h-5 w-5 text-primary animate-pulse" />
            <p className="text-sm">
              Preparing your dashboard...
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-primary hover:underline"
          >
            Go to dashboard now
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
