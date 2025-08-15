import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'
import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';
import ToastService from 'primevue/toastservice';


 const customTheme = definePreset(Lara, {
    semantic: {
        primary: {
            50: '#FFE6E9',
            100: '#FFCDD2',
            200: '#FF99A3',
            300: '#FF6675',
            400: '#FF3347',
            500: '#EB0021', // cor principal
            600: '#CC001D',
            700: '#AD0019',
            800: '#8F0014',
            900: '#730A00',
            950: '#4D0600'
        },
        colorScheme: {
            light: {
                
                primary: {
                    color: '#EB0021',
                    inverseColor: '#FFFFFF',
                    hoverColor: '#FF3344',
                    activeColor: '#CC001D'
                },
                highlight: {
                    background: '"#FFF5F6',
                    focusBackground: '#CC001D',
                    color: '#FFFFFF',
                    focusColor: '#FFFFFF'
                },
                surface: {
                    0: '#FFF5F6', // background
                    50: '#FFFFFF' // cards
                },
                borderColor: '#FFCDD2',
                textColor: '#730A00',
                textColorSecondary: '#FF4156',
                shadow: {
                    color: '#000000'
                }
            },
            dark: {
                primary: {
                    color: '#EB0021',
                    inverseColor: '#FFFFFF',
                    hoverColor: '#FF3344',
                    activeColor: '#CC001D'
                },
                highlight: {
                    background: '#EB0021',
                    focusBackground: '#CC001D',
                    color: '#FFFFFF',
                    focusColor: '#FFFFFF'
                },
                surface: {
                    0: '#1a1a1a',
                    50: '#242424'
                },
                borderColor: '#FFCDD2',
                textColor: '#FFF5F6',
                textColorSecondary: '#FF4156',
                shadow: {
                    color: '#000000'
                }
            }
        }
    }
});
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: customTheme,
          options: {
            darkModeSelector: '.my-app-dark',
        }
    }
});

app.mount('#app')
