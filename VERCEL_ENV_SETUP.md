# 🚀 Vercel 환경변수 설정 가이드

## 📋 현재 상황
- 로컬 환경에서는 Firebase 인증이 정상 작동
- 배포된 사이트 `https://voyage-edu-two.vercel.app/`에서 로그인 오류 발생
- Vercel 환경변수 설정이 필요함

## 🔧 Vercel 대시보드에서 환경변수 설정

### 1단계: Vercel 대시보드 접속
1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. `voyage-edu-two` 프로젝트 선택

### 2단계: 환경변수 설정
1. 프로젝트 페이지에서 **Settings** 탭 클릭
2. 좌측 메뉴에서 **Environment Variables** 클릭
3. 다음 환경변수들을 **하나씩** 추가:

#### Firebase 설정 (필수)
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBiDfiYNUsYao4DJs1l4LaGNhnxA8acVK4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=voyage-edu.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=voyage-edu
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=voyage-edu.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=37108519699
NEXT_PUBLIC_FIREBASE_APP_ID=1:37108519699:web:8793aed003389db317c0e6
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-LS05RY3421
```

#### 기타 API 키 (선택사항)
```
NEXT_PUBLIC_OPENWEATHER_API_KEY=5c807f36dcc552a5ab6088eddc99c6de
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyCHOlMRNowSpjgo-rfWcYuSFDupH4VoBk4
NEXT_PUBLIC_AMADEUS_API_KEY=XaNneidbgQRSo0G0AAvmZw9GZXhiZinn
NEXT_PUBLIC_AMADEUS_API_SECRET=e2BuPULWK5DfYJG8
```

#### 앱 URL 설정 (중요!)
```
NEXT_PUBLIC_APP_URL=https://voyage-edu-two.vercel.app
```

### 3단계: 환경변수 추가 방법
각 환경변수를 추가할 때:
1. **Name** 필드에 변수명 입력 (예: `NEXT_PUBLIC_FIREBASE_API_KEY`)
2. **Value** 필드에 값 입력 (예: `AIzaSyBiDfiYNUsYao4DJs1l4LaGNhnxA8acVK4`)
3. **Environments** 선택:
   - ✅ **Production** (필수)
   - ✅ **Preview** (권장)
   - ✅ **Development** (권장)
4. **Save** 버튼 클릭

### 4단계: 재배포
환경변수 설정 후 반드시 재배포 필요:
1. **Deployments** 탭으로 이동
2. 최신 배포의 **⋯** 메뉴 클릭
3. **Redeploy** 선택
4. **Redeploy** 버튼 클릭

## 🔍 환경변수 설정 확인 방법

### 브라우저에서 확인
1. `https://voyage-edu-two.vercel.app/` 접속
2. F12 개발자 도구 열기
3. **Console** 탭에서 다음 명령어 실행:
```javascript
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
});
```

### 로그인 테스트
1. **로그인하고 시작하기** 버튼 클릭
2. **Google로 시작하기** 버튼 클릭
3. 오류 메시지 확인

## 🚨 일반적인 문제와 해결방법

### 문제 1: 환경변수가 undefined
**원인**: 환경변수가 제대로 설정되지 않음
**해결**: Vercel 대시보드에서 환경변수 재확인 및 재배포

### 문제 2: Firebase 초기화 실패
**원인**: Firebase 설정값이 잘못됨
**해결**: Firebase 콘솔에서 설정값 재확인

### 문제 3: 도메인 승인 오류
**원인**: Firebase에서 도메인이 승인되지 않음
**해결**: Firebase 콘솔 > Authentication > Settings > 승인된 도메인에 `voyage-edu-two.vercel.app` 추가

## ✅ 성공 확인 체크리스트

- [ ] Vercel 대시보드에서 모든 환경변수 설정 완료
- [ ] 재배포 완료
- [ ] 배포된 사이트에서 Firebase 초기화 성공 로그 확인
- [ ] Google 로그인 버튼 클릭 시 팝업 정상 작동
- [ ] 로그인 성공 후 사용자 프로필 표시

## 🔗 유용한 링크

- [Vercel 대시보드](https://vercel.com/dashboard)
- [Firebase 콘솔](https://console.firebase.google.com/project/voyage-edu)
- [배포된 사이트](https://voyage-edu-two.vercel.app/)

---

💡 **팁**: 환경변수 설정 후 반드시 재배포를 해야 변경사항이 적용됩니다!