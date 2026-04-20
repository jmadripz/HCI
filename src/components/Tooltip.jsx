import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const ref = useRef(null)

  const handleMouseEnter = () => {
    const rect = ref.current.getBoundingClientRect()
    setCoords({
      top: rect.top + window.scrollY - 10,
      left: rect.left + rect.width / 2,
    })
    setIsVisible(true)
  }

  return (
    <div
      ref={ref}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && createPortal(
        <div
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
          }}
          className="px-3 py-2 text-sm text-white bg-gray-800 rounded-xl shadow-lg whitespace-nowrap"
        >
          {content}
          <div className="w-3 h-3 bg-gray-800 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        </div>,
        document.body
      )}
    </div>
  )
}

export default Tooltip