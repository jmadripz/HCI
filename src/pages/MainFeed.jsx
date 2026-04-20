import { useState, useRef } from "react"
import { ImagePlus, Send } from "lucide-react"
import PostCard from "../components/PostCard"
import mockPosts from "../data/mockPosts"
import Tooltip from "../components/Tooltip"


function MainFeed() {
  const [posts, setPosts] = useState(mockPosts)
  const [postText, setPostText] = useState("")
  const [pendingImage, setPendingImage] = useState(null)
  const fileInputRef = useRef(null)

  const [friendRequests, setFriendRequests] = useState([
  { id: 1, name: "Ava Thompson", mutualFriends: 8 },
  { id: 2, name: "Marcus Lee", mutualFriends: 1 },
  { id: 3, name: "Sofia Ramirez", mutualFriends: 14 },
])

const [showPrivacyPopup, setShowPrivacyPopup] = useState(false)
const [selectedRequest, setSelectedRequest] = useState(null)

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPendingImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handlePost = () => {
    if (!postText.trim() && !pendingImage) return
    const newPost = {
      id: posts.length + 1,
      name: "Jim",
      avatar: "https://i.pravatar.cc/150?img=69",
      time: "Just now",
      content: postText,
      image: pendingImage,
      likes: 0,
      comments: 0,
    }
    setPosts([newPost, ...posts])
    setPostText("")
    setPendingImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""

  const handleAcceptClick = (request) => {
    setSelectedRequest(request)
    setShowPrivacyPopup(true)
  }

  const handleClosePopup = () => {
    setSelectedRequest(null)
    setShowPrivacyPopup(false)
  }

  const handleAcceptAnyway = () => {
    if (!selectedRequest) return

    setFriendRequests(
      friendRequests.filter((request) => request.id !== selectedRequest.id)
    )

    setSelectedRequest(null)
    setShowPrivacyPopup(false)
  }

  const handleDeclineRequest = (id) => {
    setFriendRequests(friendRequests.filter((request) => request.id !== id))
  }
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">

<div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
  <p className="text-lg font-semibold text-gray-700 mb-3">Friend Requests</p>
  <p className="text-sm text-gray-500 mb-4">
    Accepting a request will first show a privacy reminder.
  </p>

  <div className="space-y-3">
    {friendRequests.length > 0 ? (
      friendRequests.map((request) => (
        <div
          key={request.id}
          className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100"
        >
          <div>
            <p className="font-semibold text-gray-800">{request.name}</p>
            <p className="text-sm text-gray-500">
              {request.mutualFriends} mutual friend
              {request.mutualFriends === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleDeclineRequest(request.id)}
              className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
            >
              Decline
            </button>

            <button
              onClick={() => handleAcceptClick(request)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Accept
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="bg-gray-50 rounded-2xl p-4 text-gray-500">
        No pending friend requests.
      </div>
    )}
  </div>
</div>

      {/* Post Composer */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
        <p className="text-lg font-semibold text-gray-700 mb-3">Create a Post</p>
        <div className="flex items-start gap-3 mb-4">
          <img
            src="https://i.pravatar.cc/150?img=69"
            alt="Jim"
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
          />
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind, Jim?"
            className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-xl text-gray-700 outline-none resize-none"
            rows={3}
          />
        </div>

        {/* Image Preview */}
        {pendingImage && (
          <div className="relative mb-4">
            <img
              src={pendingImage}
              alt="preview"
              className="w-full rounded-xl object-cover max-h-72"
            />
            <button
              onClick={() => setPendingImage(null)}
              className="absolute top-2 right-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-full hover:bg-gray-900"
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <Tooltip content="Click to add a photo to your post!">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-lg font-medium px-5 py-3 rounded-xl border border-gray-200"
            >
              <ImagePlus className="w-5 h-5" />
              Add Photo
            </button>
          </Tooltip>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="hidden"
          />
          <Tooltip content="Click Post to share with your friends!">
            <button
              onClick={handlePost}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-xl"
            >
              <Send className="w-5 h-5" />
              Post
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Privacy Popup */}
{showPrivacyPopup && selectedRequest && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        Do you know this person?
      </h2>

      <p className="text-gray-600 mb-4">
        Only accept friend requests from people you know and trust.
        Accepting strangers may put your privacy and personal information at risk.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
        <p className="font-semibold text-gray-800">{selectedRequest.name}</p>
        <p className="text-sm text-gray-500">
          {selectedRequest.mutualFriends} mutual friend
          {selectedRequest.mutualFriends === 1 ? "" : "s"}
        </p>
      </div>

      <p className="text-sm text-amber-700 mb-5">
        Be cautious of unknown individuals. If you are unsure, decline the request.
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleClosePopup}
          className="flex-1 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
        >
          Cancel
        </button>

        <button
          onClick={handleAcceptAnyway}
          className="flex-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Accept Anyway
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default MainFeed