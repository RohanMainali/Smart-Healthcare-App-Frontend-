"use client"

import { useRouter } from "next/navigation"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import AppLayout from "@/components/app-layout"

export default function AnalysisPage() {
  const router = useRouter()

  const possibleConditions = [
    {
      name: "Common Cold",
      probability: 75,
      severity: "mild",
      description: "A viral infection of the upper respiratory tract.",
    },
    {
      name: "Influenza",
      probability: 60,
      severity: "moderate",
      description: "A contagious respiratory illness caused by influenza viruses.",
    },
    {
      name: "Migraine",
      probability: 40,
      severity: "moderate",
      description: "A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound.",
    },
  ]

  const recommendations = [
    "Rest and stay hydrated",
    "Take over-the-counter pain relievers as needed",
    "Monitor your temperature",
    "If symptoms worsen or persist for more than 3 days, consult a healthcare professional",
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "severe":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "mild":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "moderate":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "severe":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <AppLayout title="Symptom Analysis">
      <div className="space-y-6">
        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="pb-2 pt-5 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-xl">Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-5">
            <div className="space-y-5">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Attention</h3>
                  <p className="text-yellow-700">
                    This is an AI-generated analysis and not a medical diagnosis. Always consult with a healthcare
                    professional for proper medical advice.
                  </p>
                </div>
              </div>

              <h3 className="font-semibold text-lg">Possible Conditions</h3>
              <div className="space-y-4">
                {possibleConditions.map((condition) => (
                  <div key={condition.name} className="space-y-2 bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getSeverityIcon(condition.severity)}
                        <span className="font-semibold text-lg">{condition.name}</span>
                      </div>
                      <span className="text-lg font-bold">{condition.probability}%</span>
                    </div>
                    <Progress
                      value={condition.probability}
                      className="h-2 rounded-full"
                      indicatorClassName={`${getSeverityColor(condition.severity)} rounded-full`}
                    />
                    <p className="text-gray-600">{condition.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="pb-2 pt-5 px-6 bg-gradient-to-r from-green-50 to-green-100">
            <CardTitle className="text-xl">Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-5">
            <ul className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl shadow-sm"
            onClick={() => router.push("/symptoms/chat")}
          >
            Continue Chat
          </Button>
          <Button className="flex-1 h-12 rounded-xl shadow-md" onClick={() => router.push("/facilities")}>
            Find Healthcare Facilities
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

