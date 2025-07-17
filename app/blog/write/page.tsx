"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Save, Eye, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { AuthModal } from "@/components/auth-modal"

const BLOG_CATEGORIES = ["인사이트", "회고", "트러블 슈팅", "독서"] as const

export default function BlogWritePage() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const router = useRouter()

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnail(file)
    }
  }

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.")
      return
    }

    // 임시저장 로직
    const draftPost = {
      title: title.trim(),
      category,
      content: content.trim(),
      thumbnail,
      savedAt: new Date().toISOString(),
    }

    localStorage.setItem("blog-draft", JSON.stringify(draftPost))
    alert("게시글이 임시저장되었습니다!")
  }

  const handlePublish = () => {
    if (!title.trim() || !category || !content.trim()) {
      alert("제목, 카테고리, 내용을 모두 입력해주세요.")
      return
    }

    // 새 게시글 생성
    const newPost = {
      id: Date.now().toString(),
      title: title.trim(),
      excerpt: content.trim().substring(0, 150) + "...",
      category,
      thumbnail: thumbnail ? URL.createObjectURL(thumbnail) : "/placeholder.svg?height=200&width=300",
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: Math.ceil(content.length / 200) + "분",
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9가-힣]/g, "-")
        .replace(/-+/g, "-"),
      content: content.trim(),
    }

    // 로컬 스토리지에 저장
    const existingPosts = JSON.parse(localStorage.getItem("blog-posts") || "[]")
    const updatedPosts = [newPost, ...existingPosts]
    localStorage.setItem("blog-posts", JSON.stringify(updatedPosts))

    alert("게시글이 발행되었습니다!")
    router.push("/blog")
  }

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleAuthClose = () => {
    router.push("/blog")
  }

  if (!isAuthenticated) {
    return (
      <AuthModal
        isOpen={!isAuthenticated} // Control modal directly with authentication state
        onClose={handleAuthClose}
        onSuccess={handleAuthSuccess}
        title="글 작성 권한 확인"
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">글 작성하기</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="mr-2 h-4 w-4" />
            {isPreview ? "편집" : "미리보기"}
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            임시저장
          </Button>
          <Button onClick={handlePublish}>발행하기</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  placeholder="게시글 제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOG_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>내용</CardTitle>
            </CardHeader>
            <CardContent>
              {isPreview ? (
                <div className="prose prose-neutral dark:prose-invert max-w-none min-h-[400px] p-4 border rounded-md">
                  <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br>") }} />
                </div>
              ) : (
                <Textarea
                  placeholder="마크다운 형식으로 내용을 작성하세요..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] resize-none"
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>썸네일</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                {thumbnail ? (
                  <div className="space-y-2">
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{thumbnail.name}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">썸네일 이미지를 업로드하세요</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <Label
                  htmlFor="thumbnail-upload"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer mt-2"
                >
                  파일 선택
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>파일 첨부</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2">파일을 드래그하거나 클릭하여 업로드</p>
                <input type="file" multiple className="hidden" id="file-upload" />
                <Label
                  htmlFor="file-upload"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer mt-2"
                >
                  파일 선택
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>마크다운 가이드</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div>
                <code className="bg-muted px-1 rounded"># 제목</code>
                <span className="text-muted-foreground ml-2">큰 제목</span>
              </div>
              <div>
                <code className="bg-muted px-1 rounded">## 소제목</code>
                <span className="text-muted-foreground ml-2">작은 제목</span>
              </div>
              <div>
                <code className="bg-muted px-1 rounded">**굵게**</code>
                <span className="text-muted-foreground ml-2">굵은 텍스트</span>
              </div>
              <div>
                <code className="bg-muted px-1 rounded">*기울임*</code>
                <span className="text-muted-foreground ml-2">기울임 텍스트</span>
              </div>
              <div>
                <code className="bg-muted px-1 rounded">`코드`</code>
                <span className="text-muted-foreground ml-2">인라인 코드</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
