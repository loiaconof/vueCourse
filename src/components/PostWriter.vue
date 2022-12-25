<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input type="text" class="input" v-model="title">
                {{ title }}
            </div>

            <div contenteditable ref="contentEditable">
                This is the post.
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { TimeLinePost } from '../posts';

const props = defineProps<{
    post: TimeLinePost
}>()

const title = ref(props.post.title)
const contentEditable = ref<HTMLDivElement>()

onMounted(() => {
    console.log(contentEditable.value?.innerText)
})
</script>