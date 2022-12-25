<script setup lang="ts">
import Timeline from '../components/Timeline.vue';
</script>

<template>
  <div class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <Timeline/>
        </template>
        <template #fallback>
          <progress class="progress is-primary is-small"/>
        </template>
      </Suspense>
    </div>
  </div>
</template>
