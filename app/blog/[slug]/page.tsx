"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"

// Mock data - 실제로는 데이터베이스에서 가져올 데이터
const BLOG_POSTS = [
  {
    id: "1",
    title: "React 18의 새로운 기능들",
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
    thumbnail: "/placeholder.svg?height=400&width=800",
    publishedAt: "2024-01-10",
    readTime: "8분",
    slug: "first-project-retrospective",
  },
  {
    id: "3",
    title: "CORS 에러 해결하기",
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
    thumbnail: "/placeholder.svg?height=400&width=800",
    publishedAt: "2024-01-05",
    readTime: "6분",
    slug: "solving-cors-errors",
  },
]

const CATEGORY_COLORS = {
  인사이트: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  회고: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "트러블 슈팅": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  독서: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
} as const

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<any>(null)
  const [allPosts, setAllPosts] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [slug, setSlug] = useState<string>("")

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (!slug) return

    // "write"는 특별한 경로이므로 404 처리
    if (slug === "write") {
      notFound()
    }

    // 로컬 스토리지에서 저장된 게시글 불러오기
    const savedPosts = JSON.parse(localStorage.getItem("blog-posts") || "[]")
    const combinedPosts = [...savedPosts, ...BLOG_POSTS]
    setAllPosts(combinedPosts)

    // 현재 게시글 찾기
    const foundPost = combinedPosts.find((p) => p.slug === slug)
    if (!foundPost) {
      notFound()
    }

    setPost(foundPost)

    // 현재 게시글의 인덱스 찾기 (최신 글이 먼저 오므로)
    const index = combinedPosts.findIndex((p) => p.slug === slug)
    setCurrentIndex(index)
  }, [slug])

  if (!post) {
    return <div>Loading...</div>
  }

  const renderMarkdown = (content: string) => {
    return (
      content
        // 코드 블록 처리 (\`\`\`로 감싸진 부분)
        .replace(
          /```(\w+)?\n([\s\S]*?)```/g,
          '<pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>',
        )
        // 인라인 코드 처리
        .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
        // 볼드 텍스트
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        // 이탤릭 텍스트
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        // 헤더 처리
        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>')
        // 링크 처리
        .replace(
          /\[([^\]]+)\]$$([^)]+)$$/g,
          '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
        )
        // 리스트 처리
        .replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>')
        .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$1. $2</li>')
        // 줄바꿈 처리
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/\n/g, "<br>")
        // 문단 래핑
        .replace(/^(?!<[h1-6]|<pre|<li|<\/p>)(.+)/gm, '<p class="mb-4">$1</p>')
    )
  }

  // 이전 글과 다음 글 계산
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            블로그로 돌아가기
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="space-y-6 mb-8">
        <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
          <Image src={post.thumbnail || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className={CATEGORY_COLORS[post.category as keyof typeof CATEGORY_COLORS]}>
              {post.category}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(post.publishedAt).toLocaleDateString("ko-KR")}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {post.readTime}
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted rounded-full" />
              <span className="text-sm font-medium">김개발</span>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              공유하기
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardContent className="p-8">
          <div
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(post.content),
            }}
          />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-12 flex justify-between">
        <div className="flex-1">
          {prevPost && (
            <Button variant="outline" asChild>
              <Link href={`/blog/${prevPost.slug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">이전 글</div>
                  <div className="truncate max-w-[200px]">{prevPost.title}</div>
                </div>
              </Link>
            </Button>
          )}
        </div>

        <div className="flex-1 flex justify-end">
          {nextPost && (
            <Button variant="outline" asChild>
              <Link href={`/blog/${nextPost.slug}`}>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">다음 글</div>
                  <div className="truncate max-w-[200px]">{nextPost.title}</div>
                </div>
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
