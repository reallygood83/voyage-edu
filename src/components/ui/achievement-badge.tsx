import * as React from "react"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  points: number
}

interface AchievementBadgeProps {
  achievement: Achievement
  className?: string
  showAnimation?: boolean
}

const AchievementBadge = ({ achievement, className, showAnimation = false }: AchievementBadgeProps) => {
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    if (showAnimation && achievement.earned) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showAnimation, achievement.earned])

  return (
    <div 
      className={cn(
        "relative transition-all duration-300",
        isAnimating && "animate-bounce",
        className
      )}
    >
      <div
        className={cn(
          "p-4 rounded-xl border-2 transition-all duration-300",
          achievement.earned
            ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300 shadow-lg"
            : "bg-gray-100 border-gray-300 opacity-60"
        )}
      >
        <div className="text-center space-y-2">
          <div className={cn(
            "text-4xl transition-all duration-300",
            achievement.earned ? "grayscale-0" : "grayscale filter"
          )}>
            {achievement.icon}
          </div>
          <h3 className={cn(
            "font-bold text-sm",
            achievement.earned ? "text-yellow-800" : "text-gray-500"
          )}>
            {achievement.title}
          </h3>
          <p className={cn(
            "text-xs",
            achievement.earned ? "text-yellow-700" : "text-gray-400"
          )}>
            {achievement.description}
          </p>
          {achievement.earned && (
            <Badge variant="achievement" className="text-xs">
              +{achievement.points}점
            </Badge>
          )}
        </div>
      </div>
      
      {/* 획득 시 반짝이는 효과 */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 animate-pulse" />
      )}
    </div>
  )
}

// 미리 정의된 업적들
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_country",
    title: "첫 탐험가",
    description: "첫 번째 나라를 선택했어요!",
    icon: "🗺️",
    earned: false,
    points: 10
  },
  {
    id: "city_explorer",
    title: "도시 탐험가",
    description: "3개 도시를 선택했어요!",
    icon: "🏙️",
    earned: false,
    points: 20
  },
  {
    id: "plan_master",
    title: "계획의 달인",
    description: "완벽한 여행 계획을 세웠어요!",
    icon: "📋",
    earned: false,
    points: 30
  },
  {
    id: "designer",
    title: "디자이너",
    description: "멋진 홍보 자료를 만들었어요!",
    icon: "🎨",
    earned: false,
    points: 40
  },
  {
    id: "travel_expert",
    title: "여행 전문가",
    description: "모든 단계를 완료했어요!",
    icon: "👑",
    earned: false,
    points: 100
  }
]

export { AchievementBadge }