"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Droplet, Shield, Heart, Utensils, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Mock health tips data
const allHealthTips = [
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
  {
    id: 5,
    title: "Safe Drinking Water",
    category: "hygiene",
    content:
      "Boil water for at least one minute or use water purification tablets if clean drinking water is not available.",
  },
  {
    id: 6,
    title: "Preventing Diarrhea",
    category: "prevention",
    content:
      "Wash hands before handling food, cook food thoroughly, and store food at proper temperatures to prevent foodborne illnesses.",
  },
  {
    id: 7,
    title: "Choking First Aid",
    category: "firstaid",
    content:
      "For adults, use the Heimlich maneuver. Stand behind the person and wrap your arms around their waist. Make a fist with one hand and place it above the person's navel. Grab your fist with the other hand and press into the abdomen with a quick, upward thrust.",
  },
  {
    id: 8,
    title: "Protein-Rich Foods",
    category: "nutrition",
    content:
      "Good sources of protein include eggs, dairy, legumes, nuts, seeds, and lean meats. Vegetarians can get adequate protein from plant sources like tofu, tempeh, and quinoa.",
  },
]

export default function HealthTipsCategoryPage({ params }: { params: { category: string } }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const category = params.category

  // Get title based on category
  const getTitle = () => {
    switch (category) {
      case "hygiene":
        return "Hygiene Tips"
      case "prevention":
        return "Prevention Tips"
      case "firstaid":
        return "First Aid"
      case "nutrition":
        return "Nutrition Advice"
      default:
        return "Health Tips"
    }
  }

  // Get icon based on category
  const getCategoryIcon = () => {
    switch (category) {
      case "hygiene":
        return <Droplet className="h-5 w-5 text-blue-500" />
      case "prevention":
        return <Shield className="h-5 w-5 text-green-500" />
      case "firstaid":
        return <Heart className="h-5 w-5 text-red-500" />
      case "nutrition":
        return <Utensils className="h-5 w-5 text-orange-500" />
      default:
        return null
    }
  }

  // Filter tips by category and search query
  const filteredTips = allHealthTips.filter((tip) => {
    const matchesCategory = tip.category === category
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex items-center h-16 px-4 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.push("/health-tips")} className="rounded-full">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Button>
        <h1 className="text-lg font-bold ml-3">{getTitle()}</h1>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder={`Search ${getTitle().toLowerCase()}...`}
              className="pl-10 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTips.length > 0 ? (
              filteredTips.map((tip) => (
                <Card key={tip.id} className="border-none shadow-md rounded-2xl overflow-hidden card-hover">
                  <CardContent className="p-0">
                    <div className="p-5">
                      <div className="flex items-center mb-3">
                        <div className={`rounded-lg p-2 mr-3 ${getCategoryColor(tip.category)}`}>
                          {getCategoryIcon()}
                        </div>
                        <h3 className="font-semibold text-lg">{tip.title}</h3>
                      </div>
                      <p className="text-gray-600">{tip.content}</p>
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
              ))
            ) : (
              <div className="col-span-2 text-center py-10 bg-white rounded-2xl shadow-sm">
                <p className="text-gray-600">No health tips found. Try a different search.</p>
              </div>
            )}
          </div>

          <Button variant="outline" className="w-full rounded-xl shadow-sm" onClick={() => router.push("/health-tips")}>
            Back to All Categories
          </Button>
        </div>
      </div>
    </div>
  )
}

