import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

/**
 * SmoothScrollWrapper
 * Wraps the app in GSAP ScrollSmoother's required structure.
 * The smoother instance is stored on window.smoother for access
 * by other components (e.g. ScrollToTop, LegalPage anchor scroll).
 */
function SmoothScrollWrapper({ children }) {
  const smootherRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    // Kill any existing smoother instance before creating a new one
    if (smootherRef.current) {
      smootherRef.current.kill()
    }
    ScrollTrigger.getAll().forEach(t => t.kill())

    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.4,           // inertia: higher = more lag
      effects: true,         // enable data-speed parallax attributes
      smoothTouch: 0.1,      // slight smoothing on touch (near-native feel)
      normalizeScroll: true, // prevents address bar from affecting scroll
    })

    // Expose globally so ScrollToTop and anchor links can use it
    window.smoother = smootherRef.current

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill()
        smootherRef.current = null
        window.smoother = null
      }
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [pathname]) // re-init on every route change

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}

export default SmoothScrollWrapper
