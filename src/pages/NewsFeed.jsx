import { mockNews } from "../data/mockNews"
import Tooltip from "../components/Tooltip"

function NewsFeed() {
  console.log("NewsFeed component rendered", mockNews)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getCategoryDescription = (category) => {
    const descriptions = {
      "Health & Wellness": "Articles about physical and mental health, wellness tips, and medical research",
      "Technology": "Latest tech news, gadgets, software updates, and industry trends",
      "Environment": "Climate change, sustainability, conservation, and environmental science",
      "Business": "Business news, market trends, entrepreneurship, and economic analysis",
      "Science": "Scientific discoveries, research breakthroughs, and technological innovations"
    }
    return descriptions[category] || "General news category"
  }

  const getAuthorCredentials = (author) => {
    const credentials = {
      "Dr. Sarah Johnson": "PhD in Psychology, Mental Health Researcher at Stanford University",
      "Tech Reporter": "Senior Technology Journalist with 10+ years in Silicon Valley",
      "Environmental Correspondent": "Award-winning journalist specializing in climate and environmental issues",
      "Business Analyst": "Former Wall Street analyst with expertise in market trends and economics",
      "Science Writer": "Science communicator with background in physics and astronomy"
    }
    return credentials[author] || "Professional journalist and content creator"
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">News Feed</h1>

      <div className="space-y-6">
        {mockNews && mockNews.length > 0 ? (
          mockNews.map((news) => (
            <article key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* News Image */}
              <div className="h-48 overflow-hidden bg-gray-200">
                <Tooltip content={`Image: ${news.title}`} position="top">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      console.log('Image failed to load:', news.imageUrl)
                    }}
                  />
                </Tooltip>
              </div>

              {/* News Content */}
              <div className="p-6">
                {/* Category Badge */}
                <Tooltip content={getCategoryDescription(news.category)} position="top">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-3 cursor-help">
                    {news.category}
                  </span>
                </Tooltip>

                {/* Title */}
                <Tooltip content={`Published on ${formatDate(news.publishedAt)}`} position="top">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight cursor-help">
                    {news.title}
                  </h2>
                </Tooltip>

                {/* Content Preview */}
                <p className="text-gray-600 text-sm mb-4">
                  {news.content}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Tooltip content={getAuthorCredentials(news.author)} position="bottom">
                      <span className="font-medium cursor-help">{news.author}</span>
                    </Tooltip>
                    <span>•</span>
                    <span>{formatDate(news.publishedAt)}</span>
                  </div>
                  <Tooltip content={`Estimated reading time based on average reading speed of 200 words per minute`} position="bottom">
                    <span className="cursor-help">{news.readTime}</span>
                  </Tooltip>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No news articles available</p>
            <p>mockNews length: {mockNews ? mockNews.length : 'undefined'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsFeed