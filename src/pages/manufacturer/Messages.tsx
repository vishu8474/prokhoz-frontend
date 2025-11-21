import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(1);
  
  const conversations = [
    { id: 1, name: "ABC Corporation", lastMessage: "When can you deliver?", time: "2h ago", unread: 2 },
    { id: 2, name: "XYZ Industries", lastMessage: "Thanks for the quote", time: "5h ago", unread: 0 },
    { id: 3, name: "DEF Manufacturing", lastMessage: "Can we negotiate the price?", time: "1d ago", unread: 1 },
    { id: 4, name: "GHI Enterprises", lastMessage: "Order confirmed", time: "2d ago", unread: 0 },
  ];

  const messages = [
    { id: 1, sender: "them", text: "Hello, I'm interested in your Steel Rods", time: "10:30 AM" },
    { id: 2, sender: "me", text: "Hello! Thank you for your interest. What quantity do you need?", time: "10:35 AM" },
    { id: 3, sender: "them", text: "We need around 200 tons. What's your best price?", time: "10:40 AM" },
    { id: 4, sender: "me", text: "For 200 tons, we can offer $1,150 per ton. This includes delivery.", time: "10:45 AM" },
    { id: 5, sender: "them", text: "That sounds good. When can you deliver?", time: "11:00 AM" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Messages</h2>
        <p className="text-muted-foreground">Chat with buyers and manage inquiries</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full border-b p-4 text-left transition-colors hover:bg-muted ${
                    selectedChat === conv.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conv.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{conv.name}</h4>
                        {conv.unread > 0 && (
                          <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-sm text-muted-foreground">{conv.lastMessage}</p>
                      <p className="text-xs text-muted-foreground">{conv.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>ABC Corporation</CardTitle>
                <p className="text-sm text-muted-foreground">Active now</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px] p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`mt-1 text-xs ${
                          msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
