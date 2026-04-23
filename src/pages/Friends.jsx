import { useState } from "react"
import FriendRequestCard from "../components/FriendRequestCard"
import FriendRequestPrivacyModal from "../components/FriendRequestPrivacyModal"

const mockRequests = [
  {
    id: 1,
    name: "Robert Johnson",
    avatar: "https://i.pravatar.cc/150?img=11",
    mutualFriends: 2,
    shortBio: "Retired engineer from Houston. Loves fishing and woodworking.",
  },
  {
    id: 2,
    name: "Sandra Lee",
    avatar: "https://i.pravatar.cc/150?img=5",
    mutualFriends: 0,
    shortBio: "No mutual friends. Account created recently.",
  },
  {
    id: 3,
    name: "Michael Davis",
    avatar: "https://i.pravatar.cc/150?img=15",
    mutualFriends: 5,
    shortBio: "Former teacher. Enjoys gardening and traveling.",
  },
]

const privacyPrompt = {
  title: "Do you know this person?",
  message: "Only accept friend requests from people you know personally. Accepting requests from strangers can compromise your privacy and personal information.",
  caution: "⚠️ This person may not be who they say they are. Please make sure you recognize them before accepting.",
}

function Friends() {
  const [requests, setRequests] = useState(mockRequests)
  const [acceptedFriends, setAcceptedFriends] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const handleAcceptClick = (request) => {
    setSelectedRequest(request)
    setModalOpen(true)
  }

  const handleDeclineClick = (id) => {
    setRequests(requests.filter((r) => r.id !== id))
  }

  const handleConfirm = () => {
    setAcceptedFriends([...acceptedFriends, selectedRequest])
    setRequests(requests.filter((r) => r.id !== selectedRequest.id))
    setModalOpen(false)
    setSelectedRequest(null)
  }

  const handleCancel = () => {
    setModalOpen(false)
    setSelectedRequest(null)
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Friend Requests</h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center text-gray-500 text-lg">
          No pending friend requests!
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {requests.map((request) => (
            <FriendRequestCard
              key={request.id}
              request={request}
              onAcceptClick={handleAcceptClick}
              onDeclineClick={handleDeclineClick}
            />
          ))}
        </div>
      )}

      {acceptedFriends.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Added Friends</h2>
          <div className="space-y-3">
            {acceptedFriends.map((friend) => (
              <div key={friend.id} className="flex items-center gap-4 bg-white rounded-2xl shadow-md border border-gray-100 p-4">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <p className="text-lg font-semibold text-gray-800">{friend.name}</p>
                <span className="ml-auto text-green-600 font-medium text-sm">✓ Added</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <FriendRequestPrivacyModal
        isOpen={modalOpen}
        request={selectedRequest}
        prompt={privacyPrompt}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  )
}

export default Friends