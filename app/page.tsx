"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SplashScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    router.push("/language")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="text-center w-full max-w-sm px-6">
        {loading ? (
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
        ) : (
          <div className="space-y-6 slide-up">
            <div className="bg-white rounded-full p-5 shadow-lg inline-block">
              <Heart className="text-primary w-16 h-16" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Smart Healthcare Assistant
            </h1>
            <p className="text-gray-600">Your personal healthcare companion for rural communities</p>
            <Button onClick={handleContinue} className="w-full mt-4 h-14 text-lg rounded-xl shadow-lg">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

