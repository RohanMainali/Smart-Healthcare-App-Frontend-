"use client"

import { Phone, AlertTriangle, User, MapPin, Clock, Ambulance, Heart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AppLayout from "@/components/app-layout"

const emergencyContacts = [
  {
    id: 1,
    name: "Ambulance Service",
    phone: "108",
    icon: Ambulance,
    primary: true,
  },
  {
    id: 2,
    name: "Local Health Center",
    phone: "+91 9876543210",
    icon: Phone,
    primary: false,
  },
  {
    id: 3,
    name: "District Hospital",
    phone: "+91 9876543211",
    icon: Phone,
    primary: false,
  },
  {
    id: 4,
    name: "Community Health Worker",
    phone: "+91 9876543212",
    icon: User,
    primary: false,
  },
]

const emergencyInstructions = [
  {
    title: "Chest Pain",
    instructions: "Sit down and rest. Take aspirin if available. Call emergency services immediately.",
  },
  {
    title: "Severe Bleeding",
    instructions: "Apply direct pressure to the wound with a clean cloth. Elevate the injured area if possible.",
  },
  {
    title: "Stroke Symptoms",
    instructions: "Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services.",
  },
]

const nearbyHospitals = [
  {
    name: "District Hospital",
    distance: "5.8 km",
    address: "456 Hospital Road, District Center",
    phone: "+91 9876543211",
    hours: "24 hours",
  },
  {
    name: "Regional Medical Center",
    distance: "12.4 km",
    address: "789 Highway Road, Regional Center",
    phone: "+91 9876543214",
    hours: "24 hours",
  },
]

export default function EmergencyPage() {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  return (
    <AppLayout title="Emergency Contacts">
      <div className="space-y-6">
        <p className="text-gray-600 -mt-4">Quick access to emergency services and guidance</p>

        <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white p-3 rounded-xl shadow-md">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-red-700">Emergency Situation?</h3>
                <p className="text-red-600 mb-4">
                  If you're experiencing a medical emergency, call for help immediately.
                </p>
                <Button
                  className="w-full h-14 text-lg bg-red-600 hover:bg-red-700 rounded-xl shadow-lg"
                  onClick={() => handleCall("108")}
                >
                  <Phone className="mr-2 h-6 w-6" />
                  Call Ambulance (108)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Emergency Contacts</h2>
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`border-none shadow-md rounded-2xl overflow-hidden card-hover ${contact.primary ? "bg-gradient-to-r from-primary/5 to-primary/10" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-xl shadow-sm ${contact.primary ? "bg-primary text-primary-foreground" : "bg-white"}`}
                        >
                          <contact.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-gray-600">{contact.phone}</p>
                        </div>
                      </div>
                      <Button
                        variant={contact.primary ? "default" : "outline"}
                        onClick={() => handleCall(contact.phone)}
                        className="rounded-xl shadow-sm"
                      >
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-xl font-semibold pt-2">Nearby Hospitals</h2>
            <div className="space-y-3">
              {nearbyHospitals.map((hospital, index) => (
                <Card key={index} className="border-none shadow-md rounded-2xl overflow-hidden card-hover">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="p-3 rounded-xl shadow-sm bg-blue-50">
                          <MapPin className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{hospital.name}</h3>
                          <p className="text-gray-600 text-sm">
                            {hospital.distance} • {hospital.address}
                          </p>
                          <p className="text-gray-600 text-sm">{hospital.hours}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleCall(hospital.phone)}
                        className="rounded-xl shadow-sm"
                      >
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Emergency Instructions</h2>
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-5 divide-y divide-gray-100">
                {emergencyInstructions.map((item, index) => (
                  <div key={index} className={`${index > 0 ? "pt-4 mt-4" : ""}`}>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.instructions}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="pb-2 pt-5 px-5 bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="text-lg">Nearest Emergency Room</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">District Hospital</h3>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>456 Hospital Road, District Center (5.8 km)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Open 24 hours</span>
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl shadow-sm"
                      onClick={() => handleCall("+91 9876543211")}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                    <Button className="flex-1 rounded-xl shadow-sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="pb-2 pt-5 px-5 bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="text-lg">First Aid Essentials</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-xl bg-green-50">
                      <Heart className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">CPR Basics</h3>
                      <p className="text-gray-600 text-sm">
                        Push hard and fast in the center of the chest. Allow the chest to return to its normal position
                        after each compression.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-xl bg-blue-50">
                      <Shield className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Recovery Position</h3>
                      <p className="text-gray-600 text-sm">
                        If a person is unconscious but breathing, place them on their side to prevent choking.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

