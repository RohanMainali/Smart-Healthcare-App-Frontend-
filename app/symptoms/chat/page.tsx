"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mic, Send, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

// Simulated conversation flow for the symptom checker
const botResponses = [
  "I understand you're experiencing headache and fever. How long have you been feeling these symptoms?",
  "Is the headache constant or does it come and go?",
  "Have you taken any medication for these symptoms?",
  "Do you have any other symptoms like nausea, sensitivity to light, or stiff neck?",
  "Based on your symptoms, I'm analyzing possible causes. This will take just a moment...",
]

export default function SymptomChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your healthcare assistant. I understand you're experiencing headache and fever. Let's discuss your symptoms in more detail to provide better guidance.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [currentBotResponse, setCurrentBotResponse] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages([...messages, newMessage])
      setInputValue("")

      // Simulate bot typing
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)

        // Add bot response
        if (currentBotResponse < botResponses.length) {
          const botMessage: Message = {
            id: messages.length + 2,
            text: botResponses[currentBotResponse],
            sender: "bot",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botMessage])
          setCurrentBotResponse(currentBotResponse + 1)
        } else {
          // End of conversation, redirect to analysis
          setTimeout(() => {
            router.push("/symptoms/analysis")
          }, 1500)
        }
      }, 1500)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, we would start/stop voice recording
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex items-center h-16 px-4 border-b bg-white/80 backdrop-blur-md shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => router.push("/symptoms")} className="rounded-full">
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Button>
        <h1 className="text-lg font-bold ml-3">Symptom Assessment</h1>
      </div>

      <div className="flex-1 overflow-hidden p-4">
        <Card className="flex-1 h-full overflow-hidden border-none shadow-lg rounded-2xl">
          <CardContent className="p-4 h-full flex flex-col bg-gradient-to-br from-white to-blue-50">
            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 rounded-full p-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-white shadow-md"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-white shadow-md"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="flex-shrink-0 rounded-full p-2 bg-white shadow-md">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-2xl p-3 bg-white shadow-md">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"></div>
                        <div
                          className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t pt-4 mt-auto">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleRecording}
                  className={`h-12 w-12 rounded-full shadow-sm ${isRecording ? "bg-red-50 border-red-200" : ""}`}
                >
                  <Mic className={`h-5 w-5 ${isRecording ? "text-red-500 animate-pulse" : "text-gray-500"}`} />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="h-12 w-12 rounded-full shadow-md"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

