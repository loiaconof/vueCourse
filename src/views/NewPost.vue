<template>
  New Post
  <PostWriter :post="post"/>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon';
import PostWriter from '../components/PostWriter.vue';
import { TimeLinePost } from '../posts';
import {useUsers} from "../stores/users";

const usersStore = useUsers()

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
</script>