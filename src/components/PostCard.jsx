import { useState } from "react"
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react"
import Tooltip from "./Tooltip"

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes)
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState(post.comments)
  const [commentList, setCommentList] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
      setLiked(false)
    } else {
      setLikes(likes + 1)
      setLiked(true)
    }
  }

  const handleComment = () => {
    if (!commentText.trim()) return
    setCommentList([...commentList, { id: Date.now(), name: "Jim", text: commentText }])
    setComments(comments + 1)
    setCommentText("")
  }

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

      {/* Like/Comment counts */}
      <div className="flex gap-4 text-gray-400 text-base mb-3 border-b border-gray-100 pb-3">
        <span>👍 {likes} Likes</span>
        <span>💬 {comments} Comments</span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3 overflow-visible">
        <Tooltip content="Tap Like to show you enjoyed this post!">
          <button
            onClick={handleLike}
            className={`w-full flex flex-col items-center gap-1 py-3 rounded-xl text-lg transition-colors border ${
              liked ? "bg-blue-50 text-blue-600 border-blue-200 font-bold" : "bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 border-gray-200"
            }`}
          >
            <ThumbsUp className="w-6 h-6" />
            <span>{liked ? "Liked" : "Like"}</span>
          </button>
        </Tooltip>

        <Tooltip content="Tap Comment to write a reply to this post!">
          <button
            onClick={() => setShowComments(!showComments)}
            className="w-full flex flex-col items-center gap-1 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 py-3 rounded-xl text-lg transition-colors border border-gray-200"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Comment</span>
          </button>
        </Tooltip>

        <Tooltip content="Tap Share to send this post to a friend!">
          <button
            className="w-full flex flex-col items-center gap-1 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-500 py-3 rounded-xl text-lg transition-colors border border-gray-200"
          >
            <Share2 className="w-6 h-6" />
            <span>Share</span>
          </button>
        </Tooltip>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          
          {/* Comment Input */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://i.pravatar.cc/150?img=69"
              alt="Jim"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
                placeholder="Write a comment..."
                className="flex-1 bg-transparent outline-none text-base text-gray-700"
              />
              <button
                onClick={handleComment}
                className="text-blue-600 font-medium text-sm hover:text-blue-700"
              >
                Post
              </button>
            </div>
          </div>

          {/* Comment List */}
          {commentList.length === 0 ? (
            <p className="text-gray-400 text-sm text-center">No comments yet. Be the first!</p>
          ) : (
            commentList.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3 mb-3">
                <img
                  src="https://i.pravatar.cc/150?img=69"
                  alt={comment.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <p className="font-semibold text-gray-800 text-sm">{comment.name}</p>
                  <p className="text-gray-700 text-base">{comment.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  )
}

export default PostCard