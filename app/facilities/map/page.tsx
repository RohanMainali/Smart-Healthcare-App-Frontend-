"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Navigation, Phone, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Mock facilities data
const facilities = [
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
]

export default function FacilitiesMapPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFacilities = facilities
    .filter((facility) => {
      return (
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
    .slice(0, 3)

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleDirections = (address: string) => {
    // In a real app, we would use the device's map application
    alert(`Getting directions to: ${address}`)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex items-center h-16 px-4 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.push("/facilities")} className="rounded-full">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Button>
        <h1 className="text-lg font-bold ml-3">Map View</h1>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="relative">
            <Input
              placeholder="Search on map..."
              className="pl-4 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-blue-50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-600">Map view would display here with facility markers</p>
                </div>
                {/* In a real app, we would integrate with a map provider */}
                <div className="absolute bottom-4 right-4">
                  <Button className="rounded-xl shadow-md">
                    <MapPin className="h-4 w-4 mr-2" />
                    Use My Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Nearby Facilities</h3>
            {filteredFacilities.map((facility) => (
              <Card key={facility.id} className="border-none shadow-md rounded-2xl overflow-hidden card-hover">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{facility.name}</h4>
                      <p className="text-gray-600">
                        {facility.distance} • {facility.type}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCall(facility.phone)}
                        className="rounded-xl shadow-sm"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDirections(facility.address)}
                        className="rounded-xl shadow-sm"
                      >
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full rounded-xl shadow-sm" onClick={() => router.push("/facilities")}>
            Back to List View
          </Button>
        </div>
      </div>
    </div>
  )
}

