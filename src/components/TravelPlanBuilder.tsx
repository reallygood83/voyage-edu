'use client';

import { useState } from 'react';
import { City, TravelPlan, Destination, TargetCustomer, Activity } from '@/types';
import { TARGET_CUSTOMERS, BUDGET_LEVELS, ACTIVITY_TYPES } from '@/utils/constants';
import DatePicker from './DatePicker';
import ActivityPlanner from './ActivityPlanner';

interface TravelPlanBuilderProps {
  selectedCities: City[];
  travelPlan: TravelPlan | null;
  onPlanUpdate: (plan: TravelPlan) => void;
  onNext: () => void;
  onBack: () => void;
}

const TravelPlanBuilder = ({
  selectedCities,
  travelPlan,
  onPlanUpdate,
  onNext,
  onBack,
}: TravelPlanBuilderProps) => {
  const [title, setTitle] = useState(travelPlan?.title || '');
  const [startDate, setStartDate] = useState(travelPlan?.startDate || '');
  const [endDate, setEndDate] = useState(travelPlan?.endDate || '');
  const [targetCustomer, setTargetCustomer] = useState<TargetCustomer>(
    travelPlan?.targetCustomer || {
      type: 'family',
      ageRange: '모든 연령',
      interests: [],
      budget: 'standard',
    }
  );
  const [destinations, setDestinations] = useState<Destination[]>(
    travelPlan?.destinations || 
    selectedCities.map(city => ({
      city,
      arrivalDate: '',
      departureDate: '',
      activities: [],
    }))
  );

  const handleSavePlan = () => {
    const plan: TravelPlan = {
      id: travelPlan?.id || `plan_${Date.now()}`,
      title,
      startDate,
      endDate,
      destinations,
      targetCustomer,
      totalBudget: calculateTotalBudget(),
      currency: 'KRW',
      createdBy: 'student',
      createdAt: travelPlan?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
    };
    
    onPlanUpdate(plan);
    onNext();
  };

  const calculateTotalBudget = () => {
    // Simple budget calculation based on days and budget level
    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
    const basePrice = targetCustomer.budget === 'economy' ? 50000 : 
                      targetCustomer.budget === 'standard' ? 100000 : 200000;
    return days * basePrice * selectedCities.length;
  };

  const updateDestinationActivities = (cityId: string, activities: Activity[]) => {
    setDestinations(prev => 
      prev.map(dest => 
        dest.city.id === cityId 
          ? { ...dest, activities }
          : dest
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Plan Details */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          ✈️ 여행 계획 만들기
        </h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              여행 상품 이름 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 한국-일본 문화 교류 여행"
              className="input-field w-full"
            />
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                출발일 *
              </label>
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                도착일 *
              </label>
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                min={startDate}
              />
            </div>
          </div>

          {/* Target Customer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              타겟 고객 *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {TARGET_CUSTOMERS.map((customer) => (
                <button
                  key={customer.value}
                  onClick={() => setTargetCustomer({ ...targetCustomer, type: customer.value as any })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    targetCustomer.type === customer.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="block font-medium">{customer.label}</span>
                  <span className="text-xs text-gray-500">{customer.labelEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Budget Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              예산 수준 *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {BUDGET_LEVELS.map((budget) => (
                <button
                  key={budget.value}
                  onClick={() => setTargetCustomer({ ...targetCustomer, budget: budget.value as any })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    targetCustomer.budget === budget.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="block font-medium">{budget.label}</span>
                  <span className="text-xs text-gray-500">{budget.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Destinations & Activities */}
      <div className="space-y-6">
        {destinations.map((destination, index) => (
          <div key={destination.city.id} className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              📍 {destination.city.nameKo} ({destination.city.name})
            </h3>
            
            <ActivityPlanner
              destination={destination}
              onActivitiesUpdate={(activities) => 
                updateDestinationActivities(destination.city.id, activities)
              }
            />
          </div>
        ))}
      </div>

      {/* Budget Summary */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">💰 예상 총 비용</h3>
        <div className="text-3xl font-bold text-green-600">
          ₩{calculateTotalBudget().toLocaleString()}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          * 항공료, 숙박, 활동 비용이 포함된 예상 금액입니다
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="btn-secondary px-8 py-3"
        >
          ← 이전 단계
        </button>
        <button
          onClick={handleSavePlan}
          disabled={!title || !startDate || !endDate}
          className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음 단계: 홍보 자료 만들기 →
        </button>
      </div>
    </div>
  );
};

export default TravelPlanBuilder;