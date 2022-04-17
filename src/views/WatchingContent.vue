<template>
  <div class="h-full pb-0 sm:pb-3 w-full flex justify-center mr-5">
      <div v-if="$route.params.type == 'movie'" class="iframe_container">
        <iframe :src="'https://www.2embed.ru/embed/tmdb/movie?id='+$route.params.id" class="h-full w-full mr-0" frameborder="0"></iframe>
      </div>
      <div v-if="$route.params.type == 'tv'" class="iframe_container">
        <iframe :src="'https://www.2embed.ru/embed/tmdb/tv?id='+$route.params.id+'&s='+$route.params.s+'&e='+$route.params.e" class="h-full w-full mr-0 sm:-ml-8" frameborder="0"></iframe>
      </div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  created(){
    this.store.methods.displayBackButtonChange(true);
    setTimeout(() => {
      this.store.methods.progressbarEventChange('finish')
    }, 500);
  },
  setup(){
        const store = inject('store');
        return{
            store
        }
    },
}
</script>

<style>
  .iframe_container{
    width: 98%;
  }
  @media only screen and (max-width: 600px) {
    .iframe_container{
      width: 100%;
    }
  }
</style>