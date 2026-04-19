import { useState } from 'react'

const positionClasses = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
}

function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false)
  const offsetClass = positionClasses[position] ?? positionClasses.top

  return (
    <div className="relative inline-flex">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        title={content}
        aria-label={content}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={`absolute z-50 px-3 py-2 text-sm leading-snug text-white bg-black rounded-lg shadow-lg whitespace-nowrap pointer-events-none ${offsetClass}`}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default Tooltip