import { defineComponent, ref } from 'vue'

import type {
  AppComponentData,
  AppComponentProps,
} from '@t/components/app'

export default defineComponent<AppComponentProps, AppComponentData>({
  name: 'App',

  setup() {
    const count = ref(0)
    const increment = () => count.value++
    
    return {
      count,
      increment,
    }
  },
})