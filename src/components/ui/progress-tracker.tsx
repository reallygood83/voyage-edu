import * as React from "react"
import { Progress } from "./progress"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface ProgressTrackerProps {
  currentStep: number
  totalSteps: number
  stepLabels: string[]
  className?: string
}

const ProgressTracker = ({ currentStep, totalSteps, stepLabels, className }: ProgressTrackerProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100

  const getStepIcon = (stepIndex: number) => {
    if (stepIndex < currentStep) return "✅"
    if (stepIndex === currentStep) return "⭐"
    return "⭕"
  }

  const getStepVariant = (stepIndex: number) => {
    if (stepIndex < currentStep) return "success"
    if (stepIndex === currentStep) return "achievement"
    return "outline"
  }

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* 진행률 바 */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-700">
            🎯 진행률: {currentStep}/{totalSteps} 단계
          </span>
          <span className="text-2xl font-bold text-primary-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <Progress value={progressPercentage} className="h-6" />
      </div>

      {/* 단계별 표시 */}
      <div className="flex flex-wrap gap-3 justify-center">
        {stepLabels.map((label, index) => (
          <Badge
            key={index}
            variant={getStepVariant(index)}
            className="text-base py-2 px-4 transition-all duration-300 hover:scale-105"
          >
            <span className="text-lg mr-2">{getStepIcon(index)}</span>
            {label}
          </Badge>
        ))}
      </div>

      {/* 격려 메시지 */}
      {currentStep < totalSteps && (
        <div className="text-center p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
          <p className="text-lg font-semibold text-yellow-800">
            🌟 다음 단계: {stepLabels[currentStep]}
          </p>
          <p className="text-sm text-yellow-600 mt-1">
            열심히 하고 있어요! 조금만 더 화이팅! 💪
          </p>
        </div>
      )}

      {/* 완료 축하 메시지 */}
      {currentStep >= totalSteps && (
        <div className="text-center p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl border-2 border-green-200">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-xl font-bold text-green-800 mb-2">
            와! 모든 단계를 완료했어요!
          </p>
          <p className="text-green-600">
            정말 잘했어요! 멋진 여행 상품을 만들었네요! 👏
          </p>
        </div>
      )}
    </div>
  )
}

export { ProgressTracker }