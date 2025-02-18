import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import authService from "../appwrite/auth"
import { login } from "../store/authSlice"
import { Button, Logo } from "./index"
import { Input } from "./index"


export const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState(null)

    // Create Account
    const createAccount = async(data) => {
        setError("")
        
        try{
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error){
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center pb-5 px-6">
            <div className={`mx-auto mt-10 w-full max-w-lg p-10 shadow-2xl bg-white border-t-[5px] border-gray-700`}>
                <div className="mb-2 flex justify-center">
                    <Logo text="text-gray-900"/>
                </div>
                <h2 className="text-center text-2xl mt-5">Create an account with us.</h2>
                <p className="mt-4 text-center text-base text-black/60">
                    Already have an account?
                    <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                        <span className="font-bold ml-2 text-blue-600">Login Here</span>
                    </Link>
                </p>
                {
                    error && <p className="text-orange-500 mt-8 text-center">
                        {error}
                    </p>
                }

                <form onSubmit={handleSubmit(createAccount)}>
                    <div className="space-y-5 mt-4">
                        <Input 
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {required: true})}
                        />

                        <Input 
                            label="Email: "
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                // validate: {
                                //     matchPatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "Email address must be a valid address"
                                // }
                            })}
                        />

                        <Input 
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <button type="submit" className="w-full py-3 bg-[#333] text-white text-sm rounded">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}