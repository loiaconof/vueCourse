<template>
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
        <a 
            v-for="post of posts" 
            :key="post.id" 
            class="panel-block"
        >
            <a>{{ post.title }}</a>
            <div>{{ post.created.toFormat("d MMM") }}</div>
        </a>
    </nav>
</template>

<script setup lang="ts">
import {ref, computed} from "vue"
import {DateTime} from "luxon"
import {Post, today, thisWeek, thisMonth} from "../posts"

const periods = ["Today", "This Week", "This Month"] as const
type Period = typeof periods[number]

const selectedPeriod = ref<Period>('Today')

function selectPeriod(period: Period) {
    selectedPeriod.value = period
}

const posts = computed(() => {
    //todo try with reduce
    return [today, thisWeek, thisMonth]
        .map(post => {
            return {
                ...posts,
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
