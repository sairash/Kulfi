<template>
  <mainAppVue />
</template>

<script>
import { provide } from "vue";
import mainAppVue from '@/mainApp.vue';
import store from "@/store";
export default {
  components:{
    mainAppVue
  },
  setup(){
    provide('store', store)
  }
}
</script>