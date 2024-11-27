import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, Navigate, useLoaderData, useLocation, Link } from "react-router-dom"
import { Loader } from "../components/index"

export const Protected = ({children, authentication=true}) => {
   const authStatus = useSelector(state => state.auth.status)

   if (authStatus || authentication) return children
   if (!authStatus && !authentication) 
      return (<div className="text-center pt-10">
                  <h1 className="font-bold text-3xl text-gray-800">You must login first to continue!</h1>
                     <Link to="/login">
                        <button className="mt-32 bg-gray-900 text-xl text-white font-racing px-8 py-2 w-80 rounded hover:bg-slate-400 hover:text-gray-900 duration-500">Login</button>
                     </Link>
                     <br />
                     <Link to="/signup">
                        <button className="bg-gray-900 text-xl text-white font-racing px-8 py-2 w-80 rounded hover:bg-slate-400 hover:text-gray-900 duration-500 mt-4">Signup</button>
                     </Link>
            </div>)
}

// return <Navigate to="/login" state={{ message: "You must login first!"}} />