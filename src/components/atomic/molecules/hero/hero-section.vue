<script setup lang="ts">
import { Heading, Paragraph } from '@atoms/text'
import { Button } from '@atoms/ui'

type Props = {
  title: string
  subtitle?: string
  description?: string
  primaryAction?: {
    text: string
    to?: string
  }
  secondaryAction?: {
    text: string
    to?: string
  }
}

defineProps<Props>()
</script>

<template>
  <section
    class="
      flex min-h-[60vh] flex-col items-center justify-center space-y-6 px-4
      text-center
    "
  >
    <div class="max-w-3xl space-y-4">
      <Heading
        :level="1" class="
          text-5xl
          lg:text-6xl
        "
      >
        {{ title }}
      </Heading>

      <Heading
        v-if="subtitle" :level="2" class="
          text-xl font-normal text-muted-foreground
          lg:text-2xl
        "
      >
        {{ subtitle }}
      </Heading>

      <Paragraph
        v-if="description" class="
          mx-auto max-w-2xl text-lg text-muted-foreground
        "
      >
        {{ description }}
      </Paragraph>
    </div>

    <div
      v-if="primaryAction || secondaryAction" class="
        flex flex-col gap-4
        sm:flex-row
      "
    >
      <Button
        v-if="primaryAction"
        :as="primaryAction.to ? 'RouterLink' : 'button'"
        :to="primaryAction.to"
        size="lg"
        class="px-8"
      >
        {{ primaryAction.text }}
      </Button>

      <Button
        v-if="secondaryAction"
        :as="secondaryAction.to ? 'RouterLink' : 'button'"
        :to="secondaryAction.to"
        variant="outline"
        size="lg"
        class="px-8"
      >
        {{ secondaryAction.text }}
      </Button>
    </div>
  </section>
</template>
