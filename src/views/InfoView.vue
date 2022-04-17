<template>
    <div class="w-full h-full flex flex-col justify-center z-20">
        <div class="flex justify-center">
            <div class="">
                <h1 class="font-bold text-2xl flex">
                <div class="pt-2">Thanks for checking kulfi</div> 
                <img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/partying-face_1f973.png" class="w-10 ml-2">
                </h1>
                <h4>This project was made under 2 days</h4>
                <h4>So if there are some problems with the Site / App</h4>
                <h4>Please contact me at <span class="text-cyan-500">gautamsairsah@gmail.com</span></h4>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from "vue";
export default {
    setup(){
        const store = inject('store');
        return{
            store
        }
    },
    created(){
        setTimeout(() => {
            this.store.methods.progressbarEventChange('finish')
        }, 500);
    },
}
</script>

<style>

</style>