import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import authService from "../appwrite/auth"
import { useEffect, useState } from "react"
import { Loader } from "./index"

export const ProtectedRoute = () => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    

    useEffect(() => {
        authService.getCurrentUser()
        .then(data => setUser(data))
        .finally(() => setLoading(false))
    }, [])
    
    return loading ? <Loader /> : (user ? <Outlet /> : <Navigate to="/login" state={{ message: "You must login first!"}}/>)
}