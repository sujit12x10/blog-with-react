import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import authService from "../../appwrite/auth"
import { Container, Logout } from "../index"
import { logout } from "../../store/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { Logo } from "../../components/index"
import { GiHamburgerMenu } from "react-icons/gi"
import { useEffect, useRef, useState } from "react"
import { FaReact } from "react-icons/fa"
import { CgClose } from "react-icons/cg"
import { CgCloseR } from "react-icons/cg"
import { GrClose } from "react-icons/gr"


export const Header = () => {
    const authStatus = useSelector(state => state.auth.status)
    const [isMenu, setIsMenu] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {pathname} = useLocation()
 
    // Header's Navigation Items
    const navItems = [
        {
            name: "Home",
            slug: "/",
        },
        {
            name: "Add Blog",
            slug: "/add-post",
        },
        {
            name: "About",
            slug: "/about",
        }
    ]

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/login")
        })
    }

    return (
        <header className="sticky z-50 top-0">
            <nav className=" bg-gray-900 shadow-black md:px-4 py-2 md:flex">
                <div className="mt-1 m-2">
                    <Logo />
                    <button onClick={() => setIsMenu(!isMenu)} className="absolute right-2 top-4 md:hidden outline-none">
                        {isMenu ? <GrClose size={20} color="white"/>
                                : <GiHamburgerMenu size={20} color="white" className=""/>  
                        }
                    </button>
                </div>
                <ul className="ml-auto hidden md:flex">
                    { navItems.map((item) => (
                            <li key={item.name}>
                                <NavLink to={item.slug} className={(isActive) => 
                                    `uppercase font-semibold inline-block px-4 py-2 duration-200 hover:text-cyan-300 rounded text-sm font-poppins ${pathname === item.slug ? "text-cyan-200" : "text-[aliceblue]"}`
                                }>
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}

                    {
                         (
                            <li onClick={handleLogout} className="inline-block px-4 py-2 duration-200 hover:text-cyan-300 rounded text-sm uppercase font-poppins font-semibold text-[aliceblue] cursor-pointer">
                                Logout
                            </li>
                        )
                    }
                </ul>
                
                {/* For Mobile Screen */}
                <ul className={`absolute ${isMenu ? "top-14" : "-top-40"} w-screen md:hidden border-t bg-gray-900 duration-700 -z-10`}>
                    {navItems.map(item => (
                        <NavLink to={item.slug}>
                            <li key={item.name} className="text-white hover:bg-gray-700 hover:text-cyan-300 py-2 px-3 cursor-pointer uppercase text-sm">
                                {item.name}
                            </li>
                        </NavLink>
                    ))}
                    <NavLink to="/login">
                        <li className="text-white hover:bg-gray-700 hover:text-cyan-300 py-2 px-3 cursor-pointer uppercase text-sm">
                            Login
                        </li>
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}