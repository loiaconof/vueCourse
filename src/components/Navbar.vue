<template>
    <div class="navbar">
        <div class="navbar-end">
            <div
                v-if="userStore.currentUserId !== undefined"
                class="buttons"
            >
              <RouterLink to="/post/new" class="button">New Post</RouterLink>
              <button class="button" @click="userStore.logout()">Log Out</button>
            </div>
            <div
                v-else
                class="buttons"
            >
                <button class="button" @click="modal.showModal('signUp')">Sign Up</button>
                <button class="button" @click="modal.showModal('signIn')">Sign In</button>
            </div>
        </div>
    </div>

    <Teleport to="#modal">
        <component :is="modal.component.value"/>
    </Teleport>
</template>

<script lang="ts" setup>
import {useModal} from '../composables/modal'
import SignUpForm from './SignupForm.vue';
import {useUsers} from "../stores/users";

const modal = useModal()
const userStore = useUsers()
</script>