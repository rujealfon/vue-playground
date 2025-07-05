// Counter feature business logic and utilities

export const COUNTER_LIMITS = {
  min: -1000,
  max: 1000
} as const

export const COUNTER_STEP = {
  small: 1,
  medium: 5,
  large: 10
} as const

export function validateCounterValue(value: number): boolean {
  return value >= COUNTER_LIMITS.min && value <= COUNTER_LIMITS.max
}

export function formatCounterDisplay(value: number): string {
  return new Intl.NumberFormat().format(value)
}

export function calculateCounterPercentage(value: number): number {
  const range = COUNTER_LIMITS.max - COUNTER_LIMITS.min
  const normalizedValue = value - COUNTER_LIMITS.min
  return Math.round((normalizedValue / range) * 100)
}

export function getCounterStatus(value: number): 'low' | 'medium' | 'high' {
  const percentage = calculateCounterPercentage(value)

  if (percentage < 33)
    return 'low'
  if (percentage < 66)
    return 'medium'
  return 'high'
}

export function clampCounterValue(value: number): number {
  return Math.max(COUNTER_LIMITS.min, Math.min(COUNTER_LIMITS.max, value))
}
