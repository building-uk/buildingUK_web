import { useState, useCallback } from 'react'

/**
 * Validation rules
 */
const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required'
    }
    return null
  },
  
  email: (value) => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
    return null
  },
  
  minLength: (min) => (value) => {
    if (!value) return null
    if (value.length < min) {
      return `Must be at least ${min} characters`
    }
    return null
  },
  
  maxLength: (max) => (value) => {
    if (!value) return null
    if (value.length > max) {
      return `Must be no more than ${max} characters`
    }
    return null
  },
  
  phone: (value) => {
    if (!value) return null
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number'
    }
    return null
  }
}

/**
 * useFormValidation hook
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationRules - Validation rules for each field
 * @param {Function} onSubmit - Submit handler function
 */
export function useFormValidation(initialValues, validationRules, onSubmit) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name]
    if (!rules) return null
    
    for (const rule of rules) {
      const error = rule(value)
      if (error) return error
    }
    return null
  }, [validationRules])

  // Validate all fields
  const validateAll = useCallback(() => {
    const newErrors = {}
    let isValid = true
    
    for (const name of Object.keys(validationRules)) {
      const error = validateField(name, values[name])
      if (error) {
        newErrors[name] = error
        isValid = false
      }
    }
    
    setErrors(newErrors)
    return isValid
  }, [values, validationRules, validateField])

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
    
    // Clear submit states
    setSubmitError(null)
    setSubmitSuccess(false)
  }, [touched, validateField])

  // Handle blur - mark field as touched and validate
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [validateField])

  // Handle form submit
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)
    
    // Validate all
    if (!validateAll()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)
    
    try {
      await onSubmit(values)
      setSubmitSuccess(true)
      // Reset form on success
      setValues(initialValues)
      setTouched({})
      setErrors({})
      
      // Auto-clear success after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      setSubmitError(error.message || 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validationRules, validateAll, onSubmit, initialValues])

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
    setSubmitError(null)
    setSubmitSuccess(false)
  }, [initialValues])

  // Get field props helper
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] ? errors[name] : null
  }), [values, errors, touched, handleChange, handleBlur])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    submitSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
    reset,
    setValues
  }
}

// Export validators for use in components
export { validators }
