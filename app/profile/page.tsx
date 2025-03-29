"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Settings, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import AppLayout from "@/components/app-layout"

export default function ProfilePage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [voiceInteraction, setVoiceInteraction] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)

  const handleLogout = () => {
    // In a real app, we would clear authentication
    router.push("/")
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
                onClick={() => router.push("/profile/edit")}
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
              <Button variant="outline" className="rounded-xl shadow-sm" onClick={() => router.push("/language")}>
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
    </AppLayout>
  )
}

