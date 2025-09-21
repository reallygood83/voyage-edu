# 🔥 Firebase 도메인 승인 설정 가이드

## 📋 현재 상황
- 로컬 환경 (`localhost:3001`)에서는 로그인 정상 작동
- 배포된 사이트 (`https://voyage-edu-two.vercel.app/`)에서 로그인 오류 발생
- Firebase Console에서 도메인 승인 설정이 필요함

## 🚀 Firebase Console 도메인 승인 설정

### 1단계: Firebase Console 접속
1. [Firebase Console](https://console.firebase.google.com/) 접속
2. **voyage-edu** 프로젝트 선택

### 2단계: Authentication 설정 확인
1. 좌측 메뉴에서 **Authentication** 클릭
2. **Sign-in method** 탭 선택
3. **Google** 제공업체 상태 확인:
   - ✅ **사용 설정됨** 상태여야 함
   - ❌ 비활성화 상태라면 클릭하여 활성화

### 3단계: 승인된 도메인 설정 (중요!)
1. **Authentication** > **Settings** 탭 클릭
2. **승인된 도메인** 섹션으로 스크롤
3. 현재 승인된 도메인 목록 확인

#### 필수 도메인 목록
다음 도메인들이 **모두** 승인되어 있어야 합니다:

```
✅ localhost (로컬 개발용)
✅ voyage-edu.firebaseapp.com (Firebase 기본 도메인)
✅ voyage-edu-two.vercel.app (Vercel 배포 도메인) ← 중요!
```

### 4단계: 도메인 추가 방법
만약 `voyage-edu-two.vercel.app`이 목록에 없다면:

1. **도메인 추가** 버튼 클릭
2. 도메인 입력: `voyage-edu-two.vercel.app`
3. **추가** 버튼 클릭
4. 도메인이 목록에 추가되었는지 확인

### 5단계: Google OAuth 설정 확인
1. **Authentication** > **Sign-in method** 탭
2. **Google** 제공업체 클릭
3. 설정 확인:
   - **사용 설정**: ✅ 활성화
   - **프로젝트 공개용 이름**: `Voyage Edu`
   - **프로젝트 지원 이메일**: 설정됨
4. **저장** 클릭 (변경사항이 있는 경우)

## 🔍 Google Cloud Console 추가 설정

### OAuth 동의 화면 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. **voyage-edu** 프로젝트 선택
3. **API 및 서비스** > **OAuth 동의 화면** 이동
4. **승인된 도메인** 섹션에서 다음 확인:
   - `voyage-edu-two.vercel.app` 추가
   - `vercel.app` 추가 (Vercel 서브도메인용)

### OAuth 클라이언트 ID 설정
1. **API 및 서비스** > **사용자 인증 정보** 이동
2. OAuth 2.0 클라이언트 ID 찾기
3. **승인된 JavaScript 원본**에 다음 추가:
   ```
   https://voyage-edu-two.vercel.app
   ```
4. **승인된 리디렉션 URI**에 다음 추가:
   ```
   https://voyage-edu-two.vercel.app/__/auth/handler
   ```

## 🧪 테스트 시나리오

### 1단계: 로컬 환경 테스트
1. `http://localhost:3001` 접속
2. Google 로그인 테스트
3. 정상 작동 확인

### 2단계: 배포 환경 테스트
1. `https://voyage-edu-two.vercel.app/` 접속
2. F12 개발자 도구 열기
3. **Console** 탭에서 Firebase 초기화 로그 확인
4. Google 로그인 테스트

### 3단계: 오류 확인
로그인 시도 시 다음 오류가 발생하지 않아야 함:
- ❌ `auth/unauthorized-domain`
- ❌ `auth/operation-not-allowed`
- ❌ `auth/popup-blocked`

## 🚨 일반적인 문제와 해결방법

### 문제 1: `auth/unauthorized-domain` 오류
```
Firebase: Error (auth/unauthorized-domain).
```
**해결방법:**
1. Firebase Console > Authentication > Settings > 승인된 도메인
2. `voyage-edu-two.vercel.app` 추가
3. Google Cloud Console > OAuth 동의 화면 > 승인된 도메인에도 추가

### 문제 2: `auth/operation-not-allowed` 오류
```
Firebase: Error (auth/operation-not-allowed).
```
**해결방법:**
1. Firebase Console > Authentication > Sign-in method
2. Google 제공업체 활성화
3. 프로젝트 공개용 이름 및 지원 이메일 설정

### 문제 3: OAuth 클라이언트 설정 오류
**해결방법:**
1. Google Cloud Console > API 및 서비스 > 사용자 인증 정보
2. OAuth 2.0 클라이언트 ID 편집
3. 승인된 JavaScript 원본 및 리디렉션 URI 추가

## ✅ 설정 완료 체크리스트

### Firebase Console
- [ ] Google 로그인 활성화 확인
- [ ] `localhost` 도메인 승인 확인
- [ ] `voyage-edu.firebaseapp.com` 도메인 승인 확인
- [ ] `voyage-edu-two.vercel.app` 도메인 추가 및 승인

### Google Cloud Console
- [ ] OAuth 동의 화면에 도메인 추가
- [ ] OAuth 클라이언트 ID에 JavaScript 원본 추가
- [ ] OAuth 클라이언트 ID에 리디렉션 URI 추가

### 테스트
- [ ] 로컬 환경에서 Google 로그인 성공
- [ ] 배포 환경에서 Google 로그인 성공
- [ ] 오류 메시지 없음

## 🔗 유용한 링크

- [Firebase Console - voyage-edu](https://console.firebase.google.com/project/voyage-edu)
- [Google Cloud Console - voyage-edu](https://console.cloud.google.com/apis/credentials?project=voyage-edu)
- [배포된 사이트](https://voyage-edu-two.vercel.app/)

---

💡 **중요**: 도메인 설정 변경 후 몇 분 정도 기다린 후 테스트하세요. 설정이 전파되는 시간이 필요합니다.