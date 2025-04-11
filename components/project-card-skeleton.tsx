import { Card, CardContent } from "@/components/card"

export function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-white/20 bg-black">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="w-full">
            <div className="h-5 w-1/3 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer rounded" />
            <div className="h-4 w-2/3 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer rounded mt-2" />
          </div>
          <div className="h-4 w-4 bg-gray-800 rounded flex-shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  )
}
