"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { MOCK_BLOG_POSTS, type BlogPost, CATEGORY_COLORS } from "@/lib/blog-posts"

interface BlogPostPageProps {
  params: { slug: string }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params
  const [post, setPost] = useState<BlogPost | null>(null)
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)

  useEffect(() => {
    if (slug === "write") {
      notFound()
      return
    }

    if (typeof window !== "undefined") {
      const savedPosts: BlogPost[] = JSON.parse(localStorage.getItem("blog-posts") || "[]")
      const combinedPosts = [...savedPosts, ...MOCK_BLOG_POSTS]
      const uniquePosts = Array.from(new Map(combinedPosts.map((p) => [p.slug, p])).values())

      const postData = uniquePosts.find((p) => p.slug === slug)

      if (!postData) {
        notFound()
        return
      }

      setPost(postData)

      const sortedPosts = [...uniquePosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      setAllPosts(sortedPosts)
      setCurrentIndex(sortedPosts.findIndex((p) => p.slug === slug))
    }
  }, [slug])

  if (!post) {
    // Provide a loading state until client-side hydration is complete
    return <div>Loading post...</div>
  }

  const renderMarkdown = (content: string) => {
    return (
      content
        // Code blocks
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        // Italic
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        // Headers
        .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>')
        // Links
        .replace(
          /\[([^\]]+)\]$([^)]+)$/g,
          '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
        )
        // Lists
        .replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>')
        .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$1. $2</li>')
        // Newlines and paragraphs
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/\n/g, "<br>")
        .replace(/^(?!<[h1-6]|<pre|<li|<\/p>)(.+)/gm, '<p class="mb-4">$1</p>')
    )
  }

  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            블로그로 돌아가기
          </Link>
        </Button>
      </div>

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

      <Card>
        <CardContent className="p-8">
          <div
            className="prose prose-neutral dark:prose-invert max-w-none blog-content"
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(post.content),
            }}
          />
        </CardContent>
      </Card>

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
