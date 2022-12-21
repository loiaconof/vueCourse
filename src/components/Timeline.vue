<template>
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a v-for="period in periods">
                {{ period }}
            </a>
        </span>
    </nav>
</template>

<script setup lang="ts">
const periods = [
    "Today",
    "This Week",
    "This Month",
]
</script>

<style scoped>
</style>
