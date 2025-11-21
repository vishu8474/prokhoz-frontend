import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const conversations = [
  {
    id: 1,
    supplier: "Global Steel Industries",
    lastMessage: "Yes, we can fulfill your requirement. Let me send you the quote.",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    supplier: "Premium Plastics Ltd.",
    lastMessage: "The samples are ready for dispatch. Please confirm the delivery address.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    supplier: "ABC Manufacturing Co.",
    lastMessage: "Thank you for your inquiry. We'll get back to you within 24 hours.",
    time: "2 days ago",
    unread: 1,
  },
];

const mockMessages = [
  { id: 1, sender: "supplier", text: "Hello! Thank you for your inquiry.", time: "10:15 AM" },
  { id: 2, sender: "buyer", text: "Hi, I need 50 tons of steel sheets. Can you provide that?", time: "10:20 AM" },
  { id: 3, sender: "supplier", text: "Yes, we can fulfill your requirement. Let me send you the quote.", time: "10:30 AM" },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle message sending
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Chat with suppliers and manage inquiries</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-16rem)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-22rem)]">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 cursor-pointer border-b transition-colors ${
                    selectedConversation.id === conv.id
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conv.supplier[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {conv.supplier}
                        </h4>
                        {conv.unread > 0 && (
                          <Badge variant="destructive" className="ml-2 shrink-0">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{conv.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {selectedConversation.supplier[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedConversation.supplier}</CardTitle>
                <p className="text-sm text-muted-foreground">Active now</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "buyer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "buyer"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "buyer"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} variant="dashboard">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
