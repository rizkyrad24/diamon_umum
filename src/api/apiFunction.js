import ApiManager from "./apiManager";
import { clearDataLogin } from "@/utils/helper";

export const fetchGet = async (endpoint, params, router) => {
    const token = localStorage.getItem('access');
    if (!token) {
        clearDataLogin();
        router.push("/");
    }
    try {
        const result = await ApiManager(`/${endpoint}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        },
        params: params
        })
        return result
    } catch (error) {
        if (error.response.status == 401) {
            clearDataLogin();
            router.push("/");
        }
        return error.response
    }
}

export const fetchPost = async (endpoint, params, data, router) => {
    const token = localStorage.getItem('access');
    if (!token) {
        clearDataLogin();
        router.push("/");
    }
    try {
        const result = await ApiManager(`/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: params,
        data: data
        })
        return result
    } catch (error) {
        if (error.response.status == 401) {
            clearDataLogin();
            router.push("/");
        }
        return error.response
    }
}

export const fetchPostForm = async (endpoint, params, data, router) => {
    const token = localStorage.getItem('access');
    if (!token) {
        clearDataLogin();
        router.push("/");
    }
    try {
        const result = await ApiManager(`/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        params: params,
        data: data
        })
        return result
    } catch (error) {
        if (error.response.status == 401) {
            clearDataLogin();
            router.push("/");
        }
        return error.response
    }
}

export const fetchPostFormPublic = async (endpoint, params, data, router) => {
    try {
        const result = await ApiManager(`/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: params,
        data: data
        })
        return result
    } catch (error) {
        if (error.response.status == 401) {
            clearDataLogin();
            router.push("/");
        }
        return error.response
    }
}

export const fetchPut = async (endpoint, params, data, router) => {
    const token = localStorage.getItem('access');
    if (!token) {
        clearDataLogin();
        router.push("/");
    }
    try {
        const result = await ApiManager(`/${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: params,
        data: data
        })
        return result
    } catch (error) {
        if (error.response.status == 401) {
            clearDataLogin();
            router.push("/");
        }
        return error.response
    }
}

export const fetchPutForm = async (endpoint, params, data, router) => {
    const token = localStorage.getItem('access');
    if (!token) {
        clearDataLogin();
        router.push("/");
    }
    try {
        const result = await ApiManager(`/${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        params: params,
        data: data
        })
        return result
    } catch (error) {
        if (error.response.status == 401) {
            clearDataLogin();
            router.push("/");
        }
        return error.response
    }
}

export const fetchPatch = async (endpoint, params, data, router) => {
    const token = localStorage.getItem('access');
    if (!token) {
        clearDataLogin();
        router.push("/");
    }
    try {
        const result = await ApiManager(`/${endpoint}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: params,
        data: data
        })
        return result
    } catch (error) {
        if (error.response.status == 401) {
            clearDataLogin();
            router.push("/");
        }
        return error.response
    }
}

export const fetchDelete = async (endpoint, params, router) => {
    const token = localStorage.getItem('access');
    if (!token) {
        clearDataLogin();
        router.push("/");
    }
    try {
        const result = await ApiManager(`/${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: params
        })
        return result
    } catch (error) {
        if (error.response.status == 401) {
            clearDataLogin();
            router.push("/");
        }
        return error.response
    }
}