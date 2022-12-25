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
            <div v-html="html"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, watchEffect } from 'vue';
import { TimeLinePost } from '../posts';
import { marked } from 'marked'
import highlightjs  from "highlight.js"

const props = defineProps<{
    post: TimeLinePost
}>()

const html = ref('')
const title = ref(props.post.title)
const content = ref(props.post.markdown)
const contentEditable = ref<HTMLDivElement>()

/* alternative to watch
watchEffect(() => {
    marked.parse(content.value, (err, parseResult) => {
        html.value = parseResult
    })
})*/

watch(content, (newContent) => {
    marked.parse(newContent, {
        gfm: true,
        breaks: true,
        highlight: (code) => {
            return highlightjs.highlightAuto(code).value
        }
    }, (err, parseResult) => {
        html.value = parseResult
    })
}, {
    immediate: true
})

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