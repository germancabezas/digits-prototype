<template>
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div class="flex justify-end">
            <button
                @click="toggleTheme"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700 hover:bg-gray-100 dark:hover:border-gray-600 text-sm px-4 py-2 transition-colors"
            >
                {{ isDark ? '🌙 Dark' : '☀️ Light' }}
            </button>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function setTheme(dark) {
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
}

function toggleTheme() {
    setTheme(!isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
        setTheme(savedTheme === 'dark')
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(prefersDark)
    }
})
</script>

<style scoped>
/* Any additional custom styles can go here */
</style>