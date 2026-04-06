import { Search, Settings, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

function NavBar() {
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Left - Logo + Search */}
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
      </div>

      {/* Right - Profile + Settings */}
      <div className="flex items-center gap-4">
        
        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80"
        >
          <User className="w-8 h-8 text-gray-600" />
          <span className="text-gray-700 font-medium text-lg">Jim</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => navigate("/settings")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl p-2 rounded-full"
        >
          <Settings />
        </button>

      </div>
    </nav>
  )
}

export default NavBar