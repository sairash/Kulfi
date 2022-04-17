<template>
    <div class="w-full justify-center flex flex-wrap mt-3 sm:mt-5">
        <smallCarouselItem v-for="item in data" :key="item"  :adult="item.adult" :poster="item.poster_path" :original_title="item.original_title" :original_name="item.original_name" :overview="item.overview" :extraInfo="item.vote_average" :tag="item.tag" :release_date="item.release_date" :age="item.original_language" :link="item.id"  :air_date="item.first_air_date" :backgroundPost="item.backdrop_path" class="mx-0 sm:mx-2"/>
    </div>
</template>

<script>
    import smallCarouselItem from '@/components/carousel/innerItem/smallInner.vue'
    export default {
        components: {
            smallCarouselItem,
        },
        props: {
            data: Array,
        },
    }
</script>

<style>

</style>