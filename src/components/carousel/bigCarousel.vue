<template>
    <carousel :items-to-show="itemsToShow">
        <slide v-for="item in data" :key="item">
            <bigCarouselItem :adult="item.adult" :poster="item.poster_path" :original_title="item.original_title" :original_name="item.original_name" :overview="item.overview" :extraInfo="item.vote_average" :type="'Tv'" :tag="item.tag" :release_date="item.release_date" :age="item.original_language" :link="item.id"  :air_date="item.first_air_date" :backgroundPost="item.backdrop_path" />
        </slide>

        <template #addons>
            <navigation />
        </template>
    </carousel>
</template>

<script>
  // @ is an alias to /src
    import bigCarouselItem from '@/components/carousel/innerItem/bigInner.vue'
    import { inject } from "vue";
    import 'vue3-carousel/dist/carousel.css';
    import { Carousel, Slide, Navigation } from 'vue3-carousel';


    export default {
        name: 'BigCarousel',
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
        props: {
            data: Array
        },
        watch:{
            'store.state.width'(){
                this.itemsToShowChange();
            }
        },
        components: {
            bigCarouselItem,
            Carousel,
            Slide,
            Navigation,
            // HelloWorld
        },
        created(){
            this.itemsToShowChange();
        },
        methods:{
            itemsToShowChange(){
                this.itemsToShow = this.store.state.width / 390;
                if( this.itemsToShow < 1.5){this.itemsToShow = 1}
            }
        }
    }
</script>
