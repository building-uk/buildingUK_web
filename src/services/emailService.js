/**
 * Mock Service to simulate backend interactions
 */

export const emailService = {
  /**
   * Send contact form data
   */
  sendContactForm: async (formData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate success (90% chance)
    if (Math.random() > 0.1) {
      console.log('✅ Email Service: Form sent successfully', formData)
      return { success: true, message: 'Message sent successfully!' }
    } else {
      console.error('❌ Email Service: Network error')
      throw new Error('Failed to send message. Please try again.')
    }
  },

  /**
   * Subscribe to newsletter
   */
  subscribeToNewsletter: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('✅ Email Service: Subscribed', email)
    return { success: true, message: 'Successfully subscribed!' }
  }
}
