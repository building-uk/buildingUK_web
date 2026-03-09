import { useEffect } from 'react'

/**
 * usePageTitle hook - Sets document title dynamically
 * @param {string} title - Page title
 */
export function usePageTitle(title) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) {
      document.title = `${title} | BuildingUK`
    }

    return () => {
      document.title = prevTitle
    }
  }, [title])
}
