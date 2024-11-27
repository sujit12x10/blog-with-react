import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import authService from "../../appwrite/auth"
import { useNavigate } from "react-router-dom"

export const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/login")
        })
    }

    return (
        <button className="px-6 py-2 rounded duration-200  hover:text-red-800 text-[aliceblue] font-racing text-xl w-full" onClick={handleLogout}>
            Logout
        </button>
    )
}