import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useCountUp hook - Animates a number from 0 to target value when scrolled into view via GSAP ScrollTrigger
 * @param {string} value - Target value string (e.g., "250+", "98%")
 * @param {number} duration - Animation duration in seconds (default 2)
 * @returns {{ count: string, ref: React.RefObject }} The current animated string value and the ref to attach to the element
 */
export const useCountUp = (value = '', duration = 2) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  // Extract numeric part and non-numeric suffix/prefix
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (!ref.current || !numericValue) return

    const counterObj = { val: 0 }

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(counterObj, {
          val: numericValue,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(Math.floor(counterObj.val))
          },
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [numericValue, duration])

  return {
    value: `${count}${suffix}`,
    ref,
  }
}
