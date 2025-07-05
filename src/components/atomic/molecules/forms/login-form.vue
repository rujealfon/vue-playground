<script setup lang="ts">
import { FormField } from '@atoms/form'
import { Button, Input } from '@atoms/ui'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import type { LoginFormData } from '@/schemas'

import { loginSchema } from '@/schemas'

type Props = {
  loading?: boolean
}

type Emits = {
  submit: [data: LoginFormData]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const formSchema = toTypedSchema(loginSchema)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: formSchema
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
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
    >
      <Input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter your password"
        v-bind="passwordAttrs"
      />
    </FormField>

    <Button
      type="submit"
      class="w-full"
      :disabled="loading"
    >
      {{ loading ? 'Signing in...' : 'Sign in' }}
    </Button>
  </form>
</template>
