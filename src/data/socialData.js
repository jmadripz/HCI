export const friendRequests = [
  {
    id: 1,
    name: "Ava Thompson",
    mutualFriends: 8,
    avatar: "https://i.pravatar.cc/150?img=32",
    shortBio: "Lives nearby and knows two of your classmates.",
  },
  {
    id: 2,
    name: "Marcus Lee",
    mutualFriends: 1,
    avatar: "https://i.pravatar.cc/150?img=12",
    shortBio: "No recent activity in common.",
  },
  {
    id: 3,
    name: "Sofia Ramirez",
    mutualFriends: 14,
    avatar: "https://i.pravatar.cc/150?img=47",
    shortBio: "Family friend and tagged in shared photos.",
  },
]

export const closeCircleMembers = [
  {
    id: 1,
    name: "Mom",
    relationship: "Family",
    avatar: "https://i.pravatar.cc/150?img=48",
  },
  {
    id: 2,
    name: "Best Friend",
    relationship: "Friend",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 3,
    name: "Cousin Maya",
    relationship: "Family",
    avatar: "https://i.pravatar.cc/150?img=28",
  },
]

export const closeCirclePosts = [
  {
    id: 1,
    name: "Mom",
    avatar: "https://i.pravatar.cc/150?img=48",
    time: "1h ago",
    content: "Dinner at 7 tonight. Don’t forget.",
  },
  {
    id: 2,
    name: "Best Friend",
    avatar: "https://i.pravatar.cc/150?img=15",
    time: "3h ago",
    content: "Movie night plans still on?",
  },
  {
    id: 3,
    name: "Cousin Maya",
    avatar: "https://i.pravatar.cc/150?img=28",
    time: "Yesterday",
    content: "Uploaded the family reunion photos.",
  },
]

export const privacyPrompt = {
  title: "Do you know this person?",
  message:
    "Only accept friend requests from people you know and trust. Accepting strangers can put your privacy and personal information at risk.",
  caution:
    "If you are unsure, decline the request or review their profile first.",
}