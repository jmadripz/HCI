import { useState, useRef } from "react"
import { Camera, Pencil, Check, X, MapPin, Briefcase, GraduationCap, School, Cake } from "lucide-react"
import Tooltip from "../components/Tooltip"
import mockPosts from "../data/mockPosts"
import PostCard from "../components/PostCard"

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("Jim")
  const [bio, setBio] = useState("Retired teacher. Love gardening, travel, and keeping up with the grandkids. 🌱")
  const [temp, setTemp] = useState({})
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=69")
  const fileInputRef = useRef(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setAvatar(reader.result)
    reader.readAsDataURL(file)
  }

  const [details, setDetails] = useState({
    location: "Baton Rouge, LA",
    occupation: "Retired Teacher",
    highSchool: "Baton Rouge High School",
    college: "Louisiana State University",
    birthday: "March 12, 1952",
  })

  const handleEdit = () => {
    setTemp({ name, bio, ...details })
    setIsEditing(true)
  }

  const handleSave = () => {
    setName(temp.name)
    setBio(temp.bio)
    setDetails({
      location: temp.location,
      occupation: temp.occupation,
      highSchool: temp.highSchool,
      college: temp.college,
      birthday: temp.birthday,
    })
    setIsEditing(false)
  }

  const detailItems = [
    { icon: MapPin, label: "Location", key: "location" },
    { icon: Briefcase, label: "Occupation", key: "occupation" },
    { icon: School, label: "High School", key: "highSchool" },
    { icon: GraduationCap, label: "College", key: "college" },
    { icon: Cake, label: "Birthday", key: "birthday" },
  ]

  const myPosts = mockPosts.filter(post => post.name === "Jim")

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100">

          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-2xl" />

          {/* Avatar + Name */}
          <div className="px-8 pb-6 overflow-visible">
            <div className="flex items-end justify-between -mt-8 mb-6 overflow-visible">
              <div className="flex items-center gap-4">
                <img
                  src={avatar}
                  alt="Jim"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                />
                <Tooltip content="Update your profile photo" position="bottom">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow mt-8"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </Tooltip>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <Tooltip content="Edit your profile" position="bottom">
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2 rounded-xl border border-gray-200 text-base"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Profile
                  </button>
                </Tooltip>
              )}
            </div>

            {/* Name */}
            {isEditing ? (
              <input
                value={temp.name}
                onChange={(e) => setTemp({ ...temp, name: e.target.value })}
                className="text-2xl font-bold text-gray-900 border-b-2 border-blue-400 outline-none mb-2 w-full"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
            )}

            {/* Bio */}
            {isEditing ? (
              <textarea
                value={temp.bio}
                onChange={(e) => setTemp({ ...temp, bio: e.target.value })}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-lg text-gray-700 outline-none resize-none"
                rows={2}
              />
            ) : (
              <p className="text-gray-600 text-lg">{bio}</p>
            )}
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">About Jim</h2>
          <div className="space-y-4">
            {detailItems.map(({ icon: Icon, label, key }) => (
              <div key={key} className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-blue-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400">{label}</p>
                  {isEditing ? (
                    <input
                      value={temp[key]}
                      onChange={(e) => setTemp({ ...temp, [key]: e.target.value })}
                      className="w-full bg-gray-100 rounded-lg px-3 py-2 text-base text-gray-700 outline-none mt-1"
                    />
                  ) : (
                    <p className="text-base text-gray-800">{details[key]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Save / Cancel */}
          {isEditing && (
            <div className="flex gap-3 mt-6">
              <Tooltip content="Save your changes" position="bottom">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl text-lg"
                >
                  <Check className="w-5 h-5" />
                  Save
                </button>
              </Tooltip>
              <Tooltip content="Discard changes" position="bottom">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium px-6 py-3 rounded-xl border border-gray-200 text-lg"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </Tooltip>
            </div>
          )}
        </div>

        {/* My Posts */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Posts</h2>
          {myPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Profile