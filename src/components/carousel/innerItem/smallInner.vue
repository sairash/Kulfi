<template>
    <div class="z-20" v-if="original_name == '' || original_name == undefined || original_name == null">
        <div  @click="store.methods.jsonBottomInfoChange(original_title+' (movie)', poster, release_date, age, extraInfo, overview,  'movie/'+link, backgroundPost, tag)" class="cursor-pointer py-2 px-0.5">
            <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face/'+poster" class="w-28 sm:w-40 transform hover:scale-105 duration-500">
        </div>
    </div>
    <div class="z-20" v-else>
        <div  @click="store.methods.jsonBottomInfoChange(original_name+' (tv)', poster, air_date, age, extraInfo, overview, 'tv/'+link+'.1.1', backgroundPost, tag)" class="cursor-pointer py-2 px-0.5">
            <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face/'+poster" class="w-28 sm:w-40 transform hover:scale-105 duration-500">
        </div>
    </div>

</template>

<script>
    import { inject } from 'vue';
    export default {
        name: 'smallInner',
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
        setup(){
            const store = inject('store');
            return{
                store,
            }
        },
        created(){
            console.clear()
        },
    }
</script>
