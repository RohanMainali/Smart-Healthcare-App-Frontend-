"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Globe, Volume2, VolumeX, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const languages = [
  { id: "en", name: "English" },
  { id: "hi", name: "हिन्दी (Hindi)" },
  { id: "bn", name: "বাংলা (Bengali)" },
  { id: "ne", name: "नेपाली (Nepali)" },
  { id: "si", name: "සිංහල (Sinhala)" },
  { id: "ur", name: "اردو (Urdu)" },
]

export default function LanguagePage() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [interactionMode, setInteractionMode] = useState("both")

  const handleContinue = () => {
    // In a real app, we would save these preferences
    localStorage.setItem("language", selectedLanguage)
    localStorage.setItem("interactionMode", interactionMode)
    router.push("/auth")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 left-6 rounded-full shadow-sm bg-white/80"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="h-5 w-5 text-primary" />
      </Button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-6">
        <div className="text-center mb-8">
          <div className="bg-white rounded-full p-4 shadow-md inline-block mb-4">
            <Globe className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Choose Your Language
          </h1>
          <p className="text-gray-600 mt-2">Select your preferred language and interaction mode</p>
        </div>

        <Card className="w-full mb-6 shadow-lg border-none rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage} className="space-y-2">
              {languages.map((language) => (
                <div
                  key={language.id}
                  className={`flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-all ${
                    selectedLanguage === language.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-transparent bg-white/80 hover:bg-white hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedLanguage(language.id)}
                >
                  <RadioGroupItem value={language.id} id={language.id} className="sr-only" />
                  <Label htmlFor={language.id} className="flex-1 cursor-pointer font-medium">
                    {language.name}
                  </Label>
                  {selectedLanguage === language.id && <Check className="h-5 w-5 text-primary" />}
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="w-full mb-8 shadow-lg border-none rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-4">Interaction Preference</h2>
            <RadioGroup value={interactionMode} onValueChange={setInteractionMode} className="space-y-2">
              <div
                className={`flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-all ${
                  interactionMode === "text"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-transparent bg-white/80 hover:bg-white hover:shadow-sm"
                }`}
                onClick={() => setInteractionMode("text")}
              >
                <RadioGroupItem value="text" id="text" className="sr-only" />
                <Label htmlFor="text" className="flex-1 cursor-pointer font-medium">
                  Text Only
                </Label>
                <VolumeX className="h-5 w-5 text-gray-500" />
              </div>
              <div
                className={`flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-all ${
                  interactionMode === "voice"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-transparent bg-white/80 hover:bg-white hover:shadow-sm"
                }`}
                onClick={() => setInteractionMode("voice")}
              >
                <RadioGroupItem value="voice" id="voice" className="sr-only" />
                <Label htmlFor="voice" className="flex-1 cursor-pointer font-medium">
                  Voice Only
                </Label>
                <Volume2 className="h-5 w-5 text-gray-500" />
              </div>
              <div
                className={`flex items-center space-x-3 rounded-xl border p-4 cursor-pointer transition-all ${
                  interactionMode === "both"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-transparent bg-white/80 hover:bg-white hover:shadow-sm"
                }`}
                onClick={() => setInteractionMode("both")}
              >
                <RadioGroupItem value="both" id="both" className="sr-only" />
                <Label htmlFor="both" className="flex-1 cursor-pointer font-medium">
                  Text and Voice
                </Label>
                <Volume2 className="h-5 w-5 text-gray-500" />
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Button onClick={handleContinue} className="w-full h-14 rounded-xl shadow-lg">
          Continue
        </Button>
      </div>
    </div>
  )
}

