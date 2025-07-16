import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const TECH_STACK = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
  backend: ["Node.js", "Express", "Prisma", "PostgreSQL"],
  tools: ["Git", "VS Code", "Figma", "Vercel", "Docker"],
} as const

const PROJECTS = [
  {
    title: "개인 블로그",
    description: "Next.js와 TypeScript로 구현한 개인 블로그입니다.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/username/blog",
    demo: "https://blog-demo.vercel.app",
  },
  {
    title: "Todo 앱",
    description: "React와 Zustand를 활용한 할 일 관리 앱입니다.",
    tech: ["React", "Zustand", "TypeScript"],
    github: "https://github.com/username/todo-app",
    demo: "https://todo-demo.vercel.app",
  },
] as const

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Profile Section */}
      <section className="text-center space-y-6">
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src="/placeholder.svg?height=128&width=128"
            alt="프로필 사진"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">김개발</h1>
          <p className="text-xl text-muted-foreground">주니어 프론트엔드 개발자</p>

          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/username" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="mailto:dev@example.com">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle>자기소개</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
          <p>
            안녕하세요! 사용자 경험을 중시하는 주니어 프론트엔드 개발자입니다. React와 TypeScript를 주로 사용하며,
            깔끔하고 유지보수하기 좋은 코드를 작성하려고 노력합니다.
          </p>
          <p>
            새로운 기술을 배우는 것을 좋아하고, 배운 내용을 블로그에 정리하며 지식을 공유하고 있습니다. 팀워크를
            중시하며, 동료들과 함께 성장하는 것을 즐깁니다.
          </p>
          <p>
            현재는 Next.js와 TypeScript를 깊이 있게 학습하고 있으며, 백엔드 기술에도 관심을 가지고 풀스택 개발자로
            성장하는 것이 목표입니다.
          </p>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>기술 스택</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.frontend.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.backend.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.tools.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <CardTitle>프로젝트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <Card key={project.title}>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{project.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.github} target="_blank">
                        <Github className="mr-1 h-3 w-3" />
                        GitHub
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.demo} target="_blank">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
