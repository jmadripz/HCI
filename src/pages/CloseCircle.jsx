import { useState } from "react"
import { UserPlus, X } from "lucide-react"
import PostCard from "../components/PostCard"
import Tooltip from "../components/Tooltip"

const allFriends = [
  { id: 1, name: "Mary Johnson", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Robert Smith", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Barbara Williams", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Sandra Lee", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 5, name: "Michael Davis", avatar: "https://i.pravatar.cc/150?img=15" },
]

const mockCirclePosts = [
  {
    id: 1,
    name: "Mary Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    time: "1 hour ago",
    content: "Just baked my famous apple pie! The whole house smells amazing. 🥧",
    image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=800",
    likes: 8,
    comments: 2,
  },
  {
    id: 2,
    name: "Robert Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "3 hours ago",
    content: "Took the grandkids fishing this morning. Best day ever! 🎣",
    image: null,
    likes: 15,
    comments: 4,
  },
]

function CloseCircle() {
  const [circleMembers, setCircleMembers] = useState([allFriends[0], allFriends[1]])
  const [showAddMenu, setShowAddMenu] = useState(false)

  const addMember = (friend) => {
    if (!circleMembers.find((m) => m.id === friend.id)) {
      setCircleMembers([...circleMembers, friend])
    }
    setShowAddMenu(false)
  }

  const removeMember = (id) => {
    setCircleMembers(circleMembers.filter((m) => m.id !== id))
  }

  const availableFriends = allFriends.filter(
    (f) => !circleMembers.find((m) => m.id === f.id)
  )

  const circlePosts = mockCirclePosts.filter((post) =>
    circleMembers.find((m) => m.name === post.name)
  )

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Close Circle</h1>

      {/* Circle Members Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">My Circle</h2>
          <Tooltip content="Add a friend to your Close Circle" position="bottom">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl text-base"
            >
              <UserPlus className="w-5 h-5" />
              Add Member
            </button>
          </Tooltip>
        </div>

        {/* Add Member Dropdown */}
        {showAddMenu && (
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 mb-4">
            {availableFriends.length === 0 ? (
              <p className="text-gray-500 text-base">All friends are already in your circle!</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-500 mb-2">Select a friend to add:</p>
                {availableFriends.map((friend) => (
                  <button
                    key={friend.id}
                    onClick={() => addMember(friend)}
                    className="flex items-center gap-3 w-full hover:bg-white rounded-xl p-2 transition-colors"
                  >
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-base text-gray-800">{friend.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Current Members */}
        {circleMembers.length === 0 ? (
          <p className="text-gray-400 text-base text-center py-4">
            Your circle is empty. Add some friends!
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {circleMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-base text-gray-800">{member.name}</span>
                <Tooltip content={`Remove ${member.name} from your circle`} position="top">
                  <button
                    onClick={() => removeMember(member.id)}
                    className="text-gray-400 hover:text-red-500 ml-1 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Circle Feed */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Circle Feed</h2>
      {circlePosts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center text-gray-400 text-lg">
          No posts from your circle yet. Add more members to see their posts!
        </div>
      ) : (
        circlePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))
      )}

    </div>
  )
}

export default CloseCircle