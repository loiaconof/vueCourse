<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input type="text" class="input" v-model="title">
                {{ title }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TimeLinePost } from '../posts';

const props = defineProps<{
    post: TimeLinePost
}>()
const title = ref(props.post.title)
</script>