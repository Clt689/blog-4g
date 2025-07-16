"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

const NAVIGATION_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/blog", label: "블로그" },
  { href: "/guestbook", label: "방명록" },
] as const

export function Navigation() {
  const pathname = usePathname()

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Dev Blog</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {NAVIGATION_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActiveRoute(href) ? "text-primary" : "text-muted-foreground",
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
