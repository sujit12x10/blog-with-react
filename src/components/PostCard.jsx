import { Link } from "react-router-dom"
import appwriteService from "../appwrite/config"
import { BiCalendarWeek } from "react-icons/bi"

export const PostCard = ({$id, title, featuredImage, date}) => {

    return (
        <Link to={`/post/${$id}`}>
            {/* <div className="w-full bg-white shadow-slate-400 shadow-lg px-3">  */}
            <div className="w-full px-3"> 
                <div className="w-full justify-center mb-4 pt-3">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="h-40 w-full rounded"/>
                </div>
                <div className="flex text-gray-500 justify-center">
                    <button><BiCalendarWeek size={20}/></button><span className="font-bold">{date}</span>
                </div>
                <h2 className="text-xl py-3 font-racing text-center">{title}</h2>
            </div>
        </Link>
    )
}