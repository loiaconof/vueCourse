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
    <div class="columns">
        <div class="column">
            <div contenteditable ref="contentEditable" @input="handleInput"/>
        </div>

        <div class="column">
            {{ content }}
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
const content = ref(props.post.markdown)
const contentEditable = ref<HTMLDivElement>()

onMounted(() => {
    if(!contentEditable.value) {
        throw Error('ContentEditable DOM node was not found')
    }
    contentEditable.value.innerText = content.value
})

function handleInput() {
    if(!contentEditable.value) {
        throw Error('ContentEditable DOM node was not found')
    }
    content.value = contentEditable.value.innerText
}
</script>