<template>
  New Post
  <PostWriter :post="post" @submit="handleSubmit"/>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon';
import PostWriter from '../components/PostWriter.vue';
import {Post, TimeLinePost} from '../posts';
import { useRouter } from 'vue-router';
import {useUsers} from "../stores/users";
import {usePosts} from "../stores/posts";

const postsStore = usePosts()
const usersStore = useUsers()
const router = useRouter()

if(!usersStore.currentUserId) {
  throw Error('User was not found')
}

const post: TimeLinePost = {
  id: "-1",
  title: "Title",
  authorId: usersStore.currentUserId,
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>Title</h2>"
}

async function handleSubmit(post: Post) {
  await postsStore.createPost(post)
  router.push('/')
}
</script>