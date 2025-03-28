"use client"

import { useRouter } from "next/navigation"
import { Stethoscope, BookOpen, MapPin, Phone, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AppLayout from "@/components/app-layout"

export default function Dashboard() {
  const router = useRouter()

  const mainActions = [
    {
      title: "Check Symptoms",
      description: "Analyze your symptoms and get advice",
      icon: Stethoscope,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      href: "/symptoms",
    },
    {
      title: "Health Tips",
      description: "Browse health advice and first aid",
      icon: BookOpen,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      href: "/health-tips",
    },
    {
      title: "Nearby Facilities",
      description: "Find healthcare centers near you",
      icon: MapPin,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      href: "/facilities",
    },
    {
      title: "Emergency Contacts",
      description: "Quick access to emergency help",
      icon: Phone,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      href: "/emergency",
    },
  ]

  const recentTips = [
    {
      title: "Staying Hydrated",
      description: "Drink at least 8 glasses of water daily",
    },
    {
      title: "Preventing Malaria",
      description: "Use mosquito nets and repellents",
    },
  ]

  return (
    <AppLayout title="Welcome Back" showNotification={true}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mainActions.map((action) => (
            <Card
              key={action.title}
              className="border-none shadow-lg rounded-2xl overflow-hidden card-hover"
              onClick={() => router.push(action.href)}
            >
              <CardContent className={`p-0`}>
                <div className="flex items-center p-5">
                  <div className={`${action.bgColor} rounded-xl p-3 mr-4`}>
                    <action.icon className={`h-6 w-6 text-${action.color.split("-")[1]}-500`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{action.title}</h3>
                    <p className="text-gray-600">{action.description}</p>
                  </div>
                </div>
                <div className={`h-1 w-full ${action.color}`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Health Tips</h2>
            <Button variant="ghost" className="text-primary" onClick={() => router.push("/health-tips")}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentTips.map((tip) => (
              <Card key={tip.title} className="border-none shadow-md rounded-2xl overflow-hidden card-hover">
                <CardContent className="p-5 flex items-start space-x-3">
                  <div className="bg-red-50 rounded-xl p-2 flex-shrink-0">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{tip.title}</h3>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-none shadow-md rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Health Check Reminder</h3>
                <p className="text-gray-600">It's been 30 days since your last symptom check</p>
              </div>
              <Button className="rounded-xl shadow-sm" onClick={() => router.push("/symptoms")}>
                Check Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

