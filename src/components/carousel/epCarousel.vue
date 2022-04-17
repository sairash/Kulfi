<template>
    <div class="text-lg mt-5 text-white logo">Season {{season_no}}</div>
    <carousel :items-to-show="itemsToShow">
        <slide v-for="item in data" :key="item">
            <epCarouselItem :episode_number="item.episode_number" :original_name="item.name" :still_path="item.still_path" :poster="poster" :season_id="season_id" :season_number="season_no"/>
        </slide>

    </carousel>
</template>

<script>
  // @ is an alias to /src
    import epCarouselItem from '@/components/carousel/innerItem/epInner.vue'
    import { inject } from "vue";
    import 'vue3-carousel/dist/carousel.css';
    import { Carousel, Slide } from 'vue3-carousel';


    export default {
        props: {
            season_no: Number,
            data: Array || Object,
            poster: String,
            season_id: String
        },
        name: 'epCarousel',
        data(){
            return{
                itemsToShow: 1,
            }
        },
        setup(){
            const store = inject('store');
            return{
                store
            }
        },
        watch:{
            'store.state.width'(){
                this.itemsToShowChange();
            }
        },
        components: {
            epCarouselItem,
            Carousel,
            Slide,
            // HelloWorld
        },
        created(){
            this.itemsToShowChange();
        },
        methods:{
            itemsToShowChange(){
                this.itemsToShow = this.store.state.width / 130;
                if( this.itemsToShow < 1){this.itemsToShow = 1}
                if( this.store.state.width > 1500){this.itemsToShow = this.store.state.width / 190;}
            }
        }
    }
</script>
