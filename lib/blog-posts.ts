export const MOCK_BLOG_POSTS = [
  {
    id: "1",
    title: "React 18의 새로운 기능들",
    excerpt: "React 18에서 추가된 Concurrent Features와 Suspense의 활용법에 대해 알아보겠습니다.",
    content: `
# React 18의 새로운 기능들

React 18에서는 많은 새로운 기능들이 추가되었습니다. 이번 포스트에서는 주요 기능들을 살펴보겠습니다.

## Concurrent Features

React 18의 가장 큰 변화는 Concurrent Features입니다. 이를 통해 React는 더욱 반응성이 좋은 사용자 인터페이스를 제공할 수 있게 되었습니다.

### Automatic Batching

React 18에서는 자동 배칭이 개선되었습니다. 이제 Promise, setTimeout, 네이티브 이벤트 핸들러에서도 자동으로 배칭이 적용됩니다.

\`\`\`javascript
// React 18에서는 이 모든 업데이트가 배칭됩니다
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React는 한 번만 리렌더링합니다
}
\`\`\`

### Suspense 개선사항

Suspense도 많은 개선이 있었습니다. 이제 서버 사이드 렌더링에서도 Suspense를 사용할 수 있습니다.

## 새로운 Hooks

### useId

컴포넌트에서 고유한 ID를 생성할 때 사용합니다.

\`\`\`javascript
function MyComponent() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}
\`\`\`

### useDeferredValue

값의 업데이트를 지연시켜 성능을 최적화할 수 있습니다.

## 마무리

React 18은 개발자 경험과 사용자 경험 모두를 크게 개선했습니다. 점진적으로 도입해보시기 바랍니다.
    `,
    category: "인사이트",
    thumbnail: "/placeholder.svg?height=400&width=800",
    publishedAt: "2024-01-15",
    readTime: "5분",
    slug: "react-18-new-features",
  },
  {
    id: "2",
    title: "첫 프로젝트 회고록",
    excerpt: "주니어 개발자로서 첫 프로젝트를 진행하면서 겪었던 시행착오와 배운 점들을 정리했습니다.",
    content: `
# 첫 프로젝트 회고록

주니어 개발자로서 첫 프로젝트를 진행하면서 겪었던 시행착오와 배운 점들을 정리해보겠습니다.

## 프로젝트 개요

이번 프로젝트는 React와 TypeScript를 사용한 웹 애플리케이션 개발이었습니다.

## 어려웠던 점들

### 1. 상태 관리
처음에는 useState만으로 모든 상태를 관리하려고 했지만, 컴포넌트가 복잡해지면서 한계를 느꼈습니다.

### 2. 타입스크립트
타입 정의가 어려웠지만, 점차 익숙해지면서 개발 효율성이 크게 향상되었습니다.

## 배운 점들

- 코드 리뷰의 중요성
- 테스트 코드 작성의 필요성
- 문서화의 중요성

## 앞으로의 계획

다음 프로젝트에서는 이번에 배운 점들을 적용해보겠습니다.
    `,
    category: "회고",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishedAt: "2024-01-10",
    readTime: "8분",
    slug: "first-project-retrospective",
  },
  {
    id: "3",
    title: "CORS 에러 해결하기",
    excerpt: "개발 중 자주 마주치는 CORS 에러의 원인과 다양한 해결 방법들을 정리했습니다.",
    content: `
# CORS 에러 해결하기

개발 중 자주 마주치는 CORS 에러의 원인과 다양한 해결 방법들을 정리했습니다.

## CORS란?

Cross-Origin Resource Sharing의 줄임말로, 다른 도메인의 리소스에 접근할 때 발생하는 보안 정책입니다.

## 해결 방법들

### 1. 서버에서 CORS 헤더 설정
\`\`\`javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
\`\`\`

### 2. 프록시 설정
Next.js에서는 next.config.js에서 프록시를 설정할 수 있습니다.

### 3. 개발 환경에서의 해결책
개발 중에는 브라우저 확장 프로그램을 사용하는 방법도 있습니다.

## 마무리

CORS는 보안을 위한 중요한 정책이므로, 올바른 방법으로 해결하는 것이 중요합니다.
    `,
    category: "트러블 슈팅",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishedAt: "2024-01-05",
    readTime: "6분",
    slug: "solving-cors-errors",
  },
  {
    id: "4",
    title: "클린 코드 독서 후기",
    excerpt: "로버트 C. 마틴의 클린 코드를 읽고 느낀 점과 실무에 적용해본 경험을 공유합니다.",
    content: `
# 클린 코드 독서 후기

로버트 C. 마틴의 클린 코드를 읽고 느낀 점과 실무에 적용해본 경험을 공유합니다.

## 책 소개

클린 코드는 소프트웨어 개발자라면 반드시 읽어야 할 필독서 중 하나입니다. 이 책은 단순히 코드를 작성하는 방법이 아니라, 좋은 코드를 작성하는 철학과 원칙을 다룹니다.

## 인상 깊었던 내용들

### 1. 의미 있는 이름 짓기

변수, 함수, 클래스의 이름은 그 존재 이유와 수행 기능, 사용 방법을 명확히 드러내야 합니다.

\`\`\`javascript
// 나쁜 예
const d = new Date();

// 좋은 예  
const currentDate = new Date();
\`\`\`

### 2. 함수는 작게, 한 가지만

함수는 한 가지 일만 해야 하며, 그 일을 잘 해야 합니다.

### 3. 주석보다는 코드로 의도를 표현

주석은 코드로 의도를 표현하지 못할 때만 사용해야 합니다.

## 실무 적용 경험

### Before
\`\`\`javascript
function calc(x, y, op) {
  if (op === '+') return x + y;
  if (op === '-') return x - y;
  if (op === '*') return x * y;
  if (op === '/') return x / y;
}
\`\`\`

### After
\`\`\`javascript
function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(dividend, divisor) {
  if (divisor === 0) {
    throw new Error('Cannot divide by zero');
  }
  return dividend / divisor;
}
\`\`\`

## 배운 점

1. **가독성의 중요성**: 코드는 컴퓨터보다 사람이 읽기 쉽게 작성해야 합니다.
2. **리팩토링의 필요성**: 처음부터 완벽한 코드를 작성하기는 어렵습니다. 지속적인 개선이 필요합니다.
3. **테스트의 중요성**: 클린 코드를 유지하려면 테스트 코드가 뒷받침되어야 합니다.

## 마무리

클린 코드는 단순히 기술적인 스킬이 아니라 개발자의 마음가짐과 철학에 관한 책입니다. 이 책을 통해 더 나은 개발자가 되기 위한 방향성을 찾을 수 있었습니다.

앞으로도 클린 코드의 원칙들을 실무에 적용하며, 동료 개발자들과 함께 더 나은 코드를 작성해 나가겠습니다.
    `,
    category: "독서",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishedAt: "2024-01-01",
    readTime: "10분",
    slug: "clean-code-review",
  },
  {
    id: "5",
    title: "TypeScript 타입 가드 활용법",
    excerpt: "TypeScript에서 타입 가드를 활용하여 더 안전한 코드를 작성하는 방법을 알아보겠습니다.",
    content: `
# TypeScript 타입 가드 활용법

TypeScript에서 타입 가드를 활용하여 더 안전한 코드를 작성하는 방법을 알아보겠습니다.

## 타입 가드란?

타입 가드는 런타임에서 특정 타입을 확인하여 TypeScript 컴파일러에게 타입 정보를 제공하는 기법입니다.

## 기본적인 타입 가드

### typeof 연산자

\`\`\`typescript
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // 이 블록에서 value는 string 타입
    return value.toUpperCase();
  } else {
    // 이 블록에서 value는 number 타입
    return value.toFixed(2);
  }
}
\`\`\`

### instanceof 연산자

\`\`\`typescript
class Dog {
  bark() {
    console.log('Woof!');
  }
}

class Cat {
  meow() {
    console.log('Meow!');
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // Dog 타입으로 추론
  } else {
    animal.meow(); // Cat 타입으로 추론
  }
}
\`\`\`

## 사용자 정의 타입 가드

### is 키워드 사용

\`\`\`typescript
interface User {
  id: number;
  name: string;
}

interface Admin {
  id: number;
  name: string;
  permissions: string[];
}

function isAdmin(user: User | Admin): user is Admin {
  return 'permissions' in user;
}

function handleUser(user: User | Admin) {
  if (isAdmin(user)) {
    // user는 Admin 타입으로 추론
    console.log(user.permissions);
  } else {
    // user는 User 타입으로 추론
    console.log(user.name);
  }
}
\`\`\`

## 실무 활용 예시

### API 응답 검증

\`\`\`typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { success: true; data: T } {
  return response.success && response.data !== undefined;
}

async function fetchUserData() {
  const response: ApiResponse<User> = await api.getUser();
  
  if (isSuccessResponse(response)) {
    // response.data는 User 타입으로 안전하게 사용 가능
    console.log(response.data.name);
  } else {
    console.error(response.error);
  }
}
\`\`\`

## 마무리

타입 가드를 적절히 활용하면 런타임 에러를 줄이고 더 안전한 TypeScript 코드를 작성할 수 있습니다. 특히 API 응답 처리나 사용자 입력 검증에서 매우 유용합니다.
    `,
    category: "인사이트",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishedAt: "2023-12-28",
    readTime: "7분",
    slug: "typescript-type-guards",
  },
  {
    id: "6",
    title: "Next.js 13 App Router 마이그레이션",
    excerpt: "Pages Router에서 App Router로 마이그레이션하면서 겪었던 문제들과 해결 과정을 정리했습니다.",
    content: `
# Next.js 13 App Router 마이그레이션

Pages Router에서 App Router로 마이그레이션하면서 겪었던 문제들과 해결 과정을 정리했습니다.

## 마이그레이션 배경

Next.js 13에서 도입된 App Router는 React Server Components를 기반으로 하여 더 나은 성능과 개발자 경험을 제공합니다.

## 주요 변경사항

### 1. 파일 구조 변경

**Before (Pages Router)**
\`\`\`
pages/
  index.js
  about.js
  blog/
    index.js
    [slug].js
\`\`\`

**After (App Router)**
\`\`\`
app/
  page.js
  about/
    page.js
  blog/
    page.js
    [slug]/
      page.js
\`\`\`

### 2. 데이터 페칭 방식 변경

**Before**
\`\`\`javascript
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}
\`\`\`

**After**
\`\`\`javascript
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
\`\`\`

## 겪었던 문제들

### 1. 클라이언트 컴포넌트 구분

Server Components와 Client Components를 구분하는 것이 처음에는 혼란스러웠습니다.

**해결책**: 'use client' 지시어를 명확히 사용하고, 상태나 이벤트 핸들러가 필요한 컴포넌트만 클라이언트 컴포넌트로 만들었습니다.

### 2. 레이아웃 시스템

새로운 레이아웃 시스템을 이해하는 데 시간이 걸렸습니다.

**해결책**: 공식 문서를 참고하여 layout.js 파일의 역할과 중첩 레이아웃 개념을 학습했습니다.

### 3. 라우팅 변경

동적 라우팅과 중첩 라우팅의 구조가 변경되어 기존 코드를 수정해야 했습니다.

## 마이그레이션 팁

1. **점진적 마이그레이션**: 한 번에 모든 것을 바꾸지 말고 페이지별로 점진적으로 마이그레이션
2. **공식 문서 활용**: Next.js 공식 문서의 마이그레이션 가이드를 꼼꼼히 읽기
3. **테스트 코드 작성**: 마이그레이션 과정에서 기능이 제대로 작동하는지 확인

## 마무리

App Router로의 마이그레이션은 처음에는 어려웠지만, 결과적으로 더 나은 성능과 개발자 경험을 얻을 수 있었습니다. 특히 Server Components의 장점을 활용할 수 있게 되어 만족스럽습니다.
    `,
    category: "트러블 슈팅",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishedAt: "2023-12-25",
    readTime: "12분",
    slug: "nextjs-app-router-migration",
  },
]

export const CATEGORY_COLORS = {
  인사이트: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  회고: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "트러블 슈팅": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  독서: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
} as const

// Define a type for a blog post
export type BlogPost = (typeof MOCK_BLOG_POSTS)[number]
