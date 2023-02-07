<template>
    <RouterLink
        :to="`/post/${post.id}`"
        class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
    >
        <a>{{ post.title }}</a>
        <div>{{ post.created.toFormat("d MMM") }}</div>
    </RouterLink>
</template>

<script setup lang="ts">
import {TimeLinePost} from "../posts"

defineProps<{
    post: TimeLinePost
}>()
</script>

<style>
</style>