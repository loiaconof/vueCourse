import {ref, shallowRef} from 'vue'
import SignupForm from "../components/SignupForm.vue";
import HelloWorld from "../components/HelloWorld.vue";

const show = ref(false)
const component = shallowRef<any>()

export function useModal() {
    return {
        show,
        component,
        showModal: (type: 'signUp' | 'signIn') => {
            show.value = true
            switch(type) {
                case 'signIn': return component.value = HelloWorld
                case "signUp": return component.value = SignupForm
            }
        },
        hideModal: () => (show.value = false),
    }
}