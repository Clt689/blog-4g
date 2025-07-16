"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AuthModal } from "@/components/auth-modal"
import { MOCK_BLOG_POSTS, type BlogPost } from "@/lib/blog-posts"

const BLOG_CATEGORIES = ["전체", "인사이트", "회고", "트러블 슈팅", "독서"] as const

const CATEGORY_COLORS = {
  인사이트: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  회고: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "트러블 슈팅": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  독서: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
} as const

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체")
  const [searchQuery, setSearchQuery] = useState("")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS) // Initialize with static posts
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authAction, setAuthAction] = useState<"write" | "delete">("write")
  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only access localStorage on the client
      const savedPosts: BlogPost[] = JSON.parse(localStorage.getItem("blog-posts") || "[]")

      // Combine and ensure uniqueness, then sort by publishedAt in descending order (most recent first)
      const combinedPosts = [...savedPosts, ...MOCK_BLOG_POSTS]
      const uniqueCombinedPosts = Array.from(new Map(combinedPosts.map((item) => [item["slug"], item])).values())
      uniqueCombinedPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

      setBlogPosts(uniqueCombinedPosts)
    } else {
      // On server, just use the static posts, sorted
      const sortedStaticPosts = [...MOCK_BLOG_POSTS].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      setBlogPosts(sortedStaticPosts)
    }
  }, [])

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleWriteClick = () => {
    setAuthAction("write")
    setShowAuthModal(true)
  }

  const handleDeleteClick = (postId: string) => {
    setAuthAction("delete")
    setPostToDelete(postId)
    setShowAuthModal(true)
  }

  const handleAuthSuccess = () => {
    if (authAction === "write") {
      window.location.href = "/blog/write"
    } else if (authAction === "delete" && postToDelete) {
      // 로컬 스토리지에서 게시글 삭제
      const savedPosts = JSON.parse(localStorage.getItem("blog-posts") || "[]")
      const updatedPosts = savedPosts.filter((post: any) => post.id !== postToDelete)
      localStorage.setItem("blog-posts", JSON.stringify(updatedPosts))

      // 상태 업데이트
      setBlogPosts(blogPosts.filter((post) => post.id !== postToDelete))
      setPostToDelete(null)
      alert("게시글이 삭제되었습니다.")
    }
  }

  const isUserPost = (postId: string) => {
    const savedPosts: BlogPost[] = JSON.parse(localStorage.getItem("blog-posts") || "[]")
    return savedPosts.some((post: BlogPost) => post.id === postId)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">블로그</h1>
          <p className="text-muted-foreground">개발하면서 배운 것들을 기록합니다</p>
        </div>
        <Button onClick={handleWriteClick}>
          <Plus className="mr-2 h-4 w-4" />글 작성하기
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
          <div key={post.id} className="relative group">
            <Link href={`/blog/${post.slug}`} className="block">
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer h-full">
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
                      <Badge
                        variant="secondary"
                        className={CATEGORY_COLORS[post.category as keyof typeof CATEGORY_COLORS]}
                      >
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>

                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>

                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString("ko-KR")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Delete Button for User Posts */}
            {isUserPost(post.id) && (
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault()
                  handleDeleteClick(post.id)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">검색 결과가 없습니다.</p>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        title={authAction === "write" ? "글 작성 권한 확인" : "글 삭제 권한 확인"}
      />
    </div>
  )
}
