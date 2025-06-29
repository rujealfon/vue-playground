import { ref } from 'vue'

export type Toast = {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  persistent?: boolean
}

export type ToastType = Toast['type']

// Global toast state
const toasts = ref<Toast[]>([])

// Auto-dismiss timers
const timers = new Map<string, ReturnType<typeof setTimeout>>()

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Clear timer for a toast
function clearTimer(id: string) {
  const timer = timers.get(id)
  if (timer) {
    clearTimeout(timer)
    timers.delete(id)
  }
}

// Remove toast
function removeToast(id: string) {
  clearTimer(id)
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Add toast with auto-dismiss
function addToast(toast: Omit<Toast, 'id'>) {
  const id = generateId()
  const newToast: Toast = {
    id,
    duration: 5000, // Default 5 seconds
    ...toast,
  }

  toasts.value.push(newToast)

  // Auto-dismiss unless persistent
  if (!newToast.persistent && newToast.duration && newToast.duration > 0) {
    const timer = setTimeout(() => {
      removeToast(id)
    }, newToast.duration)
    timers.set(id, timer)
  }

  return id
}

// Clear all toasts
function clearAllToasts() {
  timers.forEach(timer => clearTimeout(timer))
  timers.clear()
  toasts.value = []
}

export function useToast() {
  // Convenience methods for different toast types
  const success = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({
      type: 'success',
      title,
      message,
      ...options,
    })
  }

  const error = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({
      type: 'error',
      title,
      message,
      duration: 7000, // Errors stay longer
      ...options,
    })
  }

  const warning = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({
      type: 'warning',
      title,
      message,
      ...options,
    })
  }

  const info = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({
      type: 'info',
      title,
      message,
      ...options,
    })
  }

  const dismiss = (id: string) => {
    removeToast(id)
  }

  const clear = () => {
    clearAllToasts()
  }

  return {
    // State
    toasts: toasts.value,

    // Actions
    success,
    error,
    warning,
    info,
    dismiss,
    clear,

    // Raw add method for custom toasts
    add: addToast,
  }
}
