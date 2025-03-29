"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    // Automatically redirect to welcome page after animation
    const timer = setTimeout(() => {
      router.push("/welcome")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="text-center w-full max-w-sm px-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
            <div className="relative bg-white rounded-full p-5 shadow-lg">
              <Heart className="text-primary w-16 h-16" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent fade-in">
            Smart Healthcare Assistant
          </h1>
        </div>
      </div>
    </div>
  )
}

