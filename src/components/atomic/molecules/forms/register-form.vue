<script setup lang="ts">
import { FormField } from '@atoms/form'
import { Button, Input } from '@atoms/ui'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import type { RegisterFormData } from '@/schemas'

import { registerSchema } from '@/schemas'

type Props = {
  loading?: boolean
}

type Emits = {
  submit: [data: RegisterFormData]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const formSchema = toTypedSchema(registerSchema)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: formSchema
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField
      id="name"
      label="Full Name"
      :error="errors.name"
      required
    >
      <Input
        id="name"
        v-model="name"
        type="text"
        placeholder="Enter your full name"
        v-bind="nameAttrs"
      />
    </FormField>

    <FormField
      id="email"
      label="Email"
      :error="errors.email"
      required
    >
      <Input
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter your email"
        v-bind="emailAttrs"
      />
    </FormField>

    <FormField
      id="password"
      label="Password"
      :error="errors.password"
      required
      hint="Must contain at least 8 characters with uppercase, lowercase, and numbers"
    >
      <Input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter your password"
        v-bind="passwordAttrs"
      />
    </FormField>

    <FormField
      id="confirmPassword"
      label="Confirm Password"
      :error="errors.confirmPassword"
      required
    >
      <Input
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        v-bind="confirmPasswordAttrs"
      />
    </FormField>

    <Button
      type="submit"
      class="w-full"
      :disabled="loading"
    >
      {{ loading ? 'Creating account...' : 'Create account' }}
    </Button>
  </form>
</template>
