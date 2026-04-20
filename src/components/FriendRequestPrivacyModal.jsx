function FriendRequestPrivacyModal({
  isOpen,
  request,
  prompt,
  onCancel,
  onConfirm,
}) {
  if (!isOpen || !request) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-4">
          <img
            src={request.avatar}
            alt={request.name}
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {prompt.title}
            </h2>
            <p className="text-sm text-gray-500">{request.name}</p>
          </div>
        </div>

        <p className="mb-3 text-base text-gray-700">{prompt.message}</p>

        <div className="mb-5 rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Mutual friends:</span>{" "}
            {request.mutualFriends}
          </p>
          <p className="mt-1 text-sm text-gray-600">{request.shortBio}</p>
        </div>

        <p className="mb-6 text-sm text-amber-700">{prompt.caution}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
          >
            Accept Anyway
          </button>
        </div>
      </div>
    </div>
  )
}

export default FriendRequestPrivacyModal