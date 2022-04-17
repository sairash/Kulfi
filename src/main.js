import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/tailwind.css'
import vueProgressBar from "@aacassandra/vue3-progressbar"

const options = {
    color: '#06B6D4',
    failedColor: '#874b4b',
    thickness: '2px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
};


createApp(App).use(vueProgressBar, options).use(router).mount('#app');