import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * SmoothScrollWrapper
 * Provides container structure and automatic ScrollTrigger refreshes on route transitions.
 */
function SmoothScrollWrapper({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    // Refresh GSAP measurements on route change
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    // Observe content height changes (e.g. when async CMS page data loads)
    const contentEl = document.getElementById('smooth-content')
    let observer
    if (contentEl && typeof window !== 'undefined' && window.ResizeObserver) {
      observer = new ResizeObserver(() => {
        ScrollTrigger.refresh()
      })
      observer.observe(contentEl)
    }

    return () => {
      clearTimeout(timer)
      if (observer) observer.disconnect()
    }
  }, [pathname])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}

export default SmoothScrollWrapper
