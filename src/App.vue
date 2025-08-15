<script setup lang="ts">
import Toast from 'primevue/toast';
</script>

<template>
        <!-- <h1>Hello App!</h1>
        <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
        <nav>
            <RouterLink to="/">Go to Home</RouterLink>
            <RouterLink to="/about">Go to About</RouterLink>
        </nav> -->
         
        <main>
            <Toast />
            <RouterView />
        </main>
</template>

<style scoped>
:root {
    --primary-color: #EB0021;
    --primary-color-text: #FFFFFF;

    --surface-ground: #FFF5F6; /* fundo geral */
    --surface-card: #FFFFFF;   /* fundo dos cards */
    --text-color: #730A00;
    --text-color-secondary: #FF4156;

    --surface-border: #FFCDD2;
    --shadow-color: #000000;
}

</style>
