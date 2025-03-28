"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mic, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import AppLayout from "@/components/app-layout"

const commonSymptoms = ["Fever", "Headache", "Cough", "Stomach Pain", "Dizziness", "Rash", "Sore Throat", "Fatigue"]

export default function SymptomsPage() {
  const router = useRouter()
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])

  const handleSymptomClick = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    }
  }

  const handleStartCheck = () => {
    if (inputValue.trim() || selectedSymptoms.length > 0) {
      router.push("/symptoms/chat")
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, we would start/stop voice recording
  }

  return (
    <AppLayout title="Symptom Checker">
      <div className="space-y-6">
        <p className="text-gray-600 -mt-4">Describe your symptoms or select from common options</p>

        <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6 space-y-5">
            <div className="space-y-3">
              <h2 className="font-semibold text-lg">How are you feeling today?</h2>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Describe your symptoms..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="pr-12 h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-10 w-10 rounded-lg"
                    onClick={toggleRecording}
                  >
                    <Mic className={`h-5 w-5 ${isRecording ? "text-red-500 animate-pulse" : "text-gray-400"}`} />
                  </Button>
                </div>
                <Button size="lg" onClick={handleStartCheck} className="h-12 rounded-xl shadow-md">
                  <Send className="h-4 w-4 mr-2" />
                  Start
                </Button>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-3">Common Symptoms</h2>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <Button
                    key={symptom}
                    variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                    onClick={() => handleSymptomClick(symptom)}
                    className={`rounded-full px-4 py-2 ${
                      selectedSymptoms.includes(symptom) ? "shadow-md" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {symptom}
                    {selectedSymptoms.includes(symptom) && <span className="ml-1">✓</span>}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Recent Health Checks</h2>
          <Card className="border-none shadow-md rounded-2xl overflow-hidden card-hover">
            <CardContent className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Headache & Fever</h3>
                  <p className="text-gray-600 text-sm">3 days ago</p>
                </div>
                <Button variant="outline" className="rounded-xl">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md rounded-2xl overflow-hidden card-hover">
            <CardContent className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Stomach Pain</h3>
                  <p className="text-gray-600 text-sm">2 weeks ago</p>
                </div>
                <Button variant="outline" className="rounded-xl">
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

