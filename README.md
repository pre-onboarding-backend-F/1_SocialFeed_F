# 소셜 미디어 통합 Feed 서비스 과제 (F팀)

인스타그램, 스레드, 페이스북, 트위터 등의 SNS에 게시된 게시글을 한 곳에서 확인하는 소셜 미디어 통합 Feed 서비스

## 목차

-   [개요](#개요)
-   [기술 스택](#기술-스택)
-   [실행 스크립트](#실행-스크립트)
-   [API 명세](#api-명세)
-   [프로젝트 진행 및 이슈 관리](#프로젝트-진행-및-이슈-관리)
-   [구현과정(설계 및 의도)](#구현과정설계-및-의도)
-   [TIL](#til)

## 개요

소셜 미디어 통합 Feed 서비스란?

-   인스타그램, 스레드, 페이스북, 트위터 등 다양한 SNS에 게시된 게시글 중 유저의 해시태그(유저 계정)가 포함된 게시글들을 한 곳에서 확인할 수 있는 서비스입니다.
-   이 서비스를 통해 유저는 자신의 계정이 해시태그로 포함된, 다양한 SNS의 게시글들을 확인할 수 있으며 다른 해시태그나 게시글을 검색할 수 있습니다.
-   또한 해시태그가 포함된 게시글들의 다양한 통계 정보를 확인할 수 있습니다.

## 기술 스택

언어 및 프레임워크: ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)</br>
데이터베이스: ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)</br>
개발환경: ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)</br>

## 실행 스크립트

```bash
# docker 빌드
npm run build:docker

# docker 실행
npm run start:docker
```

## API 명세

TODO: 작성 필요

### 유저 API

<details>
<summary>회원가입</summary>

#### Request

##### endpoint

```
POST /users;
```

##### Body

```
{
	"account": "사용자 계정",
	"password": "사용자 비밀번호",
	"email": "사용자 이메일"
}
```

#### Response

##### Success

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

##### Fail

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

</details>

<details>
<summary>가입승인</summary>

#### Request

##### endpoint

```
POST /users/approve;
```

##### Body

```
{
	"account": "사용자 계정",
	"password": "사용자 비밀번호",
	"email": "사용자 이메일"
}
```

#### Response

##### Success

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

##### Fail

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

</details>

<details>
<summary>로그인</summary>

#### Request

##### endpoint

```
POST /users/signin;
```

##### Body

```
{
	"account": "사용자 계정",
	"password": "사용자 비밀번호",
	"email": "사용자 이메일"
}
```

#### Response

##### Success

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

##### Fail

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

</details>

### 게시글 API

<details>
<summary>게시글 생성</summary>

#### Request

##### endpoint

```
POST /posts;
```

##### Body

```
{
	"account": "사용자 계정",
	"password": "사용자 비밀번호",
	"email": "사용자 이메일"
}
```

#### Response

##### Success

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

##### Fail

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

</details>

<details>
<summary>게시글 목록 조회</summary>

#### Request

##### endpoint

```
GET /posts;
```

##### Body

```
{
	"account": "사용자 계정",
	"password": "사용자 비밀번호",
	"email": "사용자 이메일"
}
```

#### Response

##### Success

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

##### Fail

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

</details>

<details>
<summary>게시글 상세 조회</summary>

#### Request

##### endpoint

```
GET /posts;
```

##### Body

```
{
	"account": "사용자 계정",
	"password": "사용자 비밀번호",
	"email": "사용자 이메일"
}
```

#### Response

##### Success

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

##### Fail

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

</details>

<details>
<summary>게시글 통계</summary>

#### Request

##### endpoint

```
GET /posts/statistics;
```

##### Body

```
{
	"account": "사용자 계정",
	"password": "사용자 비밀번호",
	"email": "사용자 이메일"
}
```

#### Response

##### Success

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

##### Fail

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

</details>

<details>
<summary>게시글 좋아요</summary>

#### Request

##### endpoint

```
PATCH /posts/likes;
```

##### Body

```
{
	"account": "사용자 계정",
	"password": "사용자 비밀번호",
	"email": "사용자 이메일"
}
```

#### Response

##### Success

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

##### Fail

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

</details>

<details>
<summary>게시글 공유</summary>

#### Request

##### endpoint

```
PATCH /posts/share;
```

##### Body

```
{
	"account": "사용자 계정",
	"password": "사용자 비밀번호",
	"email": "사용자 이메일"
}
```

#### Response

##### Success

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

##### Fail

```http
HTTP/1.1 200
Content-Type: application/json

[{
    "id": 10,
    "name": "shirt",
    "color": "red",
    "price": "$23"
},...
]
```

</details>

## 프로젝트 진행 및 이슈 관리

[![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)](https://www.notion.so/1_SocialFeed_F-07ec7e373d874d2e8c693c76720e99f1?pvs=4)</br>

## 구현과정(설계 및 의도)

TODO: 작성 필요

## TIL

-   [팀 노션 페이지 TIL](https://www.notion.so/ce558ed53c1e46d38f34d66cb0a55087?v=8d07b98179a448ceb5e2e32284ceb906&pvs=4)
