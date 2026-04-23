import { useState } from "react"
import { Send } from "lucide-react"
import Tooltip from "../components/Tooltip"

const mockConversations = [
  {
    id: 1,
    name: "Mary Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "That sounds wonderful!",
    time: "2 min ago",
    messages: [
      { id: 1, sender: "Mary Johnson", text: "Hi Jim! How are you doing?", time: "10:00 AM" },
      { id: 2, sender: "Jim", text: "I'm doing great! Just got back from the garden.", time: "10:02 AM" },
      { id: 3, sender: "Mary Johnson", text: "That sounds wonderful!", time: "10:03 AM" },
    ],
  },
  {
    id: 2,
    name: "Robert Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "See you at the fishing trip!",
    time: "1 hour ago",
    messages: [
      { id: 1, sender: "Robert Smith", text: "Hey Jim, are you coming to the fishing trip?", time: "9:00 AM" },
      { id: 2, sender: "Jim", text: "Absolutely! Looking forward to it.", time: "9:05 AM" },
      { id: 3, sender: "Robert Smith", text: "See you at the fishing trip!", time: "9:06 AM" },
    ],
  },
  {
    id: 3,
    name: "Barbara Williams",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "The quilt is finally done!",
    time: "Yesterday",
    messages: [
      { id: 1, sender: "Barbara Williams", text: "Jim, I finally finished my quilt!", time: "Yesterday" },
      { id: 2, sender: "Jim", text: "That's amazing Barbara! I'd love to see it.", time: "Yesterday" },
      { id: 3, sender: "Barbara Williams", text: "The quilt is finally done!", time: "Yesterday" },
    ],
  },
]

function Messages() {
  const [conversations, setConversations] = useState(mockConversations)
  const [selectedConvo, setSelectedConvo] = useState(mockConversations[0])
  const [messageText, setMessageText] = useState("")

  const handleSend = () => {
    if (!messageText.trim()) return
    const newMessage = {
      id: Date.now(),
      sender: "Jim",
      text: messageText,
      time: "Just now",
    }
    const updatedConvos = conversations.map((convo) =>
      convo.id === selectedConvo.id
        ? { ...convo, messages: [...convo.messages, newMessage], lastMessage: messageText }
        : convo
    )
    setConversations(updatedConvos)
    setSelectedConvo({
      ...selectedConvo,
      messages: [...selectedConvo.messages, newMessage],
      lastMessage: messageText,
    })
    setMessageText("")
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex h-[600px]">

        {/* Conversation List */}
        <div className="w-1/3 border-r border-gray-100 overflow-y-auto">
          {conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setSelectedConvo(convo)}
              className={`w-full flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedConvo.id === convo.id ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
              }`}
            >
              <img
                src={convo.avatar}
                alt={convo.name}
                className="w-14 h-14 rounded-full object-cover shrink-0"
              />
              <div className="text-left overflow-hidden">
                <p className="font-semibold text-gray-900 text-lg">{convo.name}</p>
                <p className="text-gray-500 text-base truncate">{convo.lastMessage}</p>
                <p className="text-gray-400 text-sm">{convo.time}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">

          {/* Chat Header */}
          <div className="flex items-center gap-4 p-4 border-b border-gray-100">
            <img
              src={selectedConvo.avatar}
              alt={selectedConvo.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <p className="text-xl font-bold text-gray-800">{selectedConvo.name}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConvo.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "Jim" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-5 py-3 rounded-2xl text-lg ${
                    msg.sender === "Jim"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-sm mt-1 ${msg.sender === "Jim" ? "text-blue-200" : "text-gray-400"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-100 flex items-center gap-3">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-6 py-4 text-lg text-gray-700 outline-none"
            />
            <Tooltip content="Click to send your message!" position="top">
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full"
              >
                <Send className="w-6 h-6" />
              </button>
            </Tooltip>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Messages