import CadastroPage from '@/views/Cadastro/CadastroPage.vue'
import HomePage from '@/views/Home/HomePage.vue'
import LoginPage from '@/views/Login/LoginPage.vue'
import VerificaEmailPage from '@/views/VerificaEmail/VerificaEmailPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: "Login",
        component: LoginPage
    },
    {
        path: '/cadastro',
        name: "Cadastro",
        component: CadastroPage
    },
    {
        path: '/verifica-email',
        name: "VerificaEmail",
        component: VerificaEmailPage
    },

     {
        path: '/',
        name: "Home",
        component: HomePage
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router
