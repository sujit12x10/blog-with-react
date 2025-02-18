import { Link, useNavigate, useLocation } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { login as authLogin } from "../store/authSlice";
import { Button, Select, Input, Logo } from "./index"
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const {register, handleSubmit} = useForm()

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin({userData}))
                navigate("/")
            }
        } catch (error){
            setError(error.message)
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-[90%] mx-auto py-6">
                {
                    location.state?.message && <h2 className="text-red-600 text-xl">{location.state.message}</h2>
                }
                <div className={`mx-auto mt-10 w-full max-w-lg shadow-2xl p-10 bg-white border-t-[5px] border-gray-700`}>
                    <div className="mb-2 flex justify-center">
                        <Logo text="text-gray-900"/>
                    </div>
                    <h2 className="text-center text-2xl font-">Sign in to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Don't have any account?
                        <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                            <span className="font-bold ml-2 text-blue-600">Signup Here</span>
                        </Link>
                    </p>
                    {
                        error && <p className="text-orange-500 font-bold mt-8 text-center">
                            {error}
                        </p>
                    }
                    <form onSubmit={handleSubmit(login)} className="mt-8">
                        <div className="space-y-5">
                            
                            <Input 
                                label="Email: "
                                palceholder="Enter your email"
                                type="email"
                                {
                                    ...register("email", {
                                        required: true,
                                        // validate: {
                                        //     matchPatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "Email address must be a valid address"
                                        // }
                                    })
                                }
                            />

                            <Input 
                                label="Password: "
                                palceholder="Enter your password"
                                type="password"
                                {
                                    ...register("password",{ required: true})
                                }
                            />
                            <button type="submit" className="w-full text-sm py-3 bg-[#333] text-white rounded">SIGN IN</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}