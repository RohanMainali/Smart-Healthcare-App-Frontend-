"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Phone, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSendCode = () => {
    // Store phone number to access it after verification
    localStorage.setItem("loginPhone", phoneNumber)

    // Navigate to verification page
    router.push("/auth/verify?mode=login")
  }

  const handleBack = () => {
    router.push("/auth")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 left-6 rounded-full shadow-sm bg-white/80"
        onClick={handleBack}
      >
        <ArrowLeft className="h-5 w-5 text-primary" />
      </Button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-6">
        <Card className="w-full shadow-lg border-none rounded-2xl overflow-hidden">
          <CardHeader className="text-center py-6 bg-gradient-to-r from-primary to-blue-600">
            <CardTitle className="text-xl text-white">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="login-phone"
                  placeholder="Enter your phone number"
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <Button className="w-full mt-4 h-12 rounded-xl shadow-md" onClick={handleSendCode} disabled={!phoneNumber}>
              Send Verification Code
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={() => router.push("/auth/register")}
                >
                  Register
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

