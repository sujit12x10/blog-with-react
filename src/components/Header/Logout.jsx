import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import authService from "../../appwrite/auth"
import { useNavigate } from "react-router-dom"

export const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/login")
        })
    }

    return (
        <button className="rounded duration-200 text-white uppercase font-bold" onClick={handleLogout}>
            Logout
        </button>
    )
}