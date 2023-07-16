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

- [x] 유저 로그인
- [x] 사진 그리드 뷰
  - [x] 정렬 기준
    - [x] 업로드 시간으로 내림/오름차순 정렬 (기본)
    - [x] 댓글 생성된 시간으로 내림/오름차순 정렬
  - [x] 운동 유형 필터링
  - [x] 인피니트 스크롤을 위한 페이지네이션 수행
  - [x] 댓글 갯수 노출
  - [x] 사진 묶음 여부 노출
- [x] 사진 업로드
  - [x] 운동 유형 선택
  - [x] 상태 메세지 입력
  - [x] 5개 까지 업로드 가능
- [x] 사진 보기 (상세 팝업)
  - [x] 화면 상단 업로드 날짜 표시 & 네비게이션 버튼
  - [x] 5개 까지의 사진을 캐러셀로 보여줌
    - [x] 이전/다음 버튼으로 컨트롤하고, Rotating은 되지 않음
  - [x] 댓글 노출 (5개 까지)

### 작업 리스트 항목

- [x] 스키마 설계
  - [x] 유저
  - [x] 포스팅
  - [x] 댓글
- [x] API 구현
- [x] 페이지 구성
  - [x] 로그인 - /signin
  - [x] 사진 그리드 뷰 - /
  - [x] 사진 업로드 - /new (팝업)
  - [x] 사진 상세 - /[uid] (팝업)
- [ ] 테스팅 코드 작성

### API 설계

로그인

| Method | URI         | Query | Body         | Description                            |
| ------ | ----------- | ----- | ------------ | -------------------------------------- |
| POST   | /api/signin |       | { identify } | 아이디를 입력 받아 로그인 후 세션 생성 |

포스팅

| Method | URI | Query | Body | Description |
| ------ | --- | ----- | ---- | ----------- |

댓글

| Method | URI | Query | Body | Description |
| ------ | --- | ----- | ---- | ----------- |

`GET /api/posts`

`GET /api/posts/[postUid]`

`POST /api/posts`

`PUT /api/posts/[postUid]`

`DELETE /api/posts/[postUid]`

---

- 댓글

`POST /api/posts/[postUid]/comments`

`PUT /api/posts/[postUid]/comments/[commentUid]`

`DELETE /api/posts/[postUid]/comments/[commentUid]`

## 개발 환경

### FE

- Nuxt
- Vue
- TailwindCss
- DaisyUI
- Zod

### BE

- Nuxt (h3)
- Zod

### 환경 구성

- MongoDB

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
- 
