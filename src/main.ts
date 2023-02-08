import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {router} from './router'
import './style.css'
import App from './App.vue'
import {useUsers} from "./stores/users";
import {usePosts} from "./stores/posts";

const app = createApp(App)
app.use(createPinia())

const userStore = useUsers()
const postsStore = usePosts()

Promise.all([
    userStore.authenticate(),
    postsStore.fetchPosts()
]).then(() => {
    app.use(router)
    app.mount('#app')
})
