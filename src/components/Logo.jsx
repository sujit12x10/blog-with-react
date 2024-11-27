import { FaReact } from "react-icons/fa6"

export const Logo = (children) => {
    
    return (
        <h1 className={`text-2xl font-bold font-racing text-[aliceblue] ${children && children.size}`}> <span className={`${children.text}`}>RE</span><span className="text-cyan-300">BLOG</span></h1>
    )
}