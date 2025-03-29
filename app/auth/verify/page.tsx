"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") || "register"
  const [verificationCode, setVerificationCode] = useState("")

  const handleVerify = () => {
    if (mode === "login") {
      // In a real app, we would verify the code
      router.push("/dashboard")
    } else {
      // For registration, navigate to dashboard
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (mode === "login") {
      router.push("/auth/login")
    } else {
      router.push("/auth/register")
    }
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
            <CardTitle className="text-xl text-white">
              {mode === "login" ? "Verify Login" : "Verify Registration"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="bg-blue-50 rounded-xl p-4 flex items-start space-x-3 mb-4">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Verification Required</h3>
                <p className="text-sm text-gray-600">
                  We've sent a 6-digit code to your phone number. Please enter it below.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Input
                id="verification"
                placeholder="Enter 6-digit code"
                className="h-12 rounded-xl text-center text-lg tracking-widest border-gray-200 focus:border-primary focus:ring-primary"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>

            <Button
              className="w-full h-12 rounded-xl shadow-md"
              onClick={handleVerify}
              disabled={verificationCode.length !== 6}
            >
              {mode === "login" ? "Verify & Login" : "Verify & Create Account"}
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                Didn't receive a code?{" "}
                <Button variant="link" className="p-0 h-auto text-primary">
                  Resend Code
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

