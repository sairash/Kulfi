<template>
  <div class="home mt-5 sm:mt-1">
    <div class="sub_header flex text-gray-500 text-sm mb-2 ">
      <router-link to="/" class="mr-3 active_type cursor-pointer">
        Featured
      </router-link>
      <router-link to="/tv" class="mx-3 hover:text-gray-300 cursor-pointer">
        TV Shows
      </router-link>
      <router-link to="/movie" class="mx-3 hover:text-gray-300 cursor-pointer">
        Movies
      </router-link>
    </div>
    <bigCarousel :data="both" />
    <smallCarousel title="Popular Movie and Tv" :data="movie" />
    <smallCarousel title="Popular Tv" :data="tv" />
  </div>
  <div class="h-28" v-if="store.state.displayBottomInfo"></div>
</template>

<script>
  // @ is an alias to /src
  import axios from 'axios'
  import { inject } from "vue";
  import bigCarousel from '@/components/carousel/bigCarousel.vue'
  import smallCarousel from '@/components/carousel/smallCarousel.vue'

  export default {
    name: 'HomeView',
    components: {
      bigCarousel,
      smallCarousel,
    },
    data(){
      return{
        movie:[],
        tv:[],
        both:[],
        shuffledArray: []
      }
    },
    setup(){
        const store = inject('store');
        return{
            store
        }
    },
    created() {
      this.store.methods.displayBackButtonChange(false);
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=fb0951eca3f429fba7a17ace3baedfc2&page=1').then((response => { this.movie=response.data }));
      axios.get('https://api.themoviedb.org/3/tv/popular?api_key=fb0951eca3f429fba7a17ace3baedfc2&page=1').then((response => { this.tv=response.data }));
    },
    watch: {
      tv: function () {
        setTimeout(() => {
            this.store.methods.progressbarEventChange('finish')
        }, 500);
        this.both = this.movie.results;
        this.tv.results.forEach(element => {
          this.both.push(element)
        });
        function shuffle(array) {
          let currentIndex = array.length,  randomIndex;

          // While there remain elements to shuffle...
          while (currentIndex != 0) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
          }

          return array;
        }
        this.both = shuffle(this.both)
      }
    }
  }
</script>
