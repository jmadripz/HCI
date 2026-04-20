function FriendRequestCard({ request, onAcceptClick, onDeclineClick }) {
  return (
    <div className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={request.avatar}
          alt={request.name}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {request.name}
          </h3>
          <p className="text-sm text-gray-600">
            {request.mutualFriends} mutual friend
            {request.mutualFriends === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onDeclineClick(request.id)}
          className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Decline
        </button>

        <button
          onClick={() => onAcceptClick(request)}
          className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Accept
        </button>
      </div>
    </div>
  )
}

export default FriendRequestCard