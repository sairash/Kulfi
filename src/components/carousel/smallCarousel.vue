<template>
    <div class="text-lg mt-5 text-white logo">{{title}}</div>
    <carousel :items-to-show="itemsToShow">
        <slide v-for="item in data.results" :key="item">
            <smallCarouselItem :adult="item.adult" :poster="item.poster_path" :original_title="item.original_title" :original_name="item.original_name" :overview="item.overview" :extraInfo="item.vote_average" :tag="item.tag" :release_date="item.release_date" :age="item.original_language" :link="item.id"  :air_date="item.first_air_date" :backgroundPost="item.backdrop_path"/>
        </slide>

    </carousel>
</template>

<script>
  // @ is an alias to /src
    import smallCarouselItem from '@/components/carousel/innerItem/smallInner.vue'
    import { inject } from "vue";
    import 'vue3-carousel/dist/carousel.css';
    import { Carousel, Slide } from 'vue3-carousel';


    export default {
        props: {
            title: String,
            data: Array || Object,
        },
        name: 'SmallCarousel',
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
            smallCarouselItem,
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
