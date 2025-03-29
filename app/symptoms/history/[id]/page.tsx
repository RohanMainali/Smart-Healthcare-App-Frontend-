"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AppLayout from "@/components/app-layout"

// Mock data for symptom history
const historyData = {
  "1": {
    title: "Headache & Fever",
    date: "March 26, 2025",
    time: "10:30 AM",
    symptoms: ["Headache", "Fever", "Fatigue"],
    diagnosis: "Common Cold",
    recommendations: [
      "Rest and stay hydrated",
      "Take over-the-counter pain relievers as needed",
      "Monitor your temperature",
    ],
  },
  "2": {
    title: "Stomach Pain",
    date: "March 15, 2025",
    time: "3:45 PM",
    symptoms: ["Stomach Pain", "Nausea"],
    diagnosis: "Mild Food Poisoning",
    recommendations: [
      "Stay hydrated with clear fluids",
      "Eat bland foods like rice and toast",
      "Avoid dairy and spicy foods for 24 hours",
    ],
  },
}

export default function SymptomHistoryDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const id = params.id
  const data = historyData[id as keyof typeof historyData]

  if (!data) {
    return (
      <AppLayout title="History Not Found">
        <div className="text-center py-10">
          <p>The requested history entry was not found.</p>
          <Button className="mt-4" onClick={() => router.push("/symptoms")}>
            Back to Symptoms
          </Button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Symptom History">
      <div className="space-y-6">
        <Button variant="outline" className="mb-4" onClick={() => router.push("/symptoms")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Symptoms
        </Button>

        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="pb-2 pt-5 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-xl">{data.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{data.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{data.time}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Reported Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {data.symptoms.map((symptom, index) => (
                  <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {symptom}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Diagnosis</h3>
              <p className="text-gray-800 bg-green-50 p-3 rounded-xl">{data.diagnosis}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
              <ul className="space-y-2">
                {data.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center mr-2 mt-0.5 text-xs">
                      {index + 1}
                    </div>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl shadow-sm"
            onClick={() => router.push("/symptoms")}
          >
            Back to Symptoms
          </Button>
          <Button className="flex-1 h-12 rounded-xl shadow-md" onClick={() => router.push("/symptoms/chat")}>
            Start New Check
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

