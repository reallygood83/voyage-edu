# Vercel 배포 환경에서 Firebase 인증 설정 가이드

## 🚀 Vercel 환경변수 설정

Vercel 대시보드에서 다음 환경변수들을 설정해야 합니다:

### 1. Vercel 대시보드 접속
- https://vercel.com/dashboard
- 프로젝트 선택 → Settings → Environment Variables

### 2. 환경변수 추가
다음 환경변수들을 **Production**, **Preview**, **Development** 모든 환경에 추가:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBiDfiYNUsYao4DJs1l4LaGNhnxA8acVK4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=voyage-edu.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=voyage-edu
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=voyage-edu.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=37108519699
NEXT_PUBLIC_FIREBASE_APP_ID=1:37108519699:web:8793aed003389db317c0e6
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-LS05RY3421
NEXT_PUBLIC_OPENWEATHER_API_KEY=5c807f36dcc552a5ab6088eddc99c6de
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyCHOlMRNowSpjgo-rfWcYuSFDupH4VoBk4
NEXT_PUBLIC_AMADEUS_API_KEY=XaNneidbgQRSo0G0AAvmZw9GZXhiZinn
NEXT_PUBLIC_AMADEUS_API_SECRET=e2BuPULWK5DfYJG8
```

## 🔥 Firebase Console 설정

### 1. Firebase Console 접속
- https://console.firebase.google.com/project/voyage-edu

### 2. Authentication 설정
1. **Authentication** → **Settings** → **Authorized domains**
2. 다음 도메인들을 추가:
   - `voyage-edu.vercel.app` (프로덕션)
   - `*.vercel.app` (프리뷰 배포용)
   - `localhost` (로컬 개발용)

### 3. Google OAuth 설정
1. **Authentication** → **Sign-in method** → **Google**
2. **Web SDK configuration** 섹션에서:
   - **Authorized JavaScript origins**에 추가:
     - `https://voyage-edu.vercel.app`
     - `https://*.vercel.app`
   - **Authorized redirect URIs**에 추가:
     - `https://voyage-edu.vercel.app/__/auth/handler`
     - `https://*.vercel.app/__/auth/handler`

## 🌐 Google Cloud Console 설정

### 1. Google Cloud Console 접속
- https://console.cloud.google.com/apis/credentials
- 프로젝트: voyage-edu

### 2. OAuth 2.0 클라이언트 ID 설정
1. **사용자 인증 정보** → **OAuth 2.0 클라이언트 ID** 선택
2. **승인된 JavaScript 원본**에 추가:
   - `https://voyage-edu.vercel.app`
   - `https://*.vercel.app`
3. **승인된 리디렉션 URI**에 추가:
   - `https://voyage-edu.vercel.app/__/auth/handler`
   - `https://*.vercel.app/__/auth/handler`

## 🔧 배포 후 확인사항

### 1. 환경변수 확인
배포 후 브라우저 개발자 도구에서 다음을 확인:
```javascript
// 콘솔에서 실행
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
});
```

### 2. 네트워크 탭 확인
- Firebase API 호출이 성공하는지 확인
- 401, 403 오류가 없는지 확인

### 3. 일반적인 문제 해결

#### 문제: "API key not valid" 오류
**해결방법:**
1. Vercel 환경변수가 올바르게 설정되었는지 확인
2. 배포 후 환경변수 변경 시 재배포 필요

#### 문제: "Unauthorized domain" 오류
**해결방법:**
1. Firebase Console에서 도메인이 승인되었는지 확인
2. Google Cloud Console에서 OAuth 설정 확인

#### 문제: 로컬에서는 되는데 배포에서 안 됨
**해결방법:**
1. 환경변수 설정 재확인
2. 도메인 설정 재확인
3. 캐시 클리어 후 재배포

## 📝 체크리스트

- [ ] Vercel 환경변수 설정 완료
- [ ] Firebase Console 도메인 승인 완료
- [ ] Google Cloud Console OAuth 설정 완료
- [ ] 배포 후 로그인 테스트 완료
- [ ] Google 로그인 테스트 완료
- [ ] 이메일 회원가입 테스트 완료

## 🆘 문제 발생 시

1. **Vercel 로그 확인**: Vercel 대시보드 → Functions → View Function Logs
2. **브라우저 콘솔 확인**: 개발자 도구에서 오류 메시지 확인
3. **Firebase 로그 확인**: Firebase Console → Authentication → Users

---

**참고**: 환경변수 변경 후에는 반드시 재배포가 필요합니다.