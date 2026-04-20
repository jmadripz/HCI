import { User } from "lucide-react"
import { useRef, useState } from "react"
import Tooltip from "./Tooltip"

const initialStoryRows = [
	{
		id: 1,
		name: "Lynn",
		avatar: "https://t3.ftcdn.net/jpg/03/72/02/04/360_F_372020430_4Qb051hyweWYdqJPaMi423DgMRayy7is.jpg",
		text: "One Time I got lost in the city and ended up discovering a hidden gem of a cafe that I now visit regularly. It's the best!!!!!",
		storyPhoto: null
	},
	{
		id: 2,
		name: "Noah",
		avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWy4qYyqxZ95QzeskwIBceTDPXiTckKBtdbQ&s",
		text: "I saw this cop car that had \"Zombie Hunter\" on the back and I thought it was hilarious. It made my day!",
		storyPhoto: "https://scontent-dfw6-1.xx.fbcdn.net/v/t39.30808-6/514354603_24324015273857493_864285450657031229_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=103&ccb=1-7&_nc_sid=0327a3&_nc_ohc=53jjO2owoI0Q7kNvwGyrD9U&_nc_oc=Adpu8y-zyOylqaFFRQZSU8EtgLChyFxXkbUO9iFqrDuJD-XfKV7JkGhpnd0OuwHHo1s&_nc_zt=23&_nc_ht=scontent-dfw6-1.xx&_nc_gid=Sg5u8C7TWGiI5UbLngsyTQ&_nc_ss=7a389&oh=00_Af11QjTpOtZZo84iKlwGs8Cf2el4F09rqpKJ7xhQMQJD6w&oe=69E8D8F3"
	},
	{
		id: 3,
		name: "Mark",
		avatar: "https://scontent-dfw5-1.xx.fbcdn.net/v/t39.30808-6/326343980_1283493222381132_6921946581584498140_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=ROPEVwoDh_8Q7kNvwEXGXT1&_nc_oc=Adrpfgsh-CrfLeOQKUJ2ZA8cOslQeQfg7ZbnoGwofvHDUEdKwgcAiRWMH7jFKF_Pf4s&_nc_zt=23&_nc_ht=scontent-dfw5-1.xx&_nc_gid=csRn4hxVO9dSMJS2FOOe-w&_nc_ss=7a389&oh=00_Af2gTXIxBHHtbgh5e5Up3QPD_easzNkKluAGGVNu6MwyTA&oe=69E8C5AC",
		text: "I once went on a hike and got caught in a sudden rainstorm. I had to take shelter under a tree for hours until the storm passed. It was scary but also kind of exhilarating!",
		storyPhoto: null
	}
]

function StoryPrompt() {
	const [storyRows, setStoryRows] = useState(initialStoryRows)
	const [isStoryDraftOpen, setIsStoryDraftOpen] = useState(false)
	const [pendingStoryText, setPendingStoryText] = useState("")
	const [pendingPhoto, setPendingPhoto] = useState(null)
	const [photoCaption, setPhotoCaption] = useState("")
	const fileInputRef = useRef(null)

	const todayDate = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric"
	})

	const addStoryRow = ({ text, storyPhoto }) => {
		setStoryRows((currentRows) => [
			{
				id: Date.now(),
				name: "You",
				avatar: null,
				text,
				storyPhoto
			},
			...currentRows
		])
	}

	const handleShareStory = () => {
		setIsStoryDraftOpen(true)
		setPendingStoryText("")
	}

	const clearStoryDraft = () => {
		setIsStoryDraftOpen(false)
		setPendingStoryText("")
	}

	const handlePostStory = () => {
		if (!pendingStoryText.trim()) return
		addStoryRow({ text: pendingStoryText.trim(), storyPhoto: null })
		clearStoryDraft()
	}

	const handlePostPhotoClick = () => {
		fileInputRef.current?.click()
	}

	const clearPhotoDraft = () => {
		setPendingPhoto(null)
		setPhotoCaption("")
		if (fileInputRef.current) fileInputRef.current.value = ""
	}

	const handlePhotoSelected = (event) => {
		const selectedFile = event.target.files?.[0]
		if (!selectedFile) return
		const fileReader = new FileReader()
		fileReader.onload = () => {
			if (typeof fileReader.result === "string") setPendingPhoto(fileReader.result)
		}
		fileReader.readAsDataURL(selectedFile)
	}

	const handlePostPhotoWithCaption = () => {
		if (!pendingPhoto) return
		addStoryRow({ text: photoCaption.trim() || "Shared a photo", storyPhoto: pendingPhoto })
		clearPhotoDraft()
	}

	return (
		<section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
			<div className="rounded-3xl bg-gray-300 p-3 sm:p-4">
				<div className="rounded-full bg-white px-6 py-4 text-center shadow-inner">
					<p className="text-m font-semibold uppercase tracking-wide text-gray-600 sm:text-sm">
						Today's Prompt
					</p>
					<p className="mt-1 text-sm font-medium text-black-700 sm:text-base">
						Tell a story about a time you...
					</p>
				</div>
			</div>

			<div className="mx-auto mt-5 flex w-fit flex-wrap items-center justify-center gap-2 rounded-sm bg-gray-200 p-2 sm:gap-3 sm:px-3">
				<Tooltip content="Click here to write and share your own story!" position="bottom">
					<button
						type="button"
						onClick={handleShareStory}
						className="flex h-10 w-40 items-center justify-center rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
					>
						Share your story
					</button>
				</Tooltip>
				<span className="text-xs font-semibold uppercase text-gray-700">or</span>
				<Tooltip content="Click here to upload a photo to share with your story!" position="bottom">
					<button
						type="button"
						onClick={handlePostPhotoClick}
						className="flex h-10 w-40 items-center justify-center rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
					>
						Post a photo
					</button>
				</Tooltip>
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					onChange={handlePhotoSelected}
					className="hidden"
				/>
			</div>

			{isStoryDraftOpen ? (
				<div className="mx-auto mt-4 w-full max-w-xl rounded-sm border border-gray-300 bg-white p-3">
					<p className="text-sm font-semibold text-gray-800">Share your story:</p>
					<input
						type="text"
						value={pendingStoryText}
						onChange={(event) => setPendingStoryText(event.target.value)}
						placeholder="Write your story"
						className="mt-3 w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-gray-500 focus:outline-none"
					/>
					<div className="mt-3 flex flex-wrap gap-2">
						<Tooltip content="Click Post to share your story with everyone!" position="bottom">
							<button
								type="button"
								onClick={handlePostStory}
								className="rounded-sm border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
							>
								Post
							</button>
						</Tooltip>
						<Tooltip content="Click Cancel to discard your story" position="bottom">
							<button
								type="button"
								onClick={clearStoryDraft}
								className="rounded-sm border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
							>
								Cancel
							</button>
						</Tooltip>
					</div>
				</div>
			) : null}

			{pendingPhoto ? (
				<div className="mx-auto mt-4 w-full max-w-xl rounded-sm border border-gray-300 bg-white p-3">
					<p className="text-sm font-semibold text-gray-800">Ready to post this photo:</p>
					<img
						src={pendingPhoto}
						alt="Photo preview"
						className="mt-2 h-48 w-full rounded-sm border border-gray-200 object-cover"
					/>
					<input
						type="text"
						value={photoCaption}
						onChange={(event) => setPhotoCaption(event.target.value)}
						placeholder="Write a caption (optional)"
						className="mt-3 w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-gray-500 focus:outline-none"
					/>
					<div className="mt-3 flex flex-wrap gap-2">
						<Tooltip content="Click Post to share your photo with everyone!" position="bottom">
							<button
								type="button"
								onClick={handlePostPhotoWithCaption}
								className="rounded-sm border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
							>
								Post
							</button>
						</Tooltip>
						<Tooltip content="Click Cancel to discard your photo" position="bottom">
							<button
								type="button"
								onClick={clearPhotoDraft}
								className="rounded-sm border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
							>
								Cancel
							</button>
						</Tooltip>
					</div>
				</div>
			) : null}

			<div className="mt-8 text-center">
				<p className="text-sm font-semibold text-gray-600">Stories for Today:</p>
				<p className="text-sm text-gray-500">{todayDate}</p>
			</div>

			<div className="mt-5 space-y-2">
				{storyRows.map((row) => (
					<article key={row.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
						<div className="flex items-start gap-3">
							{row.avatar ? (
								<img
									src={row.avatar}
									alt={`${row.name}'s avatar`}
									className="h-12 w-12 rounded-full border border-white-300 bg-white object-cover"
									onError={(event) => {
										event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=e5e7eb&color=6b7280`
									}}
								/>
							) : (
								<div className="flex h-12 w-12 items-center justify-center rounded-full border border-white-300 bg-white text-gray-600">
									<User className="h-7 w-7" />
								</div>
							)}
							<div className="pt-1">
								<p className="text-m font-semibold text-gray-900">{row.name}</p>
								<p className="text-m text-gray-900">{row.text}</p>
							</div>
						</div>
						{row.storyPhoto ? (
							<img
								src={row.storyPhoto}
								alt={`${row.name}'s story`}
								className="mt-3 h-40 w-full rounded-sm border border-gray-200 bg-gray-100 object-cover"
							/>
						) : null}
					</article>
				))}
			</div>
		</section>
	)
}

export default StoryPrompt