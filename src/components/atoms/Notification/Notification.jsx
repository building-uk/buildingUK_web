import { useEffect } from 'react'
import { useUI } from '../../../context/UIContext'
import Icon from '../Icon'
import './Notification.css'

/**
 * Notification atom - Displays global toast messages
 */
function Notification() {
  const { notification, hideNotification } = useUI()
  
  if (!notification) return null
  
  const { message, type } = notification
  
  return (
    <div className={`notification notification--${type}`}>
      <div className="notification__icon">
        {type === 'success' && <Icon name="check" size={20} />}
        {type === 'error' && <Icon name="alert" size={20} />}
        {type === 'info' && <Icon name="info" size={20} />}
      </div>
      <span className="notification__message">{message}</span>
      <button className="notification__close" onClick={hideNotification}>
        <Icon name="close" size={16} />
      </button>
    </div>
  )
}

export default Notification
