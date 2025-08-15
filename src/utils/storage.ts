import type { UserData } from '@/types';

export async function setUser(value: UserData) {
    try {
        const jsonValue = JSON.stringify(value);
        await localStorage.setItem('CasalFuturo@User', jsonValue);
    } catch (error) {
        console.log("erro storage set user", error);
    }
};

export async function getUser() {
    try {
        const value = await localStorage.getItem('CasalFuturo@User');
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.log("erro storage get user", error);
    }
}

export async function clearUser() {
    try {
        await localStorage.removeItem('CasalFuturo@User');
    } catch (error) {
        console.log("erro storage remove user", error);
    }
}

export async function setToken(value: string) {
    try {
        await localStorage.setItem('CasalFuturo@Token', value);
    } catch (error) {
        console.log("erro storage set user", error);
    }
};

export async function getToken() {
    try {
        const value = await localStorage.getItem('CasalFuturo@Token');
        return value || null;
    } catch (error) {
        console.log("erro storage get token", error);

    }
}

export async function clearToken() {
    try {
        await localStorage.removeItem('CasalFuturo@Token');
    } catch (error) {
        console.log("erro storage remove token", error);

    }
}