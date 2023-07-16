# [Fittrix.io](http://Fittrix.io) FE 사전 과제 Readme.md

# O-UN-WAN (오운완)
### [Live Demo](https://ouw.t0dd.kr, "live demo link")

### Preview
![image](https://github.com/t0dd-kr/o-un-wan/assets/28590190/dee0073f-0a06-4449-8550-8bdadd27161c)
![image](https://github.com/t0dd-kr/o-un-wan/assets/28590190/2d347bcb-c36f-48f1-ab29-8f18fd9e4669)

## 개요

본 Repo는 피트릭스 FE 포지션 지원을 위한 사전 과제입니다.

주제는 운동기반 SNS 서비스이며, 인스타그램처럼 사진을 위주로 포스팅하는 것이 메인 서비스입니다. 운동 유형을 설정해 사진을 업로드하며, 날짜별로 "오운완"을 기록할 수 있습니다.

## 문제 해결을 위한 아이디어 요약

### 프로세스 항목

- [x]  유저 로그인
- [x]  사진 그리드 뷰
    - [x]  정렬 기준
        - [x]  업로드 시간으로 내림/오름차순 정렬 (기본)
        - [x]  댓글 생성된 시간으로 내림/오름차순 정렬
    - [x]  운동 유형 필터링
    - [x]  인피니트 스크롤을 위한 페이지네이션 수행
    - [x]  댓글 갯수 노출
    - [x]  사진 묶음 여부 노출
- [x]  사진 업로드
    - [x]  운동 유형 선택
    - [x]  상태 메세지 입력
    - [x]  5개 까지 업로드 가능
- [x]  사진 보기 (상세 팝업)
    - [x]  화면 상단 업로드 날짜 표시 & 네비게이션 버튼
    - [x]  5개 까지의 사진을 캐러셀로 보여줌
        - [x]  이전/다음 버튼으로 컨트롤하고, Rotating은 되지 않음
    - [x]  댓글 노출 (5개 까지)

### 작업 리스트 항목

- [x]  스키마 설계
    - [x]  유저
    - [x]  포스팅
    - [x]  댓글
- [x]  API 구현
- [x]  페이지 구성
    - [x]  로그인 - /signin
    - [x]  사진 그리드 뷰 - /
    - [x]  사진 업로드 - /new (팝업)
    - [x]  사진 상세 - /[uid] (팝업)
- [ ]  테스팅 코드 작성

## API 설계

### 로그인 `POST /api/signin`

아이디를 입력 받아 로그인 후, 세션을 생성합니다.

```tsx
// Request Body
{
	identify: string
}
```

### 세션 조회 `GET /api/whoami`

내 정보를 가져옴

```tsx
// Response
{
	identify: string,
	uid: string
}
```

### 게시글 목록 조회 `GET /api/posts`

게시글 목록 조회

- `skip`, `take`로 페이지네이션
- `filterBy` 로 운동 유형 필터링 (`ALL`, `BENCH_PRESS`, `LUNGE`, `RUNNING`, `ETC` 중에 선택 가능)
- `sortBy` 로 정렬 (`CREATED_AT__DESC`, `CREATED_AT__ASC`, `LAST_COMMENTED_AT__DESC`, `LAST_COMMENTED_AT__ASC` 중에 선택 가능)

```tsx
// Request Query
{
	skip: number,
	take: number,
	filterBy: 'ALL' | 'SQUAT' | 'BENCH_PRESS' | 'LUNGE' | 'RUNNGING' | 'ETC',
	sortBy: 'CREATED_AT__DESC' | 'CREATED_AT__ASC' | 'LAST_COMMENTED_AT__DESC' | 'LAST_COMMENTED_AT__ASC'
}
```

```tsx
// Response
[{
	uid: string,
	images: string[],
	content: string,
	exerciseType: 'SQUAT' | 'BENCH_PRESS' | 'LUNGE' | 'RUNNGING' | 'ETC',
	userUid: string,
	createdAt: Date,
	lastCommentedAt: Date,
	identify: string,
	commentCount: number
}]
```

### 게시글 작성 `POST /api/posts`

```tsx
// Request Body
{
	images: string[],
	content: string,
	exerciseType: 'SQUAT' | 'BENCH_PRESS' | 'LUNGE' | 'RUNNGING' | 'ETC',
}
```

### 게시글 조회 `GET /api/posts/[postUid]`

게시글 조회 (댓글 목록 포함)

- `skip`, `take`로 페이지네이션
- `filterBy` 로 운동 유형 필터링 (`ALL`, `BENCH_PRESS`, `LUNGE`, `RUNNING`, `ETC` 중에 선택 가능)
- `sortBy` 로 정렬 (`CREATED_AT__DESC`, `CREATED_AT__ASC`, `LAST_COMMENTED_AT__DESC`, `LAST_COMMENTED_AT__ASC` 중에 선택 가능)

```tsx
// Response
{
	uid: string,
	images: string[],
	content: string,
	exerciseType: 'SQUAT' | 'BENCH_PRESS' | 'LUNGE' | 'RUNNGING' | 'ETC',
	userUid: string,
	createdAt: Date,
	lastCommentedAt: Date,
	identify: string,
	comments: [{
		identify: string,
		content: string,
		createdAt: Date
	}]
}
```

### 게시글 수정 `PUT /api/posts/[postUid]`

```tsx
// Request Body
{
	content: string,
}
```

### 게시글 삭제 `DELETE /api/posts/[postUid]`

게시글 삭제 및 하위 댓글 일괄 삭제, `user` 에 `isManager` 로 권한이 있는 지 검사 후, 관리자만 삭제 가능

### 댓글 작성 `POST /api/posts/[postUid]/comments`

댓글 작성, 상위 게시글의 `lastCommentedAt` 을 댓글 작성 시점으로 업데이트

```tsx
// Request Body
{
	content: string,
}
```

### 댓글 수정 `PUT /api/posts/[postUid]/comments/[commentUid]`

```tsx
// Request Body
{
	content: string,
}
```

### 댓글 삭제 `DELETE /api/posts/[postUid]/comments/[commentUid]`

댓글 삭제, `user` 에 `isManager` 로 권한이 있는 지 검사 후, 관리자만 삭제 가능

---

## 개발 환경

### 브라우저

- Google Chrome 버전 114.0.5735.198(공식 빌드) (arm64)

### FE

- Nuxt
- Vue
- TailwindCSS
- DaisyUI
- Zod
- Pinia

### BE

- Nuxt (h3)
- Mongo
- Zod
- [Filestack.com](http://Filestack.com) (CDN)

### 배포 환경

- Synology NAS
- Docker
    - Node.js (node@lastest)
    - MongoDB (mongo@latest)
- Cloudflare

## 프로젝트 빌드 & 테스트 & 실행 방법

```powershell
# dev 서버 실행
yarn dev

# 빌드
yarn build

# 실행
yarn start
```

## 미해결 이슈 정리

- [x]  ~~라이브 데모에서 파일 업로드가 안되는 문제~~
    
    → 기존 multer로 업로드하도록 배포 했으나, 배포 후 정적 파일이 불러와지지 않아 stackfile.com라는 무료 CDN 서비스를 사용해 파일 업로드 구현 후 해결
    
- [x]  ~~댓글에 기본 정렬 순서가 없음~~
    
    → CREATED_AT__DESC 정책으로 구현 완료
    
- [ ]  팝업이 뜬 이후에도, 목록이 스크롤 됨
