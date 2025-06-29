<route lang="yaml">
meta:
  layout: dashboard
</route>

<script setup lang="ts">
// Dashboard Analytics page
// This would typically include charts, metrics, and data visualization
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">
        Analytics
      </h1>
      <p class="text-gray-600">
        Data insights and performance metrics
      </p>
    </div>

    <!-- Analytics Cards -->
    <div
      class="
        mb-8 grid grid-cols-1 gap-6
        md:grid-cols-2
        lg:grid-cols-4
      "
    >
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-lg bg-blue-100 p-2">
            <span class="text-2xl">📊</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">
              Total Views
            </p>
            <p class="text-2xl font-bold text-gray-900">
              12,543
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-lg bg-green-100 p-2">
            <span class="text-2xl">👥</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">
              Active Users
            </p>
            <p class="text-2xl font-bold text-gray-900">
              2,847
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-lg bg-yellow-100 p-2">
            <span class="text-2xl">⏱️</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">
              Avg. Session
            </p>
            <p class="text-2xl font-bold text-gray-900">
              4m 32s
            </p>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-sm">
        <div class="flex items-center">
          <div class="rounded-lg bg-purple-100 p-2">
            <span class="text-2xl">💰</span>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">
              Revenue
            </p>
            <p class="text-2xl font-bold text-gray-900">
              $23,456
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Placeholder -->
    <div
      class="
        grid grid-cols-1 gap-6
        lg:grid-cols-2
      "
    >
      <div class="rounded-lg bg-white p-6 shadow-sm">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          Traffic Overview
        </h3>
        <div
          class="flex h-64 items-center justify-center rounded-lg bg-gray-100"
        >
          <p class="text-gray-500">
            📈 Chart placeholder
          </p>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-sm">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          User Engagement
        </h3>
        <div
          class="flex h-64 items-center justify-center rounded-lg bg-gray-100"
        >
          <p class="text-gray-500">
            📊 Chart placeholder
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
