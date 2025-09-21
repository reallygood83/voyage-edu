'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  UserCredential
} from 'firebase/auth';
import { auth, googleProvider, db } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

// 사용자 프로필 타입 정의
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  grade?: string;
  school?: string;
  points: number;
  achievements: string[];
  travelPlans: string[];
  createdAt: Date;
  lastLoginAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  addPoints: (points: number) => Promise<void>;
  addAchievement: (achievementId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // 사용자 프로필 생성/업데이트
  const createOrUpdateUserProfile = async (user: User, isNewUser = false) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      const baseUserData = {
        id: user.uid,
        name: user.displayName || '여행가',
        email: user.email || '',
        photoURL: user.photoURL || '',
        lastLoginAt: new Date(),
      };

      if (!userDoc.exists() || isNewUser) {
        // 새 사용자 프로필 생성
        const newUserProfile: UserProfile = {
          ...baseUserData,
          grade: '',
          school: '',
          points: 0,
          achievements: [],
          travelPlans: [],
          createdAt: new Date(),
        };
        
        await setDoc(userDocRef, newUserProfile);
        setUserProfile(newUserProfile);
        
        toast({
          title: "🎉 환영합니다!",
          description: "Voyage Edu에 처음 오신 것을 환영해요! 멋진 여행 계획을 세워보세요.",
        });
      } else {
        // 기존 사용자 프로필 업데이트
        const existingData = userDoc.data() as UserProfile;
        const updatedProfile = {
          ...existingData,
          ...baseUserData,
        };
        
        await updateDoc(userDocRef, { lastLoginAt: new Date() });
        setUserProfile(updatedProfile);
        
        toast({
          title: `👋 다시 만나서 반가워요, ${updatedProfile.name}님!`,
          description: "오늘도 새로운 여행 계획을 세워보세요.",
        });
      }
    } catch (error) {
      console.error('Error creating/updating user profile:', error);
      toast({
        title: "오류가 발생했습니다",
        description: "사용자 정보를 저장하는 중 문제가 발생했어요.",
        variant: "destructive"
      });
    }
  };

  // Google 로그인
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      console.log('🔥 Google 로그인 시도 시작');
      console.log('🔥 Firebase Auth Instance:', auth);
      console.log('🔥 Google Provider Config:', googleProvider);
      console.log('🔥 환경변수 확인:', {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      });
      
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      console.log('🔥 Google 로그인 성공:', result.user.email);
      const user = result.user;
      
      // 새 사용자인지 확인
      const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
      console.log('🔥 새 사용자 여부:', isNewUser);
      
      await createOrUpdateUserProfile(user, isNewUser);
    } catch (error: any) {
      console.error('🔥 Google 로그인 상세 에러:', {
        code: error.code,
        message: error.message,
        details: error,
        authInstance: auth,
        providerConfig: googleProvider
      });
      
      let errorMessage = "로그인에 실패했어요. 다시 시도해주세요.";
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "로그인 창이 닫혔어요. 다시 시도해주세요.";
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = "인터넷 연결을 확인해주세요.";
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMessage = "승인되지 않은 도메인입니다. Firebase 콘솔에서 도메인을 승인해주세요.";
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "Google 로그인이 비활성화되어 있습니다. Firebase 콘솔에서 활성화해주세요.";
      }
      
      toast({
        title: "로그인 실패",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 이메일/비밀번호 로그인
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('📧 이메일 로그인 시도:', email);
      
      const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('📧 이메일 로그인 성공:', result.user.email);
      const user = result.user;
      
      await createOrUpdateUserProfile(user, false);
      
      toast({
        title: "🎉 로그인 성공!",
        description: `${user.email}로 로그인되었습니다.`,
      });
    } catch (error: any) {
      console.error('📧 이메일 로그인 에러:', error);
      
      let errorMessage = "로그인에 실패했어요. 다시 시도해주세요.";
      if (error.code === 'auth/user-not-found') {
        errorMessage = "등록되지 않은 이메일입니다. 회원가입을 해주세요.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "비밀번호가 올바르지 않습니다.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "올바른 이메일 형식을 입력해주세요.";
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = "비활성화된 계정입니다. 관리자에게 문의해주세요.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "너무 많은 로그인 시도입니다. 잠시 후 다시 시도해주세요.";
      }
      
      toast({
        title: "로그인 실패",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 이메일/비밀번호 회원가입
  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      console.log('📝 이메일 회원가입 시도:', email);
      
      const result: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('📝 이메일 회원가입 성공:', result.user.email);
      const user = result.user;
      
      // 새 사용자 프로필 생성 (이름 포함)
      const userDocRef = doc(db, 'users', user.uid);
      const newUserProfile: UserProfile = {
        id: user.uid,
        name: name || '여행가',
        email: user.email || '',
        photoURL: user.photoURL || '',
        grade: '',
        school: '',
        points: 0,
        achievements: [],
        travelPlans: [],
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };
      
      await setDoc(userDocRef, newUserProfile);
      setUserProfile(newUserProfile);
      
      toast({
        title: "🎉 회원가입 완료!",
        description: `${name}님, Voyage Edu에 가입해주셔서 감사합니다!`,
      });
    } catch (error: any) {
      console.error('📝 이메일 회원가입 에러:', error);
      
      let errorMessage = "회원가입에 실패했어요. 다시 시도해주세요.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "이미 사용 중인 이메일입니다. 로그인을 시도해주세요.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "올바른 이메일 형식을 입력해주세요.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "비밀번호는 6자 이상이어야 합니다.";
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "이메일 회원가입이 비활성화되어 있습니다.";
      }
      
      toast({
        title: "회원가입 실패",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      
      toast({
        title: "👋 안녕히 가세요!",
        description: "다음에 또 만나요!",
      });
    } catch (error) {
      console.error('로그아웃 실패:', error);
      toast({
        title: "오류가 발생했습니다",
        description: "로그아웃 중 문제가 발생했어요.",
        variant: "destructive"
      });
    }
  };

  // 사용자 프로필 업데이트
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) return;
    
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, updates);
      
      setUserProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "✅ 프로필이 업데이트되었어요!",
        description: "변경사항이 저장되었습니다.",
      });
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      toast({
        title: "오류가 발생했습니다",
        description: "프로필 업데이트에 실패했어요.",
        variant: "destructive"
      });
    }
  };

  // 포인트 추가
  const addPoints = async (points: number) => {
    if (!user || !userProfile) return;
    
    try {
      const newPoints = userProfile.points + points;
      await updateUserProfile({ points: newPoints });
      
      toast({
        title: `🏆 ${points}포인트 획득!`,
        description: `총 ${newPoints}포인트가 되었어요!`,
      });
    } catch (error) {
      console.error('포인트 추가 실패:', error);
    }
  };

  // 업적 추가
  const addAchievement = async (achievementId: string) => {
    if (!user || !userProfile) return;
    
    try {
      if (!userProfile.achievements.includes(achievementId)) {
        const newAchievements = [...userProfile.achievements, achievementId];
        await updateUserProfile({ achievements: newAchievements });
        
        toast({
          title: "🎉 새로운 업적 달성!",
          description: "멋진 여행가가 되어가고 있어요!",
        });
      }
    } catch (error) {
      console.error('업적 추가 실패:', error);
    }
  };

  // 인증 상태 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await createOrUpdateUserProfile(user);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    updateUserProfile,
    addPoints,
    addAchievement,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};