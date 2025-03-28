"use client"

import { useState } from "react"
import { User, Settings, Bell, LogOut, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import AppLayout from "@/components/app-layout"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [voiceInteraction, setVoiceInteraction] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  // Profile state
  const [name, setName] = useState("Rohan Mainali")
  const [age, setAge] = useState("20")
  const [gender, setGender] = useState("male")
  const [location, setLocation] = useState("Kathmandu")

  const handleLogout = () => {
    // In a real app, we would clear authentication
    router.push("/")
  }

  const handleSaveProfile = () => {
    // In a real app, we would save the profile data
    setIsEditProfileOpen(false)
  }

  return (
    <AppLayout title="Profile & Settings">
      <div className="space-y-6">
        <p className="text-gray-600 -mt-4">Manage your account and preferences</p>

        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="pb-3 pt-5 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center space-x-5">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center shadow-lg">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl">Rohan Mainali</h2>
                <p className="text-gray-600">20 years • Male</p>
                <p className="text-gray-600">Kathmandu</p>
              </div>
              <Button
                variant="outline"
                className="ml-auto rounded-xl shadow-sm"
                onClick={() => setIsEditProfileOpen(true)}
              >
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="pb-3 pt-5 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-xl">App Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-blue-50 shadow-sm">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Label htmlFor="notifications" className="font-semibold text-lg">
                    Notifications
                  </Label>
                  <p className="text-gray-600">Receive health reminders and alerts</p>
                </div>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-green-50 shadow-sm">
                  <Settings className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <Label htmlFor="voice" className="font-semibold text-lg">
                    Voice Interaction
                  </Label>
                  <p className="text-gray-600">Enable voice commands and responses</p>
                </div>
              </div>
              <Switch id="voice" checked={voiceInteraction} onCheckedChange={setVoiceInteraction} />
            </div>

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-purple-50 shadow-sm">
                  <Settings className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <Label htmlFor="offline" className="font-semibold text-lg">
                    Offline Mode
                  </Label>
                  <p className="text-gray-600">Access basic features without internet</p>
                </div>
              </div>
              <Switch id="offline" checked={offlineMode} onCheckedChange={setOfflineMode} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="pb-3 pt-5 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-xl">Language</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Current Language</h3>
                <p className="text-gray-600">English</p>
              </div>
              <Button variant="outline" className="rounded-xl shadow-sm">
                Change
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-6">
            <Button variant="destructive" className="w-full h-12 rounded-xl shadow-md" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl border-none shadow-lg p-0 overflow-hidden">
          <DialogHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-6">
            <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="p-6 space-y-6">
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
          </div>

          <DialogFooter className="bg-gray-50 p-6">
            <Button variant="outline" onClick={() => setIsEditProfileOpen(false)} className="rounded-xl shadow-sm">
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} className="rounded-xl shadow-md">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}

