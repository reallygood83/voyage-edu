import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TravelPlan, City, Country } from '@/types';

// 컬렉션 이름
const COLLECTION_NAME = 'travelPlans';

// 여행 계획 저장
export const saveTravelPlan = async (travelPlan: Partial<TravelPlan>) => {
  try {
    // Firestore에 맞게 데이터 변환
    const planData = {
      ...travelPlan,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: travelPlan.status || 'draft',
      isPublic: true, // 커뮤니티 공유를 위해 기본값 true
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), planData);
    console.log('Travel plan saved with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving travel plan: ', error);
    throw error;
  }
};

// 모든 공유된 여행 계획 가져오기
export const getSharedTravelPlans = async (limitCount: number = 20) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const plans: TravelPlan[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      plans.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as TravelPlan);
    });
    
    return plans;
  } catch (error) {
    console.error('Error getting shared travel plans: ', error);
    // Firestore 인덱스가 필요한 경우 안내
    if (error instanceof Error && error.message.includes('index')) {
      console.log('Please create the required index in Firebase Console.');
      console.log('The error message should contain a direct link to create the index.');
    }
    throw error;
  }
};

// 특정 여행 계획 가져오기
export const getTravelPlanById = async (planId: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, planId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as TravelPlan;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting travel plan: ', error);
    throw error;
  }
};

// 여행 계획 업데이트
export const updateTravelPlan = async (planId: string, updates: Partial<TravelPlan>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, planId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    console.log('Travel plan updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating travel plan: ', error);
    throw error;
  }
};

// 여행 계획 삭제
export const deleteTravelPlan = async (planId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, planId));
    console.log('Travel plan deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting travel plan: ', error);
    throw error;
  }
};

// 사용자별 여행 계획 가져오기
export const getUserTravelPlans = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('createdBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const plans: TravelPlan[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      plans.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as TravelPlan);
    });
    
    return plans;
  } catch (error) {
    console.error('Error getting user travel plans: ', error);
    throw error;
  }
};

// 여행 계획 좋아요 토글
export const toggleLikeTravelPlan = async (planId: string, userId: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, planId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const likes = data.likes || [];
      const userIndex = likes.indexOf(userId);
      
      if (userIndex > -1) {
        // 이미 좋아요한 경우 - 제거
        likes.splice(userIndex, 1);
      } else {
        // 좋아요하지 않은 경우 - 추가
        likes.push(userId);
      }
      
      await updateDoc(docRef, {
        likes,
        likesCount: likes.length,
        updatedAt: serverTimestamp(),
      });
      
      return likes.length;
    }
    return 0;
  } catch (error) {
    console.error('Error toggling like: ', error);
    throw error;
  }
};

// 인기 여행 계획 가져오기 (좋아요 기준)
export const getPopularTravelPlans = async (limitCount: number = 10) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('isPublic', '==', true),
      orderBy('likesCount', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const plans: TravelPlan[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      plans.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as TravelPlan);
    });
    
    return plans;
  } catch (error) {
    console.error('Error getting popular travel plans: ', error);
    throw error;
  }
};