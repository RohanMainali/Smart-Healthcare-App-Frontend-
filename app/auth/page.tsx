"use client"

import { useRouter } from "next/navigation"
import { User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 left-6 rounded-full shadow-sm bg-white/80"
        onClick={() => router.push("/language")}
      >
        <ArrowLeft className="h-5 w-5 text-primary" />
      </Button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Account Access
          </h1>
          <p className="text-gray-600 mt-2">Create an account or sign in to continue</p>
        </div>

        <div className="w-full space-y-4">
          <Card
            className="border-none shadow-lg rounded-2xl overflow-hidden card-hover cursor-pointer"
            onClick={() => router.push("/auth/register")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 rounded-xl p-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Create New Account</h2>
                  <p className="text-gray-600">Register with your phone number</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-none shadow-lg rounded-2xl overflow-hidden card-hover cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-50 rounded-xl p-3">
                  <Phone className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Login to Existing Account</h2>
                  <p className="text-gray-600">Sign in with your phone number</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

