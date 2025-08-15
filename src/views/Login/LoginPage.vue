<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { z } from 'zod';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Button from 'primevue/button';
import type { SignInData } from '@/types';
import { AuthService } from '@/services';
import { setToken, setUser } from '@/utils/storage';
import router from '@/router';

const toast = useToast();

const loading = ref(false);

const formData = reactive<SignInData>({
    email: '',
    password: ''
});

const errors = reactive<Record<string, string>>({
    email: '',
    password: ''
});

const passwordSchema = z.string().min(6, {
    message: `A senha deve ter pelo menos ${6} caracteres`
})

const emailSchema = z.string().email({
    message: "Endereço de e-mail inválido"
});


const schema = z.object({
    email: emailSchema,
    password: passwordSchema
});

function validate() {
    const result: any = schema.safeParse(formData);
    // reset errors
    errors.email = '';
    errors.password = '';

    if (!result.success) {
        result.error.errors.forEach((e: any) => {
            if (e.path[0]) errors[e.path[0] as string] = e.message;
        });
        return false;
    }
    return true;
}

function parseMessage(value: string) {
    try {
        const parsed = JSON.parse(value);
        // Se o parse funcionar e existir a propriedade message
        if (parsed && typeof parsed === 'object' && 'message' in parsed) {
            return parsed.message;
        }
    } catch {
        // Não é JSON, retorna a string original
    }
    return value;
}

async function onFormSubmit() {
    if (validate()) {
        try {
            loading.value = true;
            const authService = new AuthService()
            const response = await authService.signIn(formData)
            console.log("response login:", response);
            if (response.data) await setUser(response.data)
            if (response.token) await setToken(response.token)
            router.push({ name: "Home" })

        } catch (err: any) {
            const msg = parseMessage(err.message);
            toast.add({ severity: 'error', summary: msg || "Falha ao fazer login", life: 5000 });
            loading.value = false;
        } finally {
            loading.value = false;
        }
    }
}
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-primary">
        <div class="flex flex-col items-center">
            <img src='@/assets/logo.png' alt="Image" width="250" />
            <h1 class="mt-10 mb-4 font-bold text-[#730A00]">Fazer Login</h1>

            <form @submit.prevent="onFormSubmit" :loading="loading"
                class="flex justify-center flex-col gap-4 w-[300px]">

                <div class="flex flex-col gap-1">
                    <InputText v-model="formData.email" type="text" placeholder="Digite seu Email" />
                    <Message v-if="errors.email" severity="error" size="small" variant="simple">
                        {{ errors.email }}
                    </Message>
                </div>

                <div class="flex flex-col gap-1">
                    <InputText v-model="formData.password" type="text" placeholder="Digite sua Senha" />
                    <Message v-if="errors.password" severity="error" size="small" variant="simple">
                        {{ errors.password }}
                    </Message>
                </div>

                <Button type="submit" severity="secondary" label="Entrar" :loading="loading" />
            </form>
            <div class="mt-6 flex">
                <p class="mr-2">Não tem uma conta?</p>
                <RouterLink class="text-[#730A00] font-bold" to="/cadastro">Cadastrar-se</RouterLink>
            </div>
        </div>
    </div>
</template>
