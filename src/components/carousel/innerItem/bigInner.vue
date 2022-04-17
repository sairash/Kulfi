<template>
    <div class="" v-if="original_name == '' || original_name == undefined || original_name == null" >
        <div class="mx-2 cursor-pointer" @click="store.methods.jsonBottomInfoChange(original_title+' (movie)', poster, release_date, age, extraInfo, overview,  'movie/'+link, backgroundPost, tag)">
            <div class="w-full h-60 lg:h-80 2xl:h-96 openInfoBar">
                <div class="relative w-full h-full bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out" :style="'background-image: url(https://www.themoviedb.org/t/p/original'+backgroundPost+');'">
                    <div class="absolute inset-0 bg-black bg-opacity-50 transition duration-300 ease-in-out"></div>
                        <div class="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-end pb-7 text-left">
                        <div>
                        <h3 class="text-white text-3xl font-bold">
                            {{original_title}}
                        </h3>
                        <h3 class="text-white text-sm w-full max-w-xxs">
                            {{overview.substring(0,100)+".."}}
                        </h3>
                        <div class="text-white text-xs  mt-2  space-x-2 items-center">
                            <p>Movie - {{release_date.toString().split("-")[0]}} - <span class="text-yellow-500"> {{extraInfo}} </span> - <span class="border text-xs p-1"> {{age}} </span></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="" v-else>
        <div class="mx-2 cursor-pointer" @click="store.methods.jsonBottomInfoChange(original_name+' (tv)', poster, air_date, age, extraInfo, overview, 'tv/'+link+'.1.1', backgroundPost, tag)">
            <div class="w-full h-60 lg:h-80 2xl:h-96 openInfoBar">
                <div class="relative w-full h-full bg-cover bg-center group rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out" :style="'background-image: url(https://www.themoviedb.org/t/p/original'+backgroundPost+');'">
                    <div class="absolute inset-0 bg-black bg-opacity-50 transition duration-300 ease-in-out"></div>
                        <div class="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-end pb-7 text-left">
                        <div>
                        <h3 class="text-white text-3xl font-bold">
                            {{original_name}}
                        </h3>
                        <h3 class="text-white text-sm w-full max-w-xxs">
                            {{overview.substring(0,100)+".."}}
                        </h3>
                        <div class="text-white text-xs  mt-2  space-x-2 items-center">
                            <p>TV - {{air_date.toString().split("-")[0]}} - <span class="text-yellow-500"> {{extraInfo}} </span> - <span class="border text-xs p-1"> {{age}} </span></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { inject } from 'vue';
    export default {
        name: 'bigCarouselInnerMain',
        props: {
            poster: String,
            original_title: String,
            original_name: String,
            overview: String,
            type: String,
            tag: String,
            release_date: String,
            air_date: String,
            age: String,
            link: Number,
            extraInfo: Number,
            backgroundPost: String
        },
        created(){
            console.clear()
        },
        setup(){
            const store = inject('store');
            return{
                store,
            }
        },
    }
</script>
