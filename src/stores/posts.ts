import {defineStore} from "pinia"
import {DateTime} from "luxon"
import {TimeLinePost, Post, today, thisWeek, thisMonth} from "../posts"
import {Period} from "../constants"

interface PostsState {
    ids: string[] // ["1", "2", ...]
    all: Map<string, Post>
    selectedPeriod: Period
}

export const usePosts = defineStore("posts", {
    // reactive
    state: (): PostsState => ({
        ids: [today.id, thisWeek.id, thisMonth.id],
        all: new Map([
            [today.id, today],
            [thisWeek.id, thisWeek],
            [thisMonth.id, thisMonth],
        ]),
        selectedPeriod: "Today"
    }),

    // methods
    actions: {
        setSelectedPeriod(period: Period) {
            this.selectedPeriod = period
        }
    },

    // similar to computed properties
    getters: {
        filteredPosts: (state): TimeLinePost[] => {
            return state.ids
                .map(id => {
                    const post = state.all.get(id)
                    if(!post) {
                        throw Error(`Post with id of ${id} was expected but not found`)
                    }
                    return {
                        ...post,
                        created: DateTime.fromISO(post.created)
                    }
                }).filter(post => {
                    switch(state.selectedPeriod) {
                        case "Today":
                            return post.created >= DateTime.now().minus({day: 1}) 
                        case "This Week":
                            return post.created >= DateTime.now().minus({week: 1}) 
                        case "This Month":
                        default:
                            return post
                    }
                })
        }
    }
})