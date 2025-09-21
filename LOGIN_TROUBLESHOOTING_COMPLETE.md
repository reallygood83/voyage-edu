# 🔧 Voyage Edu 로그인 문제 해결 완벽 가이드

## 📋 문제 상황
- **로컬 환경**: `http://localhost:3001` - ✅ 정상 작동
- **배포 환경**: `https://voyage-edu-two.vercel.app/` - ❌ 로그인 오류 발생

## 🚀 해결 단계 (순서대로 진행)

### 1단계: Vercel 환경변수 설정 ⚡
**중요도: 🔴 매우 높음**

#### 설정 방법:
1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. `voyage-edu-two` 프로젝트 선택
3. **Settings** > **Environment Variables** 이동
4. 다음 환경변수들을 **모두** 추가:

```bash
# Firebase 설정 (필수)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBiDfiYNUsYao4DJs1l4LaGNhnxA8acVK4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=voyage-edu.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=voyage-edu
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=voyage-edu.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=37108519699
NEXT_PUBLIC_FIREBASE_APP_ID=1:37108519699:web:8793aed003389db317c0e6
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-LS05RY3421

# 앱 URL (중요!)
NEXT_PUBLIC_APP_URL=https://voyage-edu-two.vercel.app

# 기타 API 키 (선택사항)
NEXT_PUBLIC_OPENWEATHER_API_KEY=5c807f36dcc552a5ab6088eddc99c6de
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyCHOlMRNowSpjgo-rfWcYuSFDupH4VoBk4
NEXT_PUBLIC_AMADEUS_API_KEY=XaNneidbgQRSo0G0AAvmZw9GZXhiZinn
NEXT_PUBLIC_AMADEUS_API_SECRET=e2BuPULWK5DfYJG8
```

#### 환경 선택:
- ✅ **Production** (필수)
- ✅ **Preview** (권장)
- ✅ **Development** (권장)

#### 재배포:
환경변수 설정 후 **반드시** 재배포:
1. **Deployments** 탭 이동
2. 최신 배포의 **⋯** 메뉴 클릭
3. **Redeploy** 선택

### 2단계: Firebase Console 도메인 승인 🔥
**중요도: 🔴 매우 높음**

#### 설정 방법:
1. [Firebase Console](https://console.firebase.google.com/project/voyage-edu) 접속
2. **Authentication** > **Settings** 이동
3. **승인된 도메인** 섹션에서 다음 도메인들이 **모두** 있는지 확인:

```
✅ localhost
✅ voyage-edu.firebaseapp.com
✅ voyage-edu-two.vercel.app  ← 이것이 가장 중요!
```

#### 도메인 추가:
만약 `voyage-edu-two.vercel.app`이 없다면:
1. **도메인 추가** 버튼 클릭
2. `voyage-edu-two.vercel.app` 입력
3. **추가** 클릭

### 3단계: Google OAuth 설정 🔐
**중요도: 🟡 높음**

#### Google Cloud Console 설정:
1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials?project=voyage-edu) 접속
2. OAuth 2.0 클라이언트 ID 편집
3. **승인된 JavaScript 원본**에 추가:
   ```
   https://voyage-edu-two.vercel.app
   ```
4. **승인된 리디렉션 URI**에 추가:
   ```
   https://voyage-edu-two.vercel.app/__/auth/handler
   ```

#### OAuth 동의 화면 설정:
1. **OAuth 동의 화면** 이동
2. **승인된 도메인**에 추가:
   ```
   vercel.app
   voyage-edu-two.vercel.app
   ```

### 4단계: Firebase Google 로그인 활성화 확인 ✅
**중요도: 🟡 높음**

1. [Firebase Console](https://console.firebase.google.com/project/voyage-edu/authentication/providers) 접속
2. **Authentication** > **Sign-in method** 이동
3. **Google** 제공업체가 **활성화**되어 있는지 확인
4. 비활성화되어 있다면 클릭하여 활성화

## 🧪 테스트 및 검증

### 1단계: 환경변수 확인
배포된 사이트에서 F12 개발자 도구 열고:
```javascript
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
});
```

### 2단계: Firebase 초기화 확인
콘솔에서 다음 메시지들을 확인:
```
🔥 Firebase App Initialized: SUCCESS
🔥 Firebase Auth Instance: SUCCESS
🔥 Firestore Connection: SUCCESS
```

### 3단계: 로그인 테스트
1. `https://voyage-edu-two.vercel.app/` 접속
2. **로그인하고 시작하기** 버튼 클릭
3. **Google로 시작하기** 버튼 클릭
4. Google 계정 선택 및 권한 승인
5. 로그인 성공 확인

## 🚨 일반적인 오류와 해결방법

### 오류 1: `auth/unauthorized-domain`
```
Firebase: Error (auth/unauthorized-domain).
```
**해결방법:**
- Firebase Console > Authentication > Settings > 승인된 도메인에 `voyage-edu-two.vercel.app` 추가

### 오류 2: `auth/operation-not-allowed`
```
Firebase: Error (auth/operation-not-allowed).
```
**해결방법:**
- Firebase Console > Authentication > Sign-in method에서 Google 활성화

### 오류 3: 환경변수 undefined
```
Firebase Config: { apiKey: undefined, authDomain: undefined, ... }
```
**해결방법:**
- Vercel 대시보드에서 환경변수 재설정 후 재배포

### 오류 4: `redirect_uri_mismatch`
```
Error 400: redirect_uri_mismatch
```
**해결방법:**
- Google Cloud Console > OAuth 클라이언트 ID > 승인된 리디렉션 URI에 `https://voyage-edu-two.vercel.app/__/auth/handler` 추가

## ✅ 성공 확인 체크리스트

### Vercel 설정
- [ ] 모든 Firebase 환경변수 설정 완료
- [ ] NEXT_PUBLIC_APP_URL 설정 완료
- [ ] 재배포 완료

### Firebase 설정
- [ ] Google 로그인 활성화 확인
- [ ] `voyage-edu-two.vercel.app` 도메인 승인 완료

### Google Cloud 설정
- [ ] OAuth 클라이언트 ID에 도메인 추가 완료
- [ ] OAuth 동의 화면에 도메인 추가 완료

### 테스트
- [ ] 배포된 사이트에서 Firebase 초기화 성공
- [ ] Google 로그인 팝업 정상 작동
- [ ] 로그인 성공 후 사용자 프로필 표시

## 🔗 빠른 링크

- [Vercel 대시보드](https://vercel.com/dashboard)
- [Firebase Console - voyage-edu](https://console.firebase.google.com/project/voyage-edu)
- [Google Cloud Console - 사용자 인증 정보](https://console.cloud.google.com/apis/credentials?project=voyage-edu)
- [배포된 사이트](https://voyage-edu-two.vercel.app/)

## 📞 추가 지원

### 상세 가이드 문서
- `VERCEL_ENV_SETUP.md` - Vercel 환경변수 설정 상세 가이드
- `FIREBASE_DOMAIN_SETUP.md` - Firebase 도메인 승인 설정 가이드
- `GOOGLE_OAUTH_SETUP.md` - Google OAuth 설정 완벽 가이드

### 디버깅 팁
1. 브라우저 캐시 지우기
2. 시크릿 모드에서 테스트
3. 다른 브라우저에서 테스트
4. 설정 변경 후 5-10분 대기

---

💡 **중요**: 모든 설정을 순서대로 완료한 후 5-10분 정도 기다린 다음 테스트하세요. 설정이 전파되는 시간이 필요합니다.

🎯 **목표**: `https://voyage-edu-two.vercel.app/`에서 Google 로그인이 정상적으로 작동하도록 하기