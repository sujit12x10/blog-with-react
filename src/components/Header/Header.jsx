import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Container, Logout } from "../index"
import { useSelector } from "react-redux"
import { Logo } from "../../components/index"
import { GiHamburgerMenu } from "react-icons/gi"
import { useEffect, useRef, useState } from "react"
import { FaReact } from "react-icons/fa"
import { CgClose } from "react-icons/cg"
import { CgCloseR } from "react-icons/cg"
import { GrClose } from "react-icons/gr"


export const Header = () => {
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [isOn, setIsOn] = useState(false)
    const displayRef = useRef(null)
    const display = !isOn ? "hidden" : ""
 
    // Header's Navigation Items
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        // {
        //     name: "Blogs",
        //     slug: "/all-posts",
        //     active: authStatus
        // },
        {
            name: "Add Blog",
            slug: "/add-post",
            active: authStatus
        },
        {
            name: "About",
            slug: "/about",
            active: true || false
        }
    ]

    return (
        <header className="sticky z-50 top-0">
            <nav ref={displayRef} className=" bg-gray-900 shadow-md shadow-black px-4 py-2 md:flex">
                <div className="mt-1 mb-2">
                    <Logo />
                    <button onClick={() => setIsOn(!isOn)} className="absolute right-2 top-4 md:hidden">
                        {
                            !isOn ? <GiHamburgerMenu size={30} color="white" className=""/> : <GrClose size={25} color="white"/>
                        }
                    </button>
                </div>
                <ul className="ml-auto hidden md:flex">
                    { navItems.map((item) => item.active ? (
                            <li key={item.name}>
                                <NavLink to={item.slug} className={(isActive) => 
                                    `inline-block px-4 py-2 duration-200 hover:bg-black hover:text-cyan-300 rounded text-xl font-racing ${pathname === item.slug ? "text-cyan-200" : "text-[aliceblue]"}`
                                }>
                                    {item.name}
                                </NavLink>
                            </li>
                        ) : null)}

                    {
                        authStatus && (
                            <li>
                                <Logout />
                            </li>
                        )
                    }
                </ul>
                
                {/* For Mobile Screen */}
                <ul className={`duration-200 ${display} md:hidden duration-200`}>
                    { navItems.map((item) => item.active ? (
                                <li onClick={() => setIsOn(false)} key={item.name} className="hover:bg-gray-700 hover:text-cyan-300 py-3 duration-200 mx-auto flex first:border-t-[1px] first:mt-4">
                                    <NavLink to={item.slug} className={(isActive) => 
                                        `mx-auto duration-200 text-xl font-racing ${pathname === item.slug ? "text-cyan-200" : "text-white"}`
                                    }>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null)}

                        {
                            authStatus && (
                                <li onClick={() => setIsOn(false)} className="flex justify-center">
                                    <Logout />
                                </li>
                            )
                        }
                </ul>
            </nav>
        </header>
    )
}