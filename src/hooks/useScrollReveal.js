import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal hook
 * Automatically animates elements matching a selector into view as they scroll.
 * 
 * @param {string} selector - CSS selector for elements to animate (default: '.gsap-reveal')
 * @param {Object} options - Custom GSAP ScrollTrigger options
 */
export function useScrollReveal(selector = '.gsap-reveal', options = {}) {
  useEffect(() => {
    // Delay slightly to ensure CMS content & DOM nodes are rendered
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(selector)
      if (!elements.length) return

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
              ...options,
            },
          }
        )
      })

      // Refresh ScrollTrigger so positions align with ScrollSmoother height
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [selector, options])
}
