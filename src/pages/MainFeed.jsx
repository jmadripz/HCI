import { useState } from "react"
import { ImagePlus, Send } from "lucide-react"
import PostCard from "../components/PostCard"
import mockPosts from "../data/mockPosts"
import Tooltip from "../components/Tooltip"

function MainFeed() {
  const [posts, setPosts] = useState(mockPosts)
  const [postText, setPostText] = useState("")

  const handlePost = () => {
    if (!postText.trim()) return
    const newPost = {
      id: posts.length + 1,
      name: "Jim",
      avatar: "https://i.pravatar.cc/150?img=69",
      time: "Just now",
      content: postText,
      image: null,
      likes: 0,
      comments: 0,
    }
    setPosts([newPost, ...posts])
    setPostText("")
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">

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
        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <Tooltip content="Click to add a photo to your post!">
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-lg font-medium px-5 py-3 rounded-xl border border-gray-200">
              <ImagePlus className="w-5 h-5" />
              Add Photo
            </button>
          </Tooltip>
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

    </div>
  )
}

export default MainFeed