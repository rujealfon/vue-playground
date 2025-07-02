<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import { useAuth } from '@/features/auth/composables/use-auth'
import { registerSchema } from '@/features/auth/schemas'
import { Button } from '@/shared/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'

const { register, isLoading } = useAuth()

const form = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: '',
    email: '',
    password: ''
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  await register(values)
})
</script>

<template>
  <form class="w-full max-w-sm space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel for="name">
          Name
        </FormLabel>
        <FormControl>
          <Input id="name" type="text" placeholder="Your Name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel for="email">
          Email
        </FormLabel>
        <FormControl>
          <Input id="email" type="email" placeholder="email@example.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel for="password">
          Password
        </FormLabel>
        <FormControl>
          <Input id="password" type="password" placeholder="••••••••" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit" :disabled="isLoading">
      <span v-if="isLoading">Creating account...</span>
      <span v-else>Create Account</span>
    </Button>
  </form>
</template>
