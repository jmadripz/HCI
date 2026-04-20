import { ThumbsUp, MessageCircle, Share2 } from "lucide-react"
import Tooltip from "./Tooltip"

function PostCard({ post }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-4 overflow-visible">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post.avatar}
          alt={post.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-bold text-gray-800 text-lg">{post.name}</p>
          <p className="text-gray-400 text-sm">{post.time}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 text-lg mb-4">{post.content}</p>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full rounded-xl mb-4 object-cover max-h-72"
        />
      )}

      {/* Actions */}
      <div className="flex justify-between border-t border-gray-100 pt-4 overflow-visible">
        <Tooltip content="Tap Like to show you enjoyed this post!">
          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-lg">
            <ThumbsUp className="w-5 h-5" />
            Like {post.likes}
          </button>
        </Tooltip>
        <Tooltip content="Tap Comment to write a reply to this post!">
          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-lg">
            <MessageCircle className="w-5 h-5" />
            Comment {post.comments}
          </button>
        </Tooltip>
        <Tooltip content="Tap Share to send this post to a friend!">
          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-lg">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </Tooltip>
      </div>

    </div>
  )
}

export default PostCard