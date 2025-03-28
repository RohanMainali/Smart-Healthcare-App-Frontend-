"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Stethoscope, BookOpen, MapPin, Phone, User, Menu, Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
  showNotification?: boolean
}

export default function AppLayout({ children, title, showNotification = false }: AppLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Symptoms", href: "/symptoms", icon: Stethoscope },
    { name: "Health Tips", href: "/health-tips", icon: BookOpen },
    { name: "Facilities", href: "/facilities", icon: MapPin },
    { name: "Emergency", href: "/emergency", icon: Phone },
    { name: "Profile", href: "/profile", icon: User },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Mobile header */}
      <header
        className={`fixed top-0 left-0 right-0 z-10 transition-all duration-200 ${scrolled ? "glass-effect shadow-sm" : "bg-transparent"}`}
      >
        <div className="flex items-center justify-between px-4 h-16">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none w-72">
              <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-white">
                <div className="p-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Healthcare Assistant
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex-1 p-4">
                  {navigation.map((item) => (
                    <Button
                      key={item.name}
                      variant={isActive(item.href) ? "default" : "ghost"}
                      className={`w-full justify-start mb-2 rounded-xl h-12 ${isActive(item.href) ? "shadow-md" : ""}`}
                      onClick={() => handleNavigation(item.href)}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? "text-white" : "text-primary"}`} />
                      {item.name}
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Smart Healthcare Assistant
          </h1>
          {showNotification && (
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5 text-primary" />
            </Button>
          )}
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-white/80 backdrop-blur-md shadow-xl">
          <div className="flex items-center h-16 flex-shrink-0 px-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Healthcare Assistant
            </h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4 px-4">
            <nav className="flex-1 space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className={`w-full justify-start h-12 rounded-xl ${isActive(item.href) ? "shadow-md" : ""}`}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? "text-white" : "text-primary"}`} />
                  {item.name}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:pl-64 pt-16 overflow-auto">
        <div className="px-4 py-6 md:px-8 md:py-8 max-w-6xl mx-auto">
          {/* Desktop header */}
          <div className="hidden md:flex md:items-center md:justify-between mb-8">
            <h1 className="text-2xl font-bold">{title}</h1>
            {showNotification && (
              <Button variant="outline" size="icon" className="rounded-full">
                <Bell className="h-5 w-5 text-primary" />
              </Button>
            )}
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}

