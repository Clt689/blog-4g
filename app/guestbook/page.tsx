"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MessageSquare } from "lucide-react"

// Mock data
const GUESTBOOK_ENTRIES = [
  {
    id: "1",
    nickname: "개발자A",
    message: "블로그 정말 잘 보고 있습니다! 특히 React 관련 글들이 도움이 많이 되네요. 앞으로도 좋은 글 부탁드려요!",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    nickname: "주니어개발자",
    message: "같은 주니어 개발자로서 많은 공감이 되는 글들이에요. 회고록 글 보고 많은 동기부여 받았습니다. 감사합니다!",
    createdAt: "2024-01-14T15:20:00Z",
  },
  {
    id: "3",
    nickname: "프론트엔드러버",
    message: "TypeScript 관련 글이 정말 유용했어요. 실무에서 바로 적용해볼 수 있는 내용들이라 좋았습니다!",
    createdAt: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    nickname: "코딩초보",
    message: "설명이 정말 쉽고 이해하기 좋게 되어있어요. 초보자도 따라할 수 있게 써주셔서 감사합니다!",
    createdAt: "2024-01-12T14:45:00Z",
  },
]

export default function GuestbookPage() {
  const [nickname, setNickname] = useState("")
  const [message, setMessage] = useState("")
  const [entries, setEntries] = useState(GUESTBOOK_ENTRIES)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nickname.trim() || !message.trim()) {
      alert("닉네임과 메시지를 모두 입력해주세요.")
      return
    }

    const newEntry = {
      id: Date.now().toString(),
      nickname: nickname.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    }

    setEntries([newEntry, ...entries])
    setNickname("")
    setMessage("")

    alert("방명록이 등록되었습니다!")
  }

  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">방명록</h1>
        <p className="text-muted-foreground">블로그를 방문해주신 분들의 소중한 의견을 남겨주세요!</p>
      </div>

      {/* Write Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            방명록 작성하기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                id="nickname"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">메시지</Label>
              <Textarea
                id="message"
                placeholder="방명록을 남겨주세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                maxLength={500}
              />
              <div className="text-right text-sm text-muted-foreground">{message.length}/500</div>
            </div>

            <Button type="submit" className="w-full">
              방명록 등록하기
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Entries */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">방명록 목록</h2>
          <span className="text-muted-foreground">({entries.length}개)</span>
        </div>

        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(entry.nickname)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{entry.nickname}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(entry.createdAt)}
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{entry.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">아직 방명록이 없습니다.</p>
            <p className="text-muted-foreground">첫 번째 방명록을 남겨보세요!</p>
          </div>
        )}
      </div>
    </div>
  )
}
