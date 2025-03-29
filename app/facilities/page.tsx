"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Search, Hospital, AmbulanceIcon as FirstAid, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import AppLayout from "@/components/app-layout"

export default function FacilitiesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AppLayout title="Nearby Healthcare Facilities">
      <div className="space-y-6">
        <p className="text-gray-600 -mt-4">Find hospitals, clinics, and pharmacies near you</p>

        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search facilities or locations..."
            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="border-none shadow-lg rounded-2xl overflow-hidden card-hover cursor-pointer"
            onClick={() => router.push("/facilities/hospital")}
          >
            <CardContent className="p-0">
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-50 rounded-xl p-3 mr-3">
                    <Hospital className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Hospitals</h3>
                </div>
                <p className="text-gray-600">Find major medical centers and hospitals</p>
              </div>
              <div className="h-1 w-full bg-blue-500"></div>
            </CardContent>
          </Card>

          <Card
            className="border-none shadow-lg rounded-2xl overflow-hidden card-hover cursor-pointer"
            onClick={() => router.push("/facilities/clinic")}
          >
            <CardContent className="p-0">
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-green-50 rounded-xl p-3 mr-3">
                    <FirstAid className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Clinics</h3>
                </div>
                <p className="text-gray-600">Local health centers and mobile units</p>
              </div>
              <div className="h-1 w-full bg-green-500"></div>
            </CardContent>
          </Card>

          <Card
            className="border-none shadow-lg rounded-2xl overflow-hidden card-hover cursor-pointer"
            onClick={() => router.push("/facilities/pharmacy")}
          >
            <CardContent className="p-0">
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-50 rounded-xl p-3 mr-3">
                    <Pill className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-lg">Pharmacies</h3>
                </div>
                <p className="text-gray-600">Medicine shops and dispensaries</p>
              </div>
              <div className="h-1 w-full bg-purple-500"></div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">View on Map</h3>
              <Button onClick={() => router.push("/facilities/map")} className="rounded-xl shadow-sm">
                <MapPin className="h-4 w-4 mr-2" />
                Open Map
              </Button>
            </div>
            <div className="aspect-video bg-blue-50 rounded-xl relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-600">Map preview would display here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Recently Viewed</h3>
          <Card className="border-none shadow-md rounded-2xl overflow-hidden card-hover">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">District Hospital</h4>
                  <p className="text-gray-600">5.8 km • Hospital</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => router.push("/facilities/hospital")}
                  className="rounded-xl shadow-sm"
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

