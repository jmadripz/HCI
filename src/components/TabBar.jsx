import { useNavigate, useLocation } from "react-router-dom"
import { Home, Users, Newspaper, PenLine, MessageCircle } from "lucide-react"
import Tooltip from "./Tooltip"

function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const tabs = [
    { name: "Main Feed", icon: Home, path: "/", tooltip: "View posts from your friends and family" },
    { name: "Close Circle", icon: Users, path: "/close-circle", tooltip: "View posts from your closest friends and family only" },
    { name: "News", icon: Newspaper, path: "/news", tooltip: "Stay up to date with the latest news" },
    { name: "Daily Prompt", icon: PenLine, path: "/daily-prompt", tooltip: "Share a story or photo based on today's prompt", position: "bottom" },
    { name: "Messages", icon: MessageCircle, path: "/messages", tooltip: "Send and receive messages from friends" },
  ]

  return (
    <div className="bg-white border-b border-blue-400 px-6 flex justify-between w-full overflow-x-auto">
      {tabs.map(({ name, icon: Icon, path, tooltip, position }) => (
        <Tooltip key={name} content={tooltip} position={position || "bottom"}>
          <button
            onClick={() => navigate(path)}
            className={`py-3 px-5 text-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              location.pathname === path
                ? "bg-blue-500 text-white rounded-t-2xl border-transparent"
                : "border-transparent text-gray-600 hover:text-blue-600"
            }`}
          >
            {name}
            <Icon className="w-5 h-5" />
          </button>
        </Tooltip>
      ))}
    </div>
  )
}

export default TabBar