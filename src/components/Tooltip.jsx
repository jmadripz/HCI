import { useState } from 'react'

function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-pointer bg-yellow-200 p-1 rounded"
        title={content} // Fallback using native browser tooltip
      >
        {children}
        {isVisible && (
          <div className="absolute z-50 px-3 py-2 text-sm text-white bg-red-500 rounded-lg shadow-lg whitespace-nowrap top-full left-0 mt-1">
            {content}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tooltip