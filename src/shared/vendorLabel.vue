<template>
    <div class="flex items-center justify-start mr-2">
        <div class="bg-gray-100 rounded w-8 h-8 justify-center mr-2 items-center flex">
            <BuildingStorefrontIcon class="w-4 h-4 text-gray-400 mr-1" />
        </div>
        <span>{{ name }}</span>
    </div>
</template>

<script setup>
import { BuildingStorefrontIcon } from '@heroicons/vue/24/outline';
const props = defineProps({
  name: {
    type: String,
    required: true
  }
});
</script>