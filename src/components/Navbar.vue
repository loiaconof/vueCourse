<template>
    <div class="navbar">
        <div class="navbar-end">
            <div
                v-if="userStore.currentUserId !== undefined"
                class="buttons"
            >
              <RouterLink to="/post/new" class="button">New Post</RouterLink>
              <button class="button" @click="modal.showModal">Log Out</button>
            </div>
            <div
                v-else
                class="buttons"
            >
                <button class="button" @click="modal.showModal">Sign Up</button>
                <RouterLink to="/post/new" class="button">Sign In</RouterLink>
            </div>
        </div>
    </div>

    <Teleport to="#modal">
        <SignUpForm/>
    </Teleport>
</template>

<script lang="ts" setup>
import {useModal} from '../composables/modal'
import SignUpForm from './SignUpForm.vue';
import {useUsers} from "../stores/users";

const modal = useModal()
const userStore = useUsers()
</script>