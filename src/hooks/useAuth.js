import { useState, useEffect } from "react";
import axiosClient from '../config/axios';
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

export const useAuth = ({middleware, url}) => {

    const [errors, setErrors] = useState([]);
    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();

    const {data: user, error, mutate} = useSWR('/api/user', () =>
        axiosClient('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    // Login
    const login = async (user) => {
        try {
            const data = await axiosClient.post('/api/login', user)
            localStorage.setItem('AUTH_TOKEN', data.data.token)
            setErrors([])
            await mutate()

        } catch(error) {
            setErrors(Object.values(error.response.data.errors))
       
        }
    }

    // Logout
    const logout = async () => {
        try {
            await axiosClient.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)

        } catch(error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    // Register 
    const register = async (user) => {
        try {
            const data = await axiosClient.post('/api/register', user)
            localStorage.setItem('AUTH_TOKEN', data.data.token)
            setErrors([])
            await mutate()

        } catch(error) {
            setErrors(Object.values(error.response.data.errors))
        }
    }

    useEffect(() => {
        if(middleware === 'guest' && url && user) {
            navigate(url)
        }
        if(middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error])

    

    return {
        register,
        login,
        logout,
        errors,
        user,
        error
    }
}