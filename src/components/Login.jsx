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
      
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState(null)

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
            <div className="flex items-center justify-center w-[90%] mx-auto">
                <div className={`mx-auto w-full mt-14 max-w-lg shadow-2xl p-10 bg-white border-t-[5px] border-gray-700`}>
                    <div className="mb-2 flex justify-center">
                        <Logo text="text-gray-900"/>
                    </div>
                    <h2 className="text-center text-2xl font-racing">Sign in to your account</h2>
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
                            <Button type="submit" className="w-full text-xl py-3">Sign in</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}