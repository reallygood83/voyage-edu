'use client';

import { useState } from 'react';
import { Destination, Activity } from '@/types';
import { ACTIVITY_TYPES } from '@/utils/constants';

interface ActivityPlannerProps {
  destination: Destination;
  onActivitiesUpdate: (activities: Activity[]) => void;
}

const ActivityPlanner = ({ destination, onActivitiesUpdate }: ActivityPlannerProps) => {
  const [activities, setActivities] = useState<Activity[]>(destination.activities || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    name: '',
    description: '',
    type: 'cultural',
    duration: 2,
    price: 10000,
  });

  const handleAddActivity = () => {
    const activity: Activity = {
      id: `act_${Date.now()}`,
      name: newActivity.name || '',
      description: newActivity.description || '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      duration: newActivity.duration || 2,
      price: newActivity.price || 0,
      type: newActivity.type as Activity['type'],
    };
    
    const updatedActivities = [...activities, activity];
    setActivities(updatedActivities);
    onActivitiesUpdate(updatedActivities);
    setNewActivity({ name: '', description: '', type: 'cultural', duration: 2, price: 10000 });
    setShowAddForm(false);
  };

  const handleRemoveActivity = (activityId: string) => {
    const updatedActivities = activities.filter(a => a.id !== activityId);
    setActivities(updatedActivities);
    onActivitiesUpdate(updatedActivities);
  };

  return (
    <div className="space-y-4">
      {/* Activities List */}
      {activities.length > 0 && (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {ACTIVITY_TYPES.find(t => t.value === activity.type)?.icon || '✨'}
                </span>
                <div>
                  <h4 className="font-semibold">{activity.name}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                    <span>⏱️ {activity.duration}시간</span>
                    <span>💰 ₩{activity.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveActivity(activity.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Activity Form */}
      {showAddForm ? (
        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
          <input
            type="text"
            placeholder="활동 이름"
            value={newActivity.name}
            onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
            className="input-field w-full"
          />
          <textarea
            placeholder="활동 설명"
            value={newActivity.description}
            onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
            className="input-field w-full"
            rows={2}
          />
          <div className="grid grid-cols-3 gap-3">
            <select
              value={newActivity.type}
              onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value as Activity['type'] })}
              className="input-field"
            >
              {ACTIVITY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="시간"
              value={newActivity.duration}
              onChange={(e) => setNewActivity({ ...newActivity, duration: Number(e.target.value) })}
              className="input-field"
            />
            <input
              type="number"
              placeholder="가격"
              value={newActivity.price}
              onChange={(e) => setNewActivity({ ...newActivity, price: Number(e.target.value) })}
              className="input-field"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddActivity}
              className="btn-primary flex-1"
            >
              추가
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors flex-1"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-colors"
        >
          + 활동 추가하기
        </button>
      )}
    </div>
  );
};

export default ActivityPlanner;