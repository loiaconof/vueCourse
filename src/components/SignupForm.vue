<template>
  <UserForm @submit="handleSignup"/>
</template>

<script lang="ts" setup>
import UserForm from "./UserForm.vue";
import {NewUser} from "../users";
import {useUsers} from "../stores/users";
import {useModal} from "../composables/modal";

const modal = useModal()
const usersStore = useUsers()

async function handleSignup(newUser: NewUser) {
  await usersStore.createUser(newUser)
  modal.hideModal()
}
</script>