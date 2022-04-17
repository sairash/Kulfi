<template>
  <!-- <div class="">Here - {{$route.params.query}}</div> -->
  <div class="home mt-5 sm:mt-1">
    <div class="sub_header flex text-gray-500 text-sm ">
      <router-link to="/" class="mr-3 hover:text-gray-300 cursor-pointer">
        Featured
      </router-link>
      <router-link to="/tv" class="mx-3 hover:text-gray-300 cursor-pointer">
        TV Shows
      </router-link>
      <router-link to="/movie" class="mx-3 active_type cursor-pointer">
        Movies
      </router-link>
    </div>
    <div class="w-full text-xl text-center font-bold mt-4 sm:mt-0">Movies</div>
    <div class="text-md text-center">Results: <span class="text-cyan-600">{{totalResults}}</span></div>
    <div class="w-full">
        <itemsContainer :data="queryData" />
        <div class="w-full flex justify-center my-4" v-if="currentPage < totalPage && !noData">
            <button @click="loadMore()" type="button" class="flex focus:outline-none text-white text-sm py-1 2xl:mt-2 pl-3 pr-5 logo rounded-md bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-105"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: currentColor;transform: ;msFilter:;"><path d="m18.707 12.707-1.414-1.414L13 15.586V6h-2v9.586l-4.293-4.293-1.414 1.414L12 19.414z"></path></svg> <div class="mt-0.5">Load More</div></button>
        </div>
        <div class="w-full text-md text-center my-4" v-if="currentPage >= totalPage && !noData">
            You have reached the end. (´∩｀。)
        </div>
    </div>
  </div>
    <div class="h-28" v-if="store.state.displayBottomInfo"></div>
</template>

<script>
    import axios from 'axios';
    import { inject } from "vue";
    import itemsContainer from '@/components/itemsContainer.vue'

    export default {
        data(){
            return{
                totalResults: 0,
                queryData: [],
                currentPage: 0,
                totalPage: 1,
            }
        },
        components:{
            itemsContainer,
        },
        setup(){
            const store = inject('store');
            return{
                store
            }
        },
        created(){
            this.store.methods.displayBackButtonChange(true);
            this.loadMore()
            setTimeout(() => {
                this.store.methods.progressbarEventChange('finish')
            }, 500);
            
        },
        methods:{
            getMovieTvData(){
                var pageNo = this.currentPage + 1
                axios.get('https://api.themoviedb.org/3/movie/popular?api_key=fb0951eca3f429fba7a17ace3baedfc2&page='+pageNo+'&include_adult=false').then((response => {
                    this.totalResults = response.data.total_results
                    this.totalPage = response.data.total_pages
                    this.noData = false;
                    response.data.results.forEach(element => {
                        this.queryData.push(element)
                    });
                    this.currentPage += 1
                }));
                setTimeout(() => {
                    this.store.methods.progressbarEventChange('finish')
                }, 500);
            },
            loadMore(){
                this.store.methods.progressbarEventChange('start')
                this.getMovieTvData()
            },
            
        }
    }
</script>

<style>

</style>