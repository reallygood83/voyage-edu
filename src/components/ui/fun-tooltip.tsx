import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"

interface FunTooltipProps {
  children: React.ReactNode
  content: string
  emoji?: string
  className?: string
}

const FunTooltip = ({ children, content, emoji = "💡", className }: FunTooltipProps) => {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </div>
      
      {isVisible && (
        <Card className={cn(
          "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-64 animate-slide-up",
          className
        )}>
          <CardContent className="p-4 text-center bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
            <div className="text-2xl mb-2">{emoji}</div>
            <p className="text-sm font-medium text-gray-700">{content}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { FunTooltip }