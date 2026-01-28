/**
 * Form Validation Hook
 *
 * Provides reusable form validation with error messages
 */

import { useState, useCallback } from 'react'

export interface ValidationRule {
  required?: boolean | string
  minLength?: number | { value: number; message: string }
  maxLength?: number | { value: number; message: string }
  min?: number | { value: number; message: string }
  max?: number | { value: number; message: string }
  pattern?: RegExp | { value: RegExp; message: string }
  custom?: (value: any) => boolean | string
  email?: boolean | string
  phone?: boolean | string
  url?: boolean | string
}

export interface FieldValidation {
  [key: string]: ValidationRule
}

export interface FormErrors {
  [key: string]: string
}

export function useFormValidation<T extends Record<string, any>>(
  validationRules: FieldValidation
) {
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  /**
   * Validate a single field
   */
  const validateField = useCallback(
    (fieldName: string, value: any): string | null => {
      const rules = validationRules[fieldName]
      if (!rules) return null

      // Required validation
      if (rules.required) {
        if (value === undefined || value === null || value === '') {
          return typeof rules.required === 'string'
            ? rules.required
            : `${fieldName} is required`
        }
      }

      // Skip other validations if value is empty and not required
      if (!value && !rules.required) return null

      // MinLength validation
      if (rules.minLength) {
        const minLength =
          typeof rules.minLength === 'number'
            ? rules.minLength
            : rules.minLength.value
        const message =
          typeof rules.minLength === 'object'
            ? rules.minLength.message
            : `Must be at least ${minLength} characters`

        if (String(value).length < minLength) {
          return message
        }
      }

      // MaxLength validation
      if (rules.maxLength) {
        const maxLength =
          typeof rules.maxLength === 'number'
            ? rules.maxLength
            : rules.maxLength.value
        const message =
          typeof rules.maxLength === 'object'
            ? rules.maxLength.message
            : `Must be at most ${maxLength} characters`

        if (String(value).length > maxLength) {
          return message
        }
      }

      // Min value validation
      if (rules.min !== undefined) {
        const min = typeof rules.min === 'number' ? rules.min : rules.min.value
        const message =
          typeof rules.min === 'object'
            ? rules.min.message
            : `Must be at least ${min}`

        if (Number(value) < min) {
          return message
        }
      }

      // Max value validation
      if (rules.max !== undefined) {
        const max = typeof rules.max === 'number' ? rules.max : rules.max.value
        const message =
          typeof rules.max === 'object'
            ? rules.max.message
            : `Must be at most ${max}`

        if (Number(value) > max) {
          return message
        }
      }

      // Email validation
      if (rules.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(String(value))) {
          return typeof rules.email === 'string'
            ? rules.email
            : 'Invalid email address'
        }
      }

      // Phone validation (basic format)
      if (rules.phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/
        if (!phoneRegex.test(String(value)) || String(value).replace(/\D/g, '').length < 10) {
          return typeof rules.phone === 'string'
            ? rules.phone
            : 'Invalid phone number'
        }
      }

      // URL validation
      if (rules.url) {
        try {
          new URL(String(value))
        } catch {
          return typeof rules.url === 'string'
            ? rules.url
            : 'Invalid URL'
        }
      }

      // Pattern validation
      if (rules.pattern) {
        const pattern =
          rules.pattern instanceof RegExp ? rules.pattern : rules.pattern.value
        const message =
          rules.pattern instanceof RegExp
            ? 'Invalid format'
            : rules.pattern.message

        if (!pattern.test(String(value))) {
          return message
        }
      }

      // Custom validation
      if (rules.custom) {
        const result = rules.custom(value)
        if (result !== true) {
          return typeof result === 'string' ? result : 'Invalid value'
        }
      }

      return null
    },
    [validationRules]
  )

  /**
   * Validate all fields
   */
  const validate = useCallback(
    (values: T): boolean => {
      const newErrors: FormErrors = {}

      Object.keys(validationRules).forEach((fieldName) => {
        const error = validateField(fieldName, values[fieldName])
        if (error) {
          newErrors[fieldName] = error
        }
      })

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    },
    [validationRules, validateField]
  )

  /**
   * Handle field blur (mark as touched and validate)
   */
  const handleBlur = useCallback(
    (fieldName: string, value: any) => {
      setTouched((prev) => ({ ...prev, [fieldName]: true }))

      const error = validateField(fieldName, value)
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error || '',
      }))
    },
    [validateField]
  )

  /**
   * Handle field change (validate if touched)
   */
  const handleChange = useCallback(
    (fieldName: string, value: any) => {
      if (touched[fieldName]) {
        const error = validateField(fieldName, value)
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error || '',
        }))
      }
    },
    [touched, validateField]
  )

  /**
   * Clear errors
   */
  const clearErrors = useCallback(() => {
    setErrors({})
    setTouched({})
  }, [])

  /**
   * Clear specific field error
   */
  const clearFieldError = useCallback((fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }, [])

  /**
   * Get error for a field
   */
  const getFieldError = useCallback(
    (fieldName: string): string | undefined => {
      return touched[fieldName] ? errors[fieldName] : undefined
    },
    [errors, touched]
  )

  /**
   * Check if field has error
   */
  const hasError = useCallback(
    (fieldName: string): boolean => {
      return touched[fieldName] && !!errors[fieldName]
    },
    [errors, touched]
  )

  return {
    errors,
    touched,
    validate,
    validateField,
    handleBlur,
    handleChange,
    clearErrors,
    clearFieldError,
    getFieldError,
    hasError,
  }
}

/**
 * Common validation rules
 */
export const commonValidations = {
  required: (message?: string): ValidationRule => ({
    required: message || 'This field is required',
  }),

  email: (message?: string): ValidationRule => ({
    email: message || 'Invalid email address',
  }),

  phone: (message?: string): ValidationRule => ({
    phone: message || 'Invalid phone number',
  }),

  minLength: (length: number, message?: string): ValidationRule => ({
    minLength: {
      value: length,
      message: message || `Must be at least ${length} characters`,
    },
  }),

  maxLength: (length: number, message?: string): ValidationRule => ({
    maxLength: {
      value: length,
      message: message || `Must be at most ${length} characters`,
    },
  }),

  min: (value: number, message?: string): ValidationRule => ({
    min: {
      value,
      message: message || `Must be at least ${value}`,
    },
  }),

  max: (value: number, message?: string): ValidationRule => ({
    max: {
      value,
      message: message || `Must be at most ${value}`,
    },
  }),

  pattern: (regex: RegExp, message: string): ValidationRule => ({
    pattern: { value: regex, message },
  }),

  url: (message?: string): ValidationRule => ({
    url: message || 'Invalid URL',
  }),

  custom: (fn: (value: any) => boolean | string): ValidationRule => ({
    custom: fn,
  }),
}

/**
 * Combine multiple validation rules
 */
export function combineRules(...rules: ValidationRule[]): ValidationRule {
  return rules.reduce((combined, rule) => ({ ...combined, ...rule }), {})
}
