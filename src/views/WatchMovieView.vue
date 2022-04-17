<template>
    <div id="movie_slider" class=" -mr-5 sm:mr-5">
        <div class="h-auto w-full bg-local bg-cover text-white" :style="'background-image: url(https://www.themoviedb.org/t/p/original'+background+')'">
            <div class=" w-full h-full p-12 bg-gradient-to-b from-transparent to-zinc-900" >
                <div class="h-full flex flex-col-reverse md:flex-row ">
                    <div class="flex-1 text-center sm:text-left mt-2">
                        <span class="text-2xl sm:text-4xl">{{title}}</span> <span class="text-sm">(MOVIE)</span>
                        <div class="block mt-2">
                            {{desc}}
                        </div>
                        <div class="w-full flex justify-center sm:justify-start text-cyan-500">
                            <div class="font-medium flex text-sm mt-2 sm:mt-4 sm:text-base" v-for="tag in tags" :key="tag">
                                <div class="pr-1">{{tag.name}}</div>
                            </div>
                        </div>
                        <div class="font-medium mt-2 text-base sm:text-lg">
                            <span class="mr-3">
                                {{watchTime}}mins
                            </span>
                            <span class="mr-3">
                                {{year.split('-')[0]}}
                            </span>
                            <span class="text-yellow-500 text-sm">{{vote_average}} of {{vote_count}} </span>
                        </div>
                        <div class="mt-2 font-medium text-base text-white">
                            Budget
                            <span class="text-yellow-500 text-sm">${{budget}} </span>
                        </div>
                        <div class="w-full flex justify-center sm:justify-start mt-2">
                            <router-link :to="'/watch/movie/'+$route.params.id+'.0.0'" class="flex focus:outline-none text-white text-sm py-1 2xl:mt-2 pl-3 pr-5 logo rounded-md bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-105"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M7 6v12l10-6z"></path></svg> <div class="mt-0.5">Watch</div></router-link>
                        </div>
                        
                    </div>
                    <div class="hidden w-56 lg:block"></div>
                    <div class="w-full sm:w-auto flex justify-center lg:justify-start">
                        <img class="mr-0 lg:mr-10 h-40 lg:h-full" :src="'https://www.themoviedb.org/t/p/w220_and_h330_face/'+poster">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-10">
        <smallCarousel :data="recomended" title="Recomended Movies" />
    </div>
    <div class="h-28" v-if="store.state.displayBottomInfo"></div>
</template>

<script>
    import axios from 'axios'
    import { inject } from "vue";
    import smallCarousel from '@/components/carousel/smallCarousel.vue'
    export default {
        data(){
        return{
            recomended:[],
            poster: '',
            background: '',
            title: '',
            desc: '',
            tags: [],
            watchTime: '',
            year: '',
            vote_average: '',
            vote_count: '',
            budget: '',
        }
        },
        components: {
            smallCarousel,
        },
        setup(){
            const store = inject('store');
            return{
                store
            }
        },
        created() {
            this.store.methods.displayBackButtonChange(true);
            axios.get('https://api.themoviedb.org/3/movie/'+this.$route.params.id+'?api_key=fb0951eca3f429fba7a17ace3baedfc2&language=en-US').then((response => {
                this.poster= response.data.poster_path;
                this.background= response.data.backdrop_path;
                this.title= response.data.original_title;
                this.desc= response.data.overview;
                this.tags= response.data.genres;
                this.watchTime= response.data.runtime;
                this.year= response.data.release_date;
                this.vote_average= response.data.vote_average;
                this.vote_count= response.data.vote_count;
                this.budget= response.data.budget;
            }));
            axios.get('https://api.themoviedb.org/3/movie/'+this.$route.params.id+'/similar?api_key=fb0951eca3f429fba7a17ace3baedfc2&page=1').then((response => {
                this.recomended=response.data 
                setTimeout(() => {
                    this.store.methods.progressbarEventChange('finish')
                }, 500);    
            }));
        },
    }
</script>

<style>

</style>