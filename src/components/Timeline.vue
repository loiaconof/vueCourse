<template>
    {{ postsStore.foo }}
    <button @click="postsStore.updateFoo('bar')">
        Update
    </button>
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a 
                v-for="period of periods"
                :key="period"
                :class="{'is-active': period === selectedPeriod}"
                @click="selectPeriod(period)"
            >
                {{ period }}
            </a>
        </span>
        <TimelineItem
            v-for="post of posts" 
            :key="post.id"
            :post="post"        
        />
    </nav>
</template>

<script setup lang="ts">
import {ref, computed} from "vue"
import {DateTime} from "luxon"
import {TimeLinePost, today, thisWeek, thisMonth} from "../posts"
import TimelineItem from "./TimelineItem.vue";
import {usePosts} from "../stores/posts"

const postsStore = usePosts()

const periods = ["Today", "This Week", "This Month"] as const
type Period = typeof periods[number]

const selectedPeriod = ref<Period>('Today')

function selectPeriod(period: Period) {
    selectedPeriod.value = period
}

const posts = computed<TimeLinePost[]>(() => {
    //todo try with reduce
    return [today, thisWeek, thisMonth]
        .map(post => {
            return {
                ...post,
                created: DateTime.fromISO(post.created)
            }
        }).filter(post => {
            switch(selectedPeriod.value) {
                case "Today":
                    return post.created >= DateTime.now().minus({day: 1}) 
                case "This Week":
                    return post.created >= DateTime.now().minus({week: 1}) 
                case "This Month":
                default:
                    return post
            }
        })
})
</script>
  
<style scoped>
</style>
