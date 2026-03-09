import { useEffect, useRef } from 'react'

/**
 * Custom hook for parallax scrolling effect
 * @param {number} speed - Parallax speed multiplier (default: 0.5)
 * @returns {React.MutableRefObject} - Ref to attach to the target element
 */
export function useParallax(speed = 0.5) {
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.scrollY
        const offset = scrolled * speed
        ref.current.style.transform = `translateY(${offset}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    // Initial calculation
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return ref
}
