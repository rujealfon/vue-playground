import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { clampCounterValue, formatCounterDisplay, getCounterStatus, validateCounterValue } from '../lib'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const formattedCount = computed(() => formatCounterDisplay(count.value))
  const status = computed(() => getCounterStatus(count.value))
  const isValid = computed(() => validateCounterValue(count.value))

  function increment() {
    count.value = clampCounterValue(count.value + 1)
  }

  function decrement() {
    count.value = clampCounterValue(count.value - 1)
  }

  function reset() {
    count.value = 0
  }

  function setCount(value: number) {
    count.value = clampCounterValue(value)
  }

  function incrementBy(step: number) {
    count.value = clampCounterValue(count.value + step)
  }

  function decrementBy(step: number) {
    count.value = clampCounterValue(count.value - step)
  }

  return {
    count,
    doubleCount,
    formattedCount,
    status,
    isValid,
    increment,
    decrement,
    reset,
    setCount,
    incrementBy,
    decrementBy
  }
})
