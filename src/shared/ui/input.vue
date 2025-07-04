<script setup lang="ts">
type Props = {
  id?: string
  type?: string
  placeholder?: string
  modelValue?: string
  error?: string
  label?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="space-y-2">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :class="[
        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        error ? 'border-red-500' : 'border-gray-300'
      ]"
      @input="handleInput"
    >
    <p v-if="error" class="text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>