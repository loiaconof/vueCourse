<template>
    New Post
    <PostWriter :post="post"/>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon';
import PostWriter from '../components/PostWriter.vue';
import { TimeLinePost } from '../posts';

const post: TimeLinePost = {
    id: "-1",
    title: "Title",
    created: DateTime.now()
}
</script>