import { mockNews } from "../data/mockNews"
import Tooltip from "../components/Tooltip"

function NewsFeed() {
  console.log("NewsFeed component rendered", mockNews)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">News Feed</h1>

      <div className="space-y-6">
        {mockNews && mockNews.length > 0 ? (
          mockNews.map((news) => (
            <article key={news.id} className="bg-white rounded-lg shadow-md overflow-visible hover:shadow-lg transition-shadow duration-300">
              <Tooltip content="Featured article image" position="top">
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      console.log('Image failed to load:', news.imageUrl)
                    }}
                  />
                </div>
              </Tooltip>

              <div className="p-6">
                <Tooltip content={`Category: ${news.category}`} position="top">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                    {news.category}
                  </span>
                </Tooltip>

                <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {news.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                  {news.content}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Tooltip content={`Author: ${news.author}`} position="bottom">
                      <span className="font-medium">{news.author}</span>
                    </Tooltip>
                    <span>•</span>
                    <Tooltip content={`Published on ${formatDate(news.publishedAt)}`} position="bottom">
                      <span>{formatDate(news.publishedAt)}</span>
                    </Tooltip>
                  </div>
                  <Tooltip content={`Estimated reading time: ${news.readTime}`} position="bottom">
                    <span>{news.readTime}</span>
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