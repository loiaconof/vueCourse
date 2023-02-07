<template>
  <UserForm @submit="handleSignin" :error="error"/>
</template>

<script lang="ts" setup>
import UserForm from "./UserForm.vue";
import {ref} from "vue";
import {NewUser} from "../users";
import {useUsers} from "../stores/users";
import {useModal} from "../composables/modal";

const modal = useModal()
const usersStore = useUsers()
const error = ref('')

async function handleSignin(newUser: NewUser) {
  const body = JSON.stringify(newUser)
  const res = await window.fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })

  if(![401, 404].includes(res.status)) {
    await usersStore.authenticate()
    modal.hideModal()
  } else {
    error.value = "Username or password was incorrect."
  }
}
</script>