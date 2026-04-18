function StoryPrompt() {
	const todayDate = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric"
	})

	const storyRows = [
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

	return (
		<section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
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
				<button
					type="button"
					className="flex h-10 w-40 items-center justify-center rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
				>
					Share your story
				</button>
				<span className="text-xs font-semibold uppercase text-gray-700">or</span>
				<button
					type="button"
					className="flex h-10 w-40 items-center justify-center rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
				>
					Post a photo
				</button>
			</div>

			<div className="mt-8 text-center">
				<p className="text-sm font-semibold text-gray-600">Stories for Today:</p>
				<p className="text-sm text-gray-500">{todayDate}</p>
			</div>

			<div className="mt-5 space-y-2">
				{storyRows.map((row) => (
					<article key={row.id} className="rounded-sm border border-gray-200 bg-gray-50 p-3">
						<div className="flex items-start gap-3">
							<img
								src={row.avatar}
								alt={`${row.name}'s avatar`}
								className="h-12 w-12 rounded-full border border-white-300 bg-white object-cover"
								onError={(event) => {
									event.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
										row.name
									)}&background=e5e7eb&color=6b7280`
								}}
							/>
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
