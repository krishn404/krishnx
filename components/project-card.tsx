import { Card, CardContent } from "@/components/card"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  link: string
}

export function ProjectCard({ title, description, link }: ProjectCardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="overflow-hidden border border-white/20 hover:border-white/40 transition-colors bg-black">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-medium text-white">{title}</h3>
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
