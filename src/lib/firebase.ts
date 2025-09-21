import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

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

// Firestore 인스턴스
export const db = getFirestore(app);

// 환경변수 디버깅 (개발 환경에서만)
if (process.env.NODE_ENV === 'development') {
  console.log('🔥 Firebase Config Debug:', {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? `Set (${process.env.NEXT_PUBLIC_FIREBASE_API_KEY.substring(0, 10)}...)` : 'Not Set',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    allEnvVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_FIREBASE'))
  });
  
  // Firebase 초기화 성공/실패 로그
  console.log('🔥 Firebase App Initialized:', app ? 'SUCCESS' : 'FAILED');
  console.log('🔥 Firebase Auth Instance:', auth ? 'SUCCESS' : 'FAILED');
  console.log('🔥 Firebase Firestore Instance:', typeof db);
}

export default app;