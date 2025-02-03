import { useState, useCallback } from 'react'

interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => boolean
}

interface ValidationErrors {
  [key: string]: string
}

export const useFormValidation = (initialValues: { [key: string]: string }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  const validateField = useCallback((name: string, value: string, rules?: ValidationRules) => {
    if (!rules) return ''

    if (rules.required && !value) {
      return 'This field is required'
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format'
    }

    if (rules.custom && !rules.custom(value)) {
      return 'Invalid value'
    }

    return ''
  }, [])

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
    rules?: ValidationRules
  ) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    const error = validateField(name, value, rules)
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [validateField])

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
  }, [])

  const validateForm = useCallback((validationRules: { [key: string]: ValidationRules }) => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(values).forEach(key => {
      const error = validateField(key, values[key], validationRules[key])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values, validateField])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setValues,
    setErrors,
  }
}

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  phone: {
    required: true,
    pattern: /^\+?[\d\s-]{10,}$/,
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
} 