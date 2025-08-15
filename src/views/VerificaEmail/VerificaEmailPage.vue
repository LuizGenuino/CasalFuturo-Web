<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useToast } from 'primevue/usetoast';
import { z } from 'zod';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Button from 'primevue/button';
import type { VerifyEmailData } from '@/types';

const toast = useToast();

const formData = reactive<VerifyEmailData>({
    verificationCode: ''
});

const errors = reactive<Record<string, string>>({
    verificationCode: ''
});



const schema = z.object({
    verificationCode: z.string().min(6).max(6),
});

function validate() {
    const result: any = schema.safeParse(formData);
    // reset errors
    errors.verificationCode = '';

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
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
}
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-primary">
        <div class="flex flex-col items-center">
            <img src='@/assets/logo.png' alt="Image" width="250" />
            <h1 class="mt-10 mb-4 font-bold text-[#730A00]">Verifique seu Email</h1>
            <p>Enviamos um código de verificação no seu email</p>
            <form @submit.prevent="onFormSubmit" class="flex justify-center flex-col gap-4 w-[300px]">

                <div class="flex flex-col gap-1 my-10">
                    <InputText v-model="formData.verificationCode" type="text"
                        placeholder="Digite o Código de Verificação" />
                    <Message v-if="errors.verificationCode" severity="error" size="small" variant="simple">
                        {{ errors.verificationCode }}
                    </Message>
                </div>

                <Button type="submit" severity="secondary" label="Verificar Email" />
            </form>
            <div class="mt-6 flex">
                <RouterLink class="text-[#730A00] font-bold" to="/cadastro">Voltar para o Cadastro</RouterLink>
            </div>
        </div>
    </div>
</template>
