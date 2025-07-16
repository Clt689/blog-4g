"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MOCK_BLOG_POSTS, CATEGORY_COLORS, type BlogPost } from "@/lib/blog-posts"

export default function HomePage() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS.slice(0, 6)) // Initialize with static posts

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only access localStorage on the client
      const savedPosts: BlogPost[] = JSON.parse(localStorage.getItem("blog-posts") || "[]")
      if (savedPosts.length > 0) {
        const combinedPosts = [...savedPosts, ...MOCK_BLOG_POSTS]
        // Ensure uniqueness and sort by publishedAt in descending order
        const uniqueCombinedPosts = Array.from(new Map(combinedPosts.map((item) => [item["slug"], item])).values())
        uniqueCombinedPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        setRecentPosts(uniqueCombinedPosts.slice(0, 6)) // 최신 6개만 표시
      } else {
        // If no saved posts, just use the static ones, sorted and sliced
        const sortedStaticPosts = [...MOCK_BLOG_POSTS].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        )
        setRecentPosts(sortedStaticPosts.slice(0, 6))
      }
    }
  }, [])

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">안녕하세요! 👋</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          주니어 프론트엔드 개발자의 성장 기록을 담은 블로그입니다.
          <br />
          배운 것들을 정리하고 경험을 공유합니다.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/blog">
              블로그 둘러보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">소개 보기</Link>
          </Button>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">최근 게시글</h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">
              전체 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
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
          ))}
        </div>
      </section>
    </div>
  )
}
