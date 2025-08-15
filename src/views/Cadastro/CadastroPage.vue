<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { z } from 'zod';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Button from 'primevue/button';
import type { SignUpData } from '@/types';
import router from '@/router';

const toast = useToast();

const formData = reactive<SignUpData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const passwordSchema = z.string().min(6, {
    message: `A senha deve ter pelo menos ${6} caracteres`
})

const emailSchema = z.string().email({
    message: "Endereço de e-mail inválido"
});

const errors = reactive<Record<string, string>>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});
const schema = z.object({
    name: z.string().min(3, { message: "Nome é Obrigatorio" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
})

function validate() {
    const result: any = schema.safeParse(formData);
    // reset errors
    errors.name = '';
    errors.email = '';
    errors.password = '';
    errors.confirmPassword = '';

    if (formData.confirmPassword !== formData.password){
        errors.confirmPassword = "As senhas devem ser iguais"
        return false;
    }

    if (!result.success) {
        result.error.errors.forEach((e: any) => {
            if (e.path[0]) errors[e.path[0] as string] = e.message;
        });
        return false;
    }
    return true;
}

function onFormSubmit() {
    if (validate()) {
        router.push({name: 'VerificaEmail'})
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
}
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-primary">
        <div class="flex flex-col items-center">
            <img src='@/assets/logo.png' alt="Image" width="250" />
            <h1 class="mt-10 mb-4 font-bold text-[#730A00]">Crie sua Conta</h1>

            <form @submit.prevent="onFormSubmit" class="flex justify-center flex-col gap-4 w-[300px]">

                <div class="flex flex-col gap-1">
                    <InputText v-model="formData.name" type="text" placeholder="Digite seu Nome Completo" />
                    <Message v-if="errors.name" severity="error" size="small" variant="simple">
                        {{ errors.name }}
                    </Message>
                </div>

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

                 <div class="flex flex-col gap-1">
                    <InputText v-model="formData.confirmPassword" type="text" placeholder="Confirme sua Senha" />
                    <Message v-if="errors.confirmPassword" severity="error" size="small" variant="simple">
                        {{ errors.confirmPassword }}
                    </Message>
                </div>

                <Button type="submit" severity="secondary" label="Cadastrar" />
            </form>
            <div class="mt-6 flex">
                <p class="mr-2">Já tem uma conta?</p>
                <RouterLink class="text-[#730A00] font-bold" to="/login">Fazer Login</RouterLink>
            </div>
        </div>
    </div>
</template>
