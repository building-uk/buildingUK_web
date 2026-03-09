import { useEffect, useState } from 'react'
import { cmsService } from '../../../services/cmsService'
import './PageLoader.css'

/**
 * PageLoader - Full-page loading overlay with branded animation
 */
function PageLoader() {
  const [logo, setLogo] = useState(null)

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const settings = await cmsService.getSiteSettings()
        if (settings?.logo) {
          setLogo(settings.logo)
        } else {
          setLogo('/images/DSC_6758.JPG')
        }
      } catch (error) {
        console.error('Error fetching loader logo:', error)
        setLogo('/images/DSC_6758.JPG')
      }
    }
    fetchLogo()
  }, [])

  return (
    <div className="page-loader">
      <div className="page-loader__content">
        <div className="page-loader__logo">
          {logo && <img src={logo} alt="BuildingUK" />}
        </div>
        <div className="page-loader__spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <span className="page-loader__text">Loading...</span>
      </div>
    </div>
  )
}

export default PageLoader
