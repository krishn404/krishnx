"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface LanyardData {
  data?: {
    discord_user?: {
      username?: string
      avatar?: string
    }
    discord_status?: string
    activities?: Array<{
      name?: string
      state?: string
      details?: string
      timestamps?: {
        start?: number
      }
    }>
  }
}

export function DiscordActivity() {
  const [activity, setActivity] = useState<LanyardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchDiscordActivity = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://lanyard.cnrad.dev/api/1197150044151894098?hideDecoration=true&hideBadges=true&hideProfile=true&idleMessage=Exploring&borderRadius=10px",
        )

        if (!response.ok) {
          throw new Error("Failed to fetch Discord activity")
        }

        const data = await response.json()
        setActivity(data)
        setError(false)
      } catch (error) {
        console.error("Failed to fetch Discord activity:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchDiscordActivity()

    // Set up polling to refresh data
    const interval = setInterval(fetchDiscordActivity, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground my-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading Discord activity...</span>
      </div>
    )
  }

  if (error || !activity?.data) {
    return <div className="text-red-500">Error loading activity</div>
  }

  const isActive = activity.data.activities && activity.data.activities.length > 0
  const currentActivity = isActive ? activity.data.activities[0] : null
  const status = activity.data.discord_status || "offline"

  if (!isActive) {
    return <div className="text-muted-foreground">No current activity</div>
  }

  return (
    <div className="mt-4 mb-6 p-4 bg-accent/50 rounded-lg shadow-lg border-2 border-transparent hover:border-blue-500 transition-all duration-300 glow-effect">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <img
            src={activity.data.discord_user?.avatar || "/default-avatar.png"}
            alt={`${activity.data.discord_user?.username}'s avatar`}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>
        <div>
          <p className="font-medium text-lg">{currentActivity?.name || "Unknown Activity"}</p>
          {currentActivity?.details && <p className="text-muted-foreground text-sm">{currentActivity.details}</p>}
          {currentActivity?.state && <p className="text-muted-foreground text-sm">{currentActivity.state}</p>}
          <p className={`text-sm ${status === "online" ? "text-green-500" : status === "idle" ? "text-yellow-500" : "text-red-500"}`}>
            Status: {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>
      </div>
    </div>
  )
}
