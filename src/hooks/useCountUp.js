import { useState, useEffect } from 'react'

/**
 * useCountUp hook - Animates a number from 0 to a target value
 * @param {string} value - The target value string (e.g., "25+")
 * @param {number} duration - Animation duration in ms (default 2000)
 * @returns {string} The current animated value
 */
export const useCountUp = (value, duration = 2000) => {
    const [count, setCount] = useState(0)

    // Extract numeric part and suffix
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0
    const suffix = value.replace(/[0-9]/g, '')

    useEffect(() => {
        let startTime = null
        let animationFrameId

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)

            setCount(Math.floor(progress * numericValue))

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate)
            }
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrameId)
    }, [numericValue, duration])

    return `${count}${suffix}`
}
