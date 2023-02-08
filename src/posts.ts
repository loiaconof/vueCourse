import {DateTime} from "luxon"

export interface Post {
    id: string
    title: string
    authorId: string
    created: string
    markdown: string
    html: string
}

export interface TimeLinePost extends Omit<Post, 'created'>{
    created: DateTime
}

export const today: Post = {
    id: "1",
    title: "Today",
    authorId: "-1",
    created: DateTime.now().toISO(),
    markdown: "",
    html: ""
}
export const thisWeek: Post = {
    id: "2",
    title: "This Week",
    authorId: "-1",
    created: DateTime.now().minus({days: 5}).toISO(),
    markdown: "",
    html: ""
}
export const thisMonth: Post = {
    id: "3",
    title: "This Month",
    authorId: "-1",
    created: DateTime.now().minus({weeks: 3}).toISO(),
    markdown: "",
    html: ""
}