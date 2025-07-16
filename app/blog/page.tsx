"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const BLOG_CATEGORIES = ["전체", "인사이트", "회고", "트러블 슈팅", "독서"] as const

// Mock data
const BLOG_POSTS = [
  {
    id: "1",
    title: "React 18의 새로운 기능들",
    excerpt: "React 18에서 추가된 Concurrent Features와 Suspense의 활용법에 대해 알아보겠습니다.",
    category: "인사이트",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishedAt: "2024-01-15",
    readTime: "5분",
    slug: "react-18-new-features",
  },
  {
    id: "2",
    title: "첫 프로젝트 회고록",
    excerpt: "주니어 개발자로서 첫 프로젝트를 진행하면서 겪었던 시행착오와 배운 점들을 정리했습니다.",
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
    category: "트러블 슈팅",
    thumbnail: "/placeholder.svg?height=200&width=300",
    publishedAt: "2023-12-25",
    readTime: "12분",
    slug: "nextjs-app-router-migration",
  },
]

const CATEGORY_COLORS = {
  인사이트: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  회고: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "트러블 슈팅": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  독서: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
} as const

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">블로그</h1>
          <p className="text-muted-foreground">개발하면서 배운 것들을 기록합니다</p>
        </div>
        <Button asChild>
          <Link href="/blog/write">
            <Plus className="mr-2 h-4 w-4" />글 작성하기
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="검색어를 입력하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={post.thumbnail || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className={CATEGORY_COLORS[post.category as keyof typeof CATEGORY_COLORS]}>
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>

                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>

                <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(post.publishedAt).toLocaleDateString("ko-KR")}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
