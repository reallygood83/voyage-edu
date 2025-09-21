'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentStep,
  totalSteps,
  stepNames
}) => {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);
  
  const getStepEmoji = (step: number) => {
    if (step < currentStep) return '✅';
    if (step === currentStep) return '🎯';
    return '⭕';
  };

  const getEncouragementMessage = () => {
    if (progressPercentage === 0) return '🚀 멋진 여행 계획을 시작해보세요!';
    if (progressPercentage <= 33) return '💪 잘하고 있어요! 계속 진행해보세요!';
    if (progressPercentage <= 66) return '🌟 절반 이상 완료! 정말 대단해요!';
    if (progressPercentage < 100) return '🎉 거의 다 끝났어요! 조금만 더!';
    return '🏆 축하해요! 완벽하게 완료했어요!';
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-3 border-blue-200 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <span className="text-3xl animate-bounce">📊</span>
          여행 계획 진행률
          <span className="text-3xl animate-bounce delay-300">🗺️</span>
        </CardTitle>
        <p className="text-lg text-gray-600 mt-2">{getEncouragementMessage()}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 진행률 바 */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">전체 진행률</span>
            <Badge variant="achievement" className="text-base px-3 py-1">
              {progressPercentage}% 완료
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-8 shadow-lg" />
        </div>

        {/* 단계별 진행 상황 */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📝</span>
            단계별 진행 상황
          </h3>
          
          <div className="grid gap-3">
            {stepNames.map((stepName, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-50 border-green-300 shadow-md'
                      : isCurrent
                      ? 'bg-blue-50 border-blue-300 shadow-lg animate-pulse'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="text-3xl">
                    {getStepEmoji(stepNumber)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-gray-700">
                        {stepNumber}단계
                      </span>
                      {isCompleted && (
                        <Badge variant="success" className="text-xs">
                          완료!
                        </Badge>
                      )}
                      {isCurrent && (
                        <Badge variant="fun" className="text-xs animate-pulse">
                          진행중
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${
                      isCompleted ? 'text-green-700' : 
                      isCurrent ? 'text-blue-700 font-medium' : 
                      'text-gray-600'
                    }`}>
                      {stepName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 다음 단계 안내 */}
        {currentStep <= totalSteps && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="font-bold text-yellow-800">다음에 할 일</h4>
                <p className="text-yellow-700 text-sm">
                  {currentStep <= totalSteps ? 
                    stepNames[currentStep - 1] || '모든 단계를 완료했어요!' :
                    '모든 단계를 완료했어요!'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;