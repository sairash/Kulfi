<template>
    <div id="movie_slider" class=" -mr-5 sm:mr-5">
        <div class="h-auto w-full bg-local bg-cover text-white" :style="'background-image: url(https://www.themoviedb.org/t/p/original'+background+')'">
            <div class=" w-full h-full p-12 bg-gradient-to-b from-transparent to-zinc-900" >
                <div class="h-full flex flex-col-reverse md:flex-row ">
                    <div class="flex-1 text-center sm:text-left mt-2">
                        <span class="text-2xl sm:text-4xl">{{title}}</span> <span class="text-sm">(TV)</span>
                        <div class="block mt-2 text-black">
                            <span class="rounded px-2 py-1 bg-cyan-500">Episode Name: {{epName}} Season: {{$route.params.s}} Episode: {{$route.params.e}}</span>
                        </div>
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
                                {{year.split('-')[0]}}
                            </span>
                            <span class="text-yellow-500 text-sm">{{vote_average}} of {{vote_count}} </span>
                        </div>
                        <div class="mt-2 font-medium text-base text-white">
                            Seasons: {{total_season}}, Episodes: {{total_episodes}}
                        </div>
                        <div class="w-full flex justify-center sm:justify-start mt-2">
                            <router-link :to="'/watch/tv/'+$route.params.id+'.'+$route.params.s+'.'+$route.params.e" class="flex focus:outline-none text-white text-sm py-1 2xl:mt-2 pl-3 pr-5 logo rounded-md bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-105"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M7 6v12l10-6z"></path></svg> <div class="mt-0.5">Watch</div></router-link>
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
        <select name="" id="seasonChangeSelect" @change="onSeasonChange($event)">
            <option :value="index" v-for="index in total_season" :key="index" :selected="index == $route.params.s">Season {{index}}</option>
        </select>
    </div>
    <div class="mt-5">
        <epCarousel :data="episode" :season_no="$route.params.s" :poster="season_poster" :season_id="$route.params.id"/>
    </div>
    <div class="mt-5">
        <smallCarousel :data="recomended" title="Recomended Movies" />
    </div>
    <div class="h-28" v-if="store.state.displayBottomInfo"></div>
</template>

<script>
    import axios from 'axios'
    import { inject } from "vue";
    import epCarousel from '@/components/carousel/epCarousel.vue'
    import smallCarousel from '@/components/carousel/smallCarousel.vue'
    export default {
        data(){
        return{
            first_date: '',
            original_language: '',
            season_poster: '',
            epName: '',
            recomended:[],
            episode: [],
            poster: '',
            background: '',
            title: '',
            desc: '',
            tags: [],
            watchTime: '',
            year: '',
            vote_average: '',
            vote_count: '',
            total_episodes: '',
            total_season: '',
        }
        },
        components: {
            smallCarousel,
            epCarousel
        },
        setup(){
            const store = inject('store');
            return{
                store
            }
        },
        created() {
            this.store.methods.displayBackButtonChange(true);
            axios.get('https://api.themoviedb.org/3/tv/'+this.$route.params.id+'?api_key=fb0951eca3f429fba7a17ace3baedfc2&language=en-US').then((response => {
                this.original_language = response.data.original_language;
                this.poster= response.data.poster_path;
                this.season_poster = response.data.poster_path;
                this.background= response.data.backdrop_path;
                this.title= response.data.original_name;
                this.total_season = response.data.number_of_seasons;
                this.tags= response.data.genres;
                this.total_episodes= response.data.number_of_episodes;
                this.vote_average= response.data.vote_average;
                this.first_date= response.data.first_air_date;
                this.vote_count= response.data.vote_count;
            }));

            axios.get('https://api.themoviedb.org/3/tv/'+this.$route.params.id+'/season/'+this.$route.params.s+'/episode/'+this.$route.params.e+'?api_key=fb0951eca3f429fba7a17ace3baedfc2&language=en-US').then((response => {
                this.epName= response.data.name;
                this.desc= response.data.overview;
                this.year= response.data.air_date;
                if(response.data.still_path != null){this.poster= response.data.still_path}
            }));

            axios.get('https://api.themoviedb.org/3/tv/'+this.$route.params.id+'/season/'+this.$route.params.s+'?api_key=fb0951eca3f429fba7a17ace3baedfc2&language=en-US').then((response => {
                this.episode = response.data.episodes
            }));

            axios.get('https://api.themoviedb.org/3/tv/'+this.$route.params.id+'/similar?api_key=fb0951eca3f429fba7a17ace3baedfc2&page=1').then((response => {
                this.recomended=response.data 
                setTimeout(() => {
                    this.store.methods.progressbarEventChange('finish')
                }, 500);    
            }));
        },
        methods:{
            onSeasonChange(data){
                history.pushState(
                {},
                null,
                '/tv/'+this.$route.params.id+'.'+data.target.value+'.1'
                )
                location.reload();
            }
        }
    }
</script>

<style>

</style>