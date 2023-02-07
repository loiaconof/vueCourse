<template>
  <form  class="form" @submit.prevent="handleSubmit">
    <FormInput name="Username" v-model="username" :status="usernameStatus" type="text"/>
    <FormInput name="Password" v-model="password" :status="passwordStatus" type="password"/>
    <div v-if="error !== ''" class="is-danger help">
      {{error}}
    </div>
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {validate, length, required} from '../validation'
import FormInput from './FormInput.vue'
import {NewUser} from "../users";
import {useUsers} from "../stores/users";
import {useModal} from "../composables/modal";

const emit = defineEmits<{
  (event: 'submit', payload: NewUser): void
}>()

defineProps<{
  error?: string;
}>()

const username = ref('')
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({min: 5, max: 10})])
})

const password = ref('')
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({min: 5, max: 10})])
})

const isInvalid = computed(() => {
  return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

const usersStore = useUsers()
const modal = useModal()

async function handleSubmit() {
  if(isInvalid.value) {
    return
  }

  const newUser: NewUser = {
    username: username.value,
    password: password.value
  }

  try{
    emit('submit', newUser)
  } catch (e) {
    throw new Error(e.response.ERROR.message)
  }
}
</script>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>