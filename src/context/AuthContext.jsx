import { createContext, useContext, useEffect, useState } from "react";
import { Loader } from "../components/index"
import authService from "../appwrite/auth";
import { useNavigate, useNavigation, Navigate } from "react-router-dom";
import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf";


// const AuthContext = createContext()

// export const AuthProvider = ({children}) => {
//     // const navigate = useNavigate()
//     const client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
//     const account = new Account(client)

//     // const navigate = useNavigate()
//     const [loading, setLoading] = useState(false)
//     const [currentUser, setCurrentUser] = useState(null)

//     useEffect(() => {
//         // setLoading(false)
//         checkUserStatus()
//     }, [])

//     // Register Function
//     const createAccount = async ({email, password, name}) => {
//         setLoading(true)
//         try {
//             const response = await account.create(ID.unique(), email, password, name)
//             await account.createEmailPasswordSession(email, password)
//             const accountDetails = account.get()
//             setCurrentUser(accountDetails)
//             Navigate("/")
//         } catch(error){
//             console.log(error)
//         }
//         setLoading(false)
//     }

//     // Login Function
//     const loginUser = async ({email, password}) => {
//         setLoading(true)
//         try{
//             const response = await account.createEmailPasswordSession(email, password)
//             const accountDetails = await account.get()
//             setCurrentUser(accountDetails)
//             return accountDetails
//         } catch(error){
//             throw error
//         } finally{
//             setLoading(false)
//         }
//     }

//     // Logout Function
//     const logoutUser = async () => {
//         try{
//             await account.deleteSession();
//             setUser(null)
//         } catch (error){
//             console.log(error)
//         }
//     }

//     // Check Current User
//     const checkUserStatus = async () => {
//         try {
//             const accountDetails = await account.get()
//             setCurrentUser(accountDetails)
//         } catch(error){
//             console.log(error)
//         }
//         setLoading(false)
//     }
    
//     const contextData = {
//         currentUser,
//         createAccount,
//         loginUser,
//         logoutUser
//     }

//     return (
//         <AuthContext.Provider value={contextData}>
//             {loading ? <Loader /> : children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth = () => useContext(AuthContext)
// export default AuthContext