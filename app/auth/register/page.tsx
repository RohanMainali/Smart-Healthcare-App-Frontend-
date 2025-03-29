"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Phone, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [location, setLocation] = useState("")

  const handleSendCode = () => {
    // Store registration data in localStorage to access it after verification
    localStorage.setItem(
      "registerData",
      JSON.stringify({
        name,
        age,
        gender,
        location,
        phoneNumber,
      }),
    )

    // Navigate to verification page
    router.push("/auth/verify?mode=register")
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
            <CardTitle className="text-xl text-white">Create Account</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Age"
                  className="h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium">
                  Gender
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger
                    id="gender"
                    className="h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location/Village
              </Label>
              <Input
                id="location"
                placeholder="Enter your location"
                className="h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full mt-4 h-12 rounded-xl shadow-md"
              onClick={handleSendCode}
              disabled={!phoneNumber || !name || !age || !gender || !location}
            >
              Send Verification Code
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => router.push("/auth/login")}>
                  Login
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

