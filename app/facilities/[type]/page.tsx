"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Search, Navigation, Phone, Clock, Star, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Mock facilities data
const allFacilities = [
  {
    id: 1,
    name: "Community Health Center",
    type: "clinic",
    distance: "1.2 km",
    address: "123 Main Road, Village Center",
    phone: "+91 9876543210",
    hours: "8:00 AM - 5:00 PM",
    rating: 4.5,
    reviews: 48,
  },
  {
    id: 2,
    name: "District Hospital",
    type: "hospital",
    distance: "5.8 km",
    address: "456 Hospital Road, District Center",
    phone: "+91 9876543211",
    hours: "24 hours",
    rating: 4.2,
    reviews: 31,
  },
  {
    id: 3,
    name: "Village Pharmacy",
    type: "pharmacy",
    distance: "0.8 km",
    address: "78 Market Street, Village Center",
    phone: "+91 9876543212",
    hours: "9:00 AM - 8:00 PM",
    rating: 4.0,
    reviews: 10,
  },
  {
    id: 4,
    name: "Mobile Health Unit",
    type: "clinic",
    distance: "3.5 km",
    address: "Currently at: Village Square",
    phone: "+91 9876543213",
    hours: "10:00 AM - 4:00 PM",
    rating: 4.3,
    reviews: 40,
  },
  {
    id: 5,
    name: "Regional Medical Center",
    type: "hospital",
    distance: "12.4 km",
    address: "789 Highway Road, Regional Center",
    phone: "+91 9876543214",
    hours: "24 hours",
    rating: 4.7,
    reviews: 48,
  },
  {
    id: 6,
    name: "Central Pharmacy",
    type: "pharmacy",
    distance: "4.2 km",
    address: "45 Central Road, District Center",
    phone: "+91 9876543215",
    hours: "8:00 AM - 10:00 PM",
    rating: 4.6,
    reviews: 22,
  },
]

export default function FacilitiesTypePage({ params }: { params: { type: string } }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const facilityType = params.type

  // Get title based on facility type
  const getTitle = () => {
    switch (facilityType) {
      case "hospital":
        return "Hospitals"
      case "clinic":
        return "Clinics"
      case "pharmacy":
        return "Pharmacies"
      default:
        return "Facilities"
    }
  }

  // Filter facilities by type and search query
  const filteredFacilities = allFacilities.filter((facility) => {
    const matchesType = facility.type === facilityType
    const matchesSearch =
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.address.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleDirections = (address: string) => {
    // In a real app, we would use the device's map application
    alert(`Getting directions to: ${address}`)
  }

  const getFacilityTypeColor = (type: string) => {
    switch (type) {
      case "hospital":
        return "bg-blue-500"
      case "clinic":
        return "bg-green-500"
      case "pharmacy":
        return "bg-purple-500"
      default:
        return "bg-primary"
    }
  }

  const getFacilityTypeBgColor = (type: string) => {
    switch (type) {
      case "hospital":
        return "bg-blue-50"
      case "clinic":
        return "bg-green-50"
      case "pharmacy":
        return "bg-purple-50"
      default:
        return "bg-primary/10"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex items-center h-16 px-4 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.push("/facilities")} className="rounded-full">
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

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{getTitle()} Near You</h2>
            <Button variant="outline" className="rounded-xl shadow-sm" onClick={() => router.push("/facilities/map")}>
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </Button>
          </div>

          <div className="space-y-4">
            {filteredFacilities.length > 0 ? (
              filteredFacilities.map((facility) => (
                <Card key={facility.id} className="border-none shadow-md rounded-2xl overflow-hidden card-hover">
                  <CardContent className="p-0">
                    <div className="p-5">
                      <div className="flex justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-2">
                            <div className={`${getFacilityTypeBgColor(facility.type)} rounded-lg p-2 mr-3`}>
                              <MapPin
                                className={`h-5 w-5 text-${facility.type === "hospital" ? "blue" : facility.type === "clinic" ? "green" : "purple"}-500`}
                              />
                            </div>
                            <h3 className="font-semibold text-lg truncate">{facility.name}</h3>
                          </div>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{facility.address}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mt-1">
                            <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{facility.hours}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-500 mr-1 flex-shrink-0" />
                            <span className="font-medium">{facility.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">({facility.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="text-right ml-4 flex flex-col items-end justify-between">
                          <div className="text-lg font-bold text-primary mb-3">{facility.distance}</div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => handleCall(facility.phone)}
                              className="rounded-xl shadow-sm"
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button onClick={() => handleDirections(facility.address)} className="rounded-xl shadow-sm">
                              <Navigation className="h-4 w-4 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`h-1 w-full ${getFacilityTypeColor(facility.type)}`}></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl shadow-sm">
                <p className="text-gray-600">No facilities found. Try a different search.</p>
              </div>
            )}
          </div>

          <Button variant="outline" className="w-full rounded-xl shadow-sm" onClick={() => router.push("/facilities")}>
            Back to All Facilities
          </Button>
        </div>
      </div>
    </div>
  )
}

