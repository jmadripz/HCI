import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'

function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const ref = useRef(null)

  const handleMouseEnter = () => {
    const rect = ref.current.getBoundingClientRect()
    if (position === 'bottom') {
      setCoords({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + rect.width / 2,
      })
    } else {
      setCoords({
        top: rect.top + window.scrollY - 10,
        left: rect.left + rect.width / 2,
      })
    }
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
            transform: position === 'bottom' ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
            zIndex: 9999,
          }}
          className="px-3 py-2 text-sm text-white bg-gray-800 rounded-xl shadow-lg whitespace-nowrap"
        >
          {content}
          <div className={`w-3 h-3 bg-gray-800 rotate-45 absolute left-1/2 -translate-x-1/2 ${position === 'bottom' ? '-top-1.5' : '-bottom-1.5'}`} />
        </div>,
        document.body
      )}
    </div>
  )
}

export default Tooltip