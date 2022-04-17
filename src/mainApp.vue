<template>
    <div class="w-full flex flex-col-reverse sm:flex-col  overflow-hidden px-5 bg-zinc-900 text-zinc-500" :style="{'height': store.state.height+'px'}">
        <div class="header  flex h-14 sm:h-12 w-full flex-col justify-center">
            <div class="w-full flex justify-between">
               <div class="flex">
                    <div v-if="store.state.displayBackButton" onclick="history.back()" class="mt-1 cursor-pointer text-red-500 mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: currentColor;transform: ;msFilter:;"><path d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"></path></svg></div>
                    <router-link class="text-cyan-500 text-xl font-extrabold" to="/">Kulfi</router-link>
               </div>
                <div class="flex mt-1">
                    <router-link to="/search" class="hover:text-white cursor-pointer text-xl font-extrabold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: currentColor;transform: ;msFilter:;"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg></router-link>
                    <router-link to="/info" class="hover:text-white cursor-pointer text-xl font-extrabold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: currentColor;transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg></router-link>
                    <div v-if="store.state.displayBottomInfo" @click="store.methods.displayBottomInfoChange(false)" class="block sm:hidden text-red-500 cursor-pointer text-xl font-extrabold"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: currentColor;transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg></div>
                </div>
            </div>
        </div>
        <div class="flex-1 overflow-y-auto overflow-x-hidden closeInfoBar  mr-0 sm:-mr-5">
            <router-view />
        </div>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" >
        <div class="z-30 description_on_click fixed bottom-14 sm:bottom-0 h-28 2xl:h-44 w-full z-top bg-black bg-opacity-90 px-3 2xl:px-10 bg-cover bg-center group" :style="'background-image: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%),url('+store.state.jsonBottomInfo.backgroundPost+')'" v-if="store.state.displayBottomInfo">
            <div class="flex w-full">
                <div class="h-28 2xl:h-44 flex flex-col justify-center">
                <div class="img h-24 2xl:h-40">
                    <img :src="store.state.jsonBottomInfo.poster" class="h-full">
                </div>
                </div>
                <div class="ml-1 2xl:ml-3 2xl:max-w-lg text-white">
                <div class="2xl:text-2xl logo">
                    {{store.state.jsonBottomInfo.name}}
                </div>
                <small class="text-xs md:text-base">{{store.state.jsonBottomInfo.date}} <span class="border text-xs p-1 ml-1 mr-2"> {{store.state.jsonBottomInfo.age}} </span> <span class="text-yellow-500"> {{store.state.jsonBottomInfo.extraInfo}} </span></small>
                <p class="hidden md:block">
                    {{store.state.jsonBottomInfo.description}}
                </p>
                <div class="block 2xl:hidden mt-0  sm:-mt-5 2xl:mt-0 " style="height: 20px;"></div>
                <button @click="onClickChange()" type="button" class="flex focus:outline-none text-white text-sm py-1 2xl:mt-2 pl-3 pr-5 logo rounded-md bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-105"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M7 6v12l10-6z"></path></svg> <div class="mt-0.5">Play</div></button>
                </div>
                <div class="fixed hidden sm:block right-4 bottom-32 sm:bottom-16 2xl:bottom-32">
                    <button @click="store.methods.displayBottomInfoChange(false)" type="button" class="flex focus:outline-none text-white text-sm py-1 2xl:mt-2 px-3 logo rounded-md bg-gradient-to-r from-red-400 to-red-600 transform hover:scale-105"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg></button>
                </div>
            </div>
        </div>
    </transition>
    <vue-progress-bar />
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
        this.virtualScreen();
        window.addEventListener('resize', this.virtualScreen);
        this.store.methods.progressbarEventChange('start')
    },
    watch:{
        'store.state.progressbarEvent'(newEvent){
            if (newEvent == 'start'){
                this.$Progress.start();
                this.$Progress.pause();
                this.$Progress.set(10);
                for (let i = 1; i <= 9; i++){
                    setTimeout(() => {
                        if(this.store.state.progressbarEvent != 'finish'){
                            this.$Progress.set(i * 10);
                        }
                    }, 2000);
                }
            }else{
                this.$Progress.finish();
            }
        },
        $route (){
            this.store.methods.displayBottomInfoChange(false)
            this.store.methods.progressbarEventChange('start')
        }
    },
    methods:{
        virtualScreen(){
            this.store.methods.heightChange(window.innerHeight)
            this.store.methods.widthChange(window.innerWidth)
        },
        clickEvent(bool){
            this.store.methods.displayBottomInfoChange(bool)
        },
        onClickChange(){
            this.store.methods.displayBottomInfoChange(false)
            history.pushState(
                {},
                null,
                this.store.state.jsonBottomInfo.link
            )
            location.reload();
        }
    },

}
</script>

<style>
    .carousel__prev, .carousel__next{
        background-color: rgb(8, 145, 178);
    }
    .carousel__pagination-button--active{
        background-color: rgb(8, 145, 178) !important;
    }
    .carousel__pagination-button{
        background-color: rgba(8, 145, 178, .7);
        width: 5px;
        height: 5px;
    }
    .carousel__next{
        margin-right: 10px;
    }
    .carousel__prev{
        margin-left: 10px !important;
    }
    .carousel__prev--in-active,
    .carousel__next--in-active {
        display: none !important;
    }
   
    *::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0.3);
        background-color: rgba(50, 50,50, 0.4);
        border-radius: 20px;
    }

    *::-webkit-scrollbar
    {
        width: 0px;
        background-color: rgba(50,50,50, 0.4);
        border-radius: 20px;
    }

    *::-webkit-scrollbar-thumb
    {
        background-color: rgb(59 130 246);
        border-radius: 20px;
    }
    .active_type::before{
        content: '• ';
    }
    .active_type{
        color: white;
        display: flex;
    }

</style>