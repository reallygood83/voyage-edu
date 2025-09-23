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
      likes: [], // 좋아요한 사용자 ID 배열
      likesCount: 0, // 좋아요 수
      viewsCount: 0, // 조회수
      rating: 4.5, // 기본 평점
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), planData);
    console.log('Travel plan saved with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving travel plan: ', error);
    throw error;
  }
};

// 모든 공유된 여행 계획 가져오기 (인덱스 불필요한 단순 쿼리)
export const getSharedTravelPlans = async (limitCount: number = 20) => {
  try {
    // 단순 쿼리: orderBy만 사용 (인덱스 불필요)
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const plans: TravelPlan[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // isPublic이 true인 것만 클라이언트에서 필터링
      if (data.isPublic === true) {
        plans.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        } as TravelPlan);
      }
    });
    
    return plans;
  } catch (error) {
    console.error('Error getting shared travel plans: ', error);
    return []; // 에러 시 빈 배열 반환
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

// 사용자별 여행 계획 가져오기 (단순 쿼리)
export const getUserTravelPlans = async (userId: string) => {
  try {
    // where만 사용하여 인덱스 불필요하게 만듦
    const q = query(
      collection(db, COLLECTION_NAME),
      where('createdBy', '==', userId)
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
    
    // 클라이언트에서 날짜순 정렬
    const sortedPlans = plans.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return sortedPlans;
  } catch (error) {
    console.error('Error getting user travel plans: ', error);
    return []; // 에러 시 빈 배열 반환
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

// 인기 여행 계획 가져오기 (좋아요 기준) - 단순 쿼리로 변경
export const getPopularTravelPlans = async (limitCount: number = 10) => {
  try {
    // likesCount가 없을 수 있으므로 createdAt으로 정렬하고 클라이언트에서 정렬
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(limitCount * 2) // 필터링을 고려해 더 많이 가져옴
    );
    
    const querySnapshot = await getDocs(q);
    const plans: TravelPlan[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // isPublic이 true인 것만 필터링
      if (data.isPublic === true) {
        plans.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        } as TravelPlan);
      }
    });
    
    // 클라이언트에서 좋아요 수로 정렬 (없으면 0으로 처리)
    const sortedPlans = plans
      .sort((a, b) => ((b as any).likesCount || 0) - ((a as any).likesCount || 0))
      .slice(0, limitCount);
    
    return sortedPlans;
  } catch (error) {
    console.error('Error getting popular travel plans: ', error);
    return []; // 에러 시 빈 배열 반환
  }
};

// 여행 계획 조회수 증가
export const incrementViewCount = async (planId: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, planId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const currentViews = data.viewsCount || 0;
      
      await updateDoc(docRef, {
        viewsCount: currentViews + 1,
        updatedAt: serverTimestamp(),
      });
      
      return currentViews + 1;
    }
    return 0;
  } catch (error) {
    console.error('Error incrementing view count: ', error);
    throw error;
  }
};