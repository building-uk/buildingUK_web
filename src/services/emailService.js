/**
 * Email Service using Web3Forms API
 * Sends contact form submissions to the configured email address
 */

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export const emailService = {
  /**
   * Send contact form data via Web3Forms
   */
  sendContactForm: async (formData) => {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Contact Form Submission from ${formData.name}`,
      from_name: 'BuildingUK Website',
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (data.success) {
      return { success: true, message: 'Message sent successfully!' }
    } else {
      throw new Error(data.message || 'Failed to send message. Please try again.')
    }
  },

  /**
   * Subscribe to newsletter via Web3Forms
   */
  subscribeToNewsletter: async (email) => {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: 'New Newsletter Subscription - BuildingUK',
      from_name: 'BuildingUK Website',
      email: email,
      message: `New newsletter subscription request from: ${email}`,
    }

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (data.success) {
      return { success: true, message: 'Successfully subscribed!' }
    } else {
      throw new Error(data.message || 'Failed to subscribe. Please try again.')
    }
  },
}
