"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Camera, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditProfilePage() {
  const router = useRouter()

  // Profile state
  const [name, setName] = useState("Rohan Mainali")
  const [age, setAge] = useState("20")
  const [gender, setGender] = useState("male")
  const [location, setLocation] = useState("Kathmandu")

  const handleSaveProfile = () => {
    // In a real app, we would save the profile data
    router.push("/profile")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex items-center h-16 px-4 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.push("/profile")} className="rounded-full">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Button>
        <h1 className="text-lg font-bold ml-3">Edit Profile</h1>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-8 max-w-md mx-auto w-full">
        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-6">
            <CardTitle className="text-xl font-bold">Edit Your Profile</CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center shadow-lg">
                  <User className="h-12 w-12 text-white" />
                </div>
                <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Tap to change profile picture</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button variant="outline" onClick={() => router.push("/profile")} className="flex-1 rounded-xl shadow-sm">
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} className="flex-1 rounded-xl shadow-md">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

