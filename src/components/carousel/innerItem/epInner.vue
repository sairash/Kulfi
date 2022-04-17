<template>
    <div class="z-20 hover:text-blue-500">
        <div  @click="clickLink('/tv/'+season_id+'.'+$route.params.s+'.'+episode_number)" class="cursor-pointer py-2 px-0.5">
            <div class="" v-if="still_path != null">
                <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face/'+still_path" class="w-28 sm:w-40 transform hover:scale-105 duration-500">
            </div>
            <div class="" v-else>
                <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face/'+poster" class="w-28 sm:w-40 transform hover:scale-105 duration-500">
            </div>
            {{episode_number}} : {{original_name}}
        </div>
    </div>

</template>

<script>
    import { inject } from 'vue';
    export default {
        name: 'epInner',
        props: {
            poster: String,
            original_name: String,
            still_path: String,
            episode_number: Number,
            season_id: Number,
            season_no: String
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
        methods:{
            clickLink(data){
                history.pushState(
                    {},
                    null,
                    data
                )
                location.reload();
            }
        }
    }
</script>
