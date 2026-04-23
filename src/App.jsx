import NavBar from "./components/NavBar"
import TabBar from "./components/TabBar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainFeed from "./pages/MainFeed"
import CloseCircle from "./pages/CloseCircle"
import NewsFeed from "./pages/NewsFeed"
import DailyPrompt from "./pages/DailyPrompt"
import Messages from "./pages/Messages"
import Profile from "./pages/Profile"
import Friends from "./pages/Friends"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <TabBar />
      <Routes>
        <Route path="/" element={<MainFeed />} />
        <Route path="/close-circle" element={<CloseCircle />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/daily-prompt" element={<DailyPrompt />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App