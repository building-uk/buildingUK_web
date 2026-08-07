import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop - Automatically scrolls to top on route change.
 * Uses GSAP ScrollSmoother when available, falls back to window.scrollTo.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Use GSAP smoother if available, otherwise native scroll
    if (window.smoother) {
      window.smoother.scrollTo(0, false) // false = instant (no animation)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

export default ScrollToTop
