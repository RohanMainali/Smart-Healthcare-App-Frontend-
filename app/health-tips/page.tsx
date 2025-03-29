"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, BookOpen, Heart, Droplet, Shield, Utensils } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import AppLayout from "@/components/app-layout"

const categories = [
  { id: "all", name: "All", icon: BookOpen },
  { id: "hygiene", name: "Hygiene", icon: Droplet },
  { id: "prevention", name: "Prevention", icon: Shield },
  { id: "firstaid", name: "First Aid", icon: Heart },
  { id: "nutrition", name: "Nutrition", icon: Utensils },
]

const healthTips = [
  {
    id: 1,
    title: "Handwashing Technique",
    category: "hygiene",
    content:
      "Wash hands with soap and water for at least 20 seconds, especially after being in a public place or after blowing your nose, coughing, or sneezing.",
  },
  {
    id: 2,
    title: "Preventing Malaria",
    category: "prevention",
    content:
      "Use insecticide-treated mosquito nets while sleeping, apply insect repellent, and wear long-sleeved clothing in mosquito-prone areas.",
  },
  {
    id: 3,
    title: "Treating Minor Burns",
    category: "firstaid",
    content:
      "Cool the burn with cool (not cold) running water for 10-15 minutes. Cover with a clean, non-stick bandage. Do not apply ice, butter, or ointments directly to the burn.",
  },
  {
    id: 4,
    title: "Balanced Diet Basics",
    category: "nutrition",
    content:
      "Include fruits, vegetables, whole grains, lean proteins, and dairy in your daily diet. Limit processed foods, sugars, and excessive salt.",
  },
]

export default function HealthTipsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hygiene":
        return "text-blue-500 bg-blue-50"
      case "prevention":
        return "text-green-500 bg-green-50"
      case "firstaid":
        return "text-red-500 bg-red-50"
      case "nutrition":
        return "text-orange-500 bg-orange-50"
      default:
        return "text-primary bg-primary/10"
    }
  }

  return (
    <AppLayout title="Health Tips & First Aid">
      <div className="space-y-6">
        <p className="text-gray-600 -mt-4">Browse health advice, disease prevention, and first aid guidance</p>

        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search health tips..."
            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories
            .filter((cat) => cat.id !== "all")
            .map((category) => (
              <Card
                key={category.id}
                className="border-none shadow-md rounded-2xl overflow-hidden card-hover cursor-pointer"
                onClick={() => router.push(`/health-tips/${category.id}`)}
              >
                <CardContent className="p-0">
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <div className={`rounded-lg p-2 mr-3 ${getCategoryColor(category.id)}`}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                    </div>
                    <p className="text-gray-600">
                      {category.id === "hygiene" && "Personal cleanliness tips"}
                      {category.id === "prevention" && "Disease prevention advice"}
                      {category.id === "firstaid" && "Emergency treatment guides"}
                      {category.id === "nutrition" && "Healthy eating information"}
                    </p>
                  </div>
                  <div
                    className={`h-1 w-full ${
                      category.id === "hygiene"
                        ? "bg-blue-500"
                        : category.id === "prevention"
                          ? "bg-green-500"
                          : category.id === "firstaid"
                            ? "bg-red-500"
                            : category.id === "nutrition"
                              ? "bg-orange-500"
                              : "bg-primary"
                    }`}
                  ></div>
                </CardContent>
              </Card>
            ))}
        </div>

        <h2 className="text-xl font-semibold pt-2">Recent Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthTips.slice(0, 4).map((tip) => (
            <Card
              key={tip.id}
              className="border-none shadow-md rounded-2xl overflow-hidden card-hover cursor-pointer"
              onClick={() => router.push(`/health-tips/${tip.category}`)}
            >
              <CardContent className="p-0">
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className={`rounded-lg p-2 mr-3 ${getCategoryColor(tip.category)}`}>
                      {tip.category === "hygiene" && <Droplet className="h-5 w-5" />}
                      {tip.category === "prevention" && <Shield className="h-5 w-5" />}
                      {tip.category === "firstaid" && <Heart className="h-5 w-5" />}
                      {tip.category === "nutrition" && <Utensils className="h-5 w-5" />}
                    </div>
                    <h3 className="font-semibold text-lg">{tip.title}</h3>
                  </div>
                  <p className="text-gray-600 line-clamp-2">{tip.content}</p>
                </div>
                <div
                  className={`h-1 w-full ${
                    tip.category === "hygiene"
                      ? "bg-blue-500"
                      : tip.category === "prevention"
                        ? "bg-green-500"
                        : tip.category === "firstaid"
                          ? "bg-red-500"
                          : tip.category === "nutrition"
                            ? "bg-orange-500"
                            : "bg-primary"
                  }`}
                ></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

