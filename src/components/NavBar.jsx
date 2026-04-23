import { Search, Settings, User, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Tooltip from "./Tooltip"

function NavBar() {
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left - Logo + Search */}
      {/* Left - Logo + Search + Friends */}
    <div className="flex items-center gap-6">
      <h1 className="text-2xl font-bold text-blue-600">Facebook</h1>
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-4">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-lg text-gray-700 w-48"
        />
      </div>
  <Tooltip content="View your friend requests" position="bottom">
    <button
      onClick={() => navigate("/friends")}
      className="relative flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-lg font-medium px-4 py-2 rounded-xl border border-gray-200"
    >
      <Users className="w-5 h-5" />
      Friends
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
        3
      </span>
    </button>
  </Tooltip>
</div>

      {/* Right - Friends + Profile + Settings */}
      <div className="flex items-center gap-4">

        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80"
        >
          <img
            src="https://i.pravatar.cc/150?img=69"
            alt="Jim"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-gray-800 font-medium text-lg">Jim</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-lg font-medium px-4 py-2 rounded-xl border border-gray-200"
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>

      </div>
    </nav>
  )
}

export default NavBar