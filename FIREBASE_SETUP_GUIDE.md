# 🔥 Firebase 구글 로그인 설정 가이드

## 📋 현재 상태
✅ Firebase 프로젝트 연결 완료  
✅ 환경 변수 설정 완료  
✅ 로컬 개발 서버 실행 완료 (http://localhost:3001)  
✅ Firebase SDK 초기화 성공  
✅ Firestore 보안 규칙 배포 완료  

## 🚀 구글 로그인 활성화 단계 (필수)

### 1. Firebase 콘솔 접속
1. [Firebase 콘솔](https://console.firebase.google.com) 접속
2. `voyage-edu` 프로젝트 선택

### 2. Authentication 설정 (중요!)
1. 좌측 메뉴에서 **Authentication** 클릭
2. **Sign-in method** 탭 선택
3. **Google** 제공업체 클릭
4. **사용 설정** 토글을 **활성화** (이 단계가 필수입니다!)
5. **프로젝트 공개용 이름** 입력: `Voyage Edu`
6. **프로젝트 지원 이메일** 선택 (본인 이메일)
7. **저장** 클릭

### 3. 승인된 도메인 추가 (중요!)
1. Authentication > Settings > **승인된 도메인** 섹션으로 이동
2. **도메인 추가** 버튼 클릭
3. `localhost` 입력하고 추가 (포트 번호 없이)
4. 다음 도메인들이 모두 추가되어 있는지 확인:
   - ✅ `localhost` (로컬 개발용 - 필수!)
   - ✅ `voyage-edu.firebaseapp.com` (기본 도메인)
   - 배포할 도메인 (예: `your-domain.com`)

### 4. 로컬 개발 환경 테스트
1. 브라우저에서 http://localhost:3001 접속
2. **로그인하고 시작하기** 버튼 클릭
3. **Google로 시작하기** 버튼 클릭
4. 구글 계정 선택 및 권한 승인

## 🔧 문제 해결

### 일반적인 오류와 해결방법

#### 1. `auth/unauthorized-domain` 오류
**원인**: 승인되지 않은 도메인에서 로그인 시도  
**해결**: Firebase 콘솔 > Authentication > Settings > 승인된 도메인에 `localhost` 추가

#### 2. `auth/operation-not-allowed` 오류
**원인**: Google 로그인이 비활성화됨  
**해결**: Firebase 콘솔 > Authentication > Sign-in method에서 Google 활성화

#### 3. `auth/popup-closed-by-user` 오류
**원인**: 사용자가 로그인 팝업을 닫음  
**해결**: 정상적인 사용자 행동, 다시 시도하면 됨

#### 4. `auth/network-request-failed` 오류
**원인**: 네트워크 연결 문제  
**해결**: 인터넷 연결 확인

## 📱 테스트 시나리오

### 1. 구글 로그인 테스트
1. 로그인 모달 열기
2. "Google로 시작하기" 클릭
3. 구글 계정 선택
4. 권한 승인
5. 로그인 성공 확인

### 2. 사용자 프로필 확인
1. 로그인 후 우상단 프로필 아이콘 클릭
2. 사용자 정보 표시 확인
3. 포인트 및 업적 시스템 작동 확인

### 3. 로그아웃 테스트
1. 프로필 메뉴에서 로그아웃 클릭
2. 로그아웃 확인
3. 다시 로그인 가능 확인

## 🎯 추가 기능

### 이메일/비밀번호 로그인 (이미 구현됨)
- 회원가입 기능
- 이메일 인증 (선택사항)
- 비밀번호 재설정 (향후 구현 가능)

### 사용자 프로필 관리
- 이름, 학년, 학교 정보 수정
- 프로필 사진 업로드 (향후 구현 가능)
- 여행 계획 저장 및 관리

## 🔒 보안 설정

### Firestore 보안 규칙 (권장)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자는 자신의 문서만 읽기/쓰기 가능
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 여행 계획은 작성자만 접근 가능
    match /travelPlans/{planId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Firebase 콘솔의 Authentication 설정
2. 브라우저 개발자 도구의 콘솔 로그
3. 네트워크 연결 상태
4. 환경 변수 설정

---

**🎉 설정 완료 후 http://localhost:3001에서 구글 로그인을 테스트해보세요!**