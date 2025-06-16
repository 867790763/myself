<template>
  <div class="">

  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
export default defineComponent({
  setup(){
    const data  = reactive({
    })
    onMounted(()=>{})
    const toRef = toRefs(data)
    return{
      ...toRef 
    }
  },
})
</script>

<style scoped>
  . {

  }
</style>