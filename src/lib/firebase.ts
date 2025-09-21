import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork, collection, query, limit, getDocs } from 'firebase/firestore';

// 환경변수 검증 함수
const validateEnvVar = (name: string, value: string | undefined): string => {
  if (!value || value.trim() === '') {
    const errorMsg = `Missing required environment variable: ${name}`;
    console.error('🔥 Firebase Config Error:', errorMsg);
    
    // 프로덕션 환경에서는 더 자세한 오류 정보 제공
    if (process.env.NODE_ENV === 'production') {
      console.error('🔥 Production Environment Variables Check:');
      console.error('- Make sure all Firebase environment variables are set in Vercel dashboard');
      console.error('- Check: https://vercel.com/dashboard → Project → Settings → Environment Variables');
    }
    
    throw new Error(errorMsg);
  }
  // 개행문자나 공백 제거
  return value.trim();
};

// Firebase 설정 객체 (환경변수 검증 포함)
const firebaseConfig = {
  apiKey: validateEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY', process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: validateEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: validateEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: validateEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: validateEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: validateEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID', process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  measurementId: validateEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID)
};

// API 키 디버깅
console.log('🔥 Firebase Config API Key Test:', {
  raw: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  validated: firebaseConfig.apiKey,
  correct: firebaseConfig.apiKey === 'AIzaSyBiDfiYNUsYao4DJs1l4LaGNhnxA8acVK4'
});

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Authentication 인스턴스
export const auth = getAuth(app);

// Google Provider 설정
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  hd: '*' // 모든 도메인 허용
});

// 추가 스코프 설정 (선택사항)
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Firestore 인스턴스
export const db = getFirestore(app);

// 환경변수 및 Firebase 초기화 검증
const validateFirebaseConfig = () => {
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('🔥 Missing Firebase environment variables:', missingVars);
    return false;
  }
  
  return true;
};

// 환경변수 디버깅 (개발 환경에서는 상세히, 프로덕션에서는 기본 정보만)
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  console.log('🔥 Firebase Config Debug:', {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? `Set (${process.env.NEXT_PUBLIC_FIREBASE_API_KEY.substring(0, 10)}...)` : 'Not Set',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    allEnvVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_FIREBASE')),
    configValid: validateFirebaseConfig()
  });
  
  // Firebase 초기화 성공/실패 로그
  console.log('🔥 Firebase App Initialized:', app ? 'SUCCESS' : 'FAILED');
  console.log('🔥 Firebase Auth Instance:', auth ? 'SUCCESS' : 'FAILED');
  console.log('🔥 Firebase Firestore Instance:', typeof db);
  
  // Firestore 연결 테스트 함수 (개선된 오류 처리)
  const testFirestoreConnection = async () => {
    try {
      console.log('🔥 Testing Firestore connection...');
      
      // 간단한 연결 테스트 (실제 데이터 읽기 시도)
      const testCollection = collection(db, 'test');
      const testQuery = query(testCollection, limit(1));
      await getDocs(testQuery);
      
      console.log('🔥 Firestore connection: SUCCESS');
    } catch (error) {
      if (error instanceof Error) {
        // 데이터베이스가 생성되지 않은 경우의 오류는 경고로만 표시
        if (error.message.includes('not found') || error.message.includes('does not exist')) {
          console.warn('⚠️ Firestore database not created yet. Please create database in Firebase Console.');
          console.warn('📋 Guide: https://console.firebase.google.com/project/voyage-edu/firestore');
        } else {
          console.error('🔥 Firestore connection error:', {
            name: error.name,
            message: error.message
          });
        }
      } else {
        console.error('🔥 Firestore connection error:', error);
      }
    }
  };

  // 개발 환경에서만 연결 테스트 실행 (오류 발생 시에도 앱 실행 계속)
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      testFirestoreConnection().catch(() => {
        // 연결 테스트 실패해도 앱 실행은 계속
        console.log('🔥 Firestore test completed (with warnings)');
      });
    }, 1000);
  }
}

export default app;