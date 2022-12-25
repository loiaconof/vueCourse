<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input type="text" class="input">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { TimeLinePost } from '../posts';

const props = defineProps<{
    post: TimeLinePost
}>()
</script>