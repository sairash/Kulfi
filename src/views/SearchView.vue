<template>
  <!-- <div class="">Here - {{$route.params.query}}</div> -->
    <div class="h-14 sm:h-12 mr-0 sm:mr-5 mt-3 sm:mt-2 flex justify-center">
        <div class="w-full max-w-screen-xl h-full bg-zinc-800 flex rounded-lg">
            <div class="flex-1 px-2">
                <input v-on:keyup.enter="SearchForData" v-model="query" type="text" class="w-full h-full bg-transparent outline-none" placeholder="Search!" autofocus>
            </div>
            <div class="w-10 cursor-pointer hover:bg-zinc-700 rounded-r-lg flex justify-center flex-col" @click="SearchForData">
                <div class="w-full flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: currentColor;transform: ;msFilter:;"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>
                </div>
            </div>
        </div>
    </div>
    <div class="text-md mt-2" v-if="!noData">Results: {{totalResults}}</div>
    <div class="w-full">
        <div class="text-xl flex justify-center mt-5" v-if="noData"> <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 mr-1" width="24" height="24" style="fill: currentColor;transform: ;msFilter:;"><path d="M21 15c0-4.625-3.507-8.441-8-8.941V4h-2v2.059c-4.493.5-8 4.316-8 8.941v2h18v-2zM2 18h20v2H2z"></path></svg> {{noDataInfo}} </div>
        <itemsContainer :data="queryData" v-if="!noData" />
        <div class="w-full flex justify-center my-4" v-if="currentPage < totalPage && !noData">
            <button @click="loadMore()" type="button" class="flex focus:outline-none text-white text-sm py-1 2xl:mt-2 pl-3 pr-5 logo rounded-md bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-105"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: currentColor;transform: ;msFilter:;"><path d="m18.707 12.707-1.414-1.414L13 15.586V6h-2v9.586l-4.293-4.293-1.414 1.414L12 19.414z"></path></svg> <div class="mt-0.5">Load More</div></button>
        </div>
        <div class="w-full text-md text-center my-4" v-if="currentPage >= totalPage && !noData">
            You have reached the end. (´∩｀。)
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
                query: this.$route.params.query,
                currentPage: 0,
                totalPage: 1,
                noData: true,
                noDataInfo: 'Search something..'
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
            getMovieTvData(myQuery){
                var pageNo = this.currentPage + 1
                axios.get('https://api.themoviedb.org/3/search/multi?api_key=fb0951eca3f429fba7a17ace3baedfc2&query='+myQuery+'&page='+pageNo+'&include_adult=false').then((response => {
                    this.totalResults = response.data.total_results
                    this.totalPage = response.data.total_pages
                    if(response.data.results.length ==0){
                        this.noDataInfo = 'Sorry we found nothing..';
                        this.noData = true;
                        this.queryData = []
                        this.currentPage = 0
                    }else{
                        this.noData = false;
                        response.data.results.forEach(element => {
                            this.queryData.push(element)
                        });
                        this.currentPage += 1
                    }
                }));
                setTimeout(() => {
                    this.store.methods.progressbarEventChange('finish')
                }, 500);
            },
            loadMore(){
                if(this.query == ' ' || this.query == ''){
                    this.query = ''
                    this.noData = true
                }else{
                    this.store.methods.progressbarEventChange('start')
                    this.getMovieTvData(this.query)
                }
            },
            SearchForData(){
                this.queryData = []
                this.currentPage = 0
                this.store.methods.progressbarEventChange('start')
                if(this.query == '' || this.query == ' '){
                    this.query = ''
                    this.noDataInfo = 'No query no results (#｀ε´)';
                    this.noData = true;
                    setTimeout(() => {
                        this.store.methods.progressbarEventChange('finish')
                    }, 500);
                }else{
                    this.getMovieTvData(this.query)
                    history.pushState(
                        {},
                        null,
                        '/search.'+this.query
                    )
                }
            }
        }
    }
</script>

<style>

</style>