import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../store/postSlice.js"
import appwriteService from "../../appwrite/config";
import { Container, PostCard, Logo, Loader, Heading } from "../index"

export const Home = () => {

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(null)
    const postsArray = useSelector(store => store.posts.data)
    const authStatus = useSelector(store => store.auth.status)
    
    useEffect(() => {   
        if (authStatus){
            setPosts(postsArray)
        }
        setLoading(false)
    }, [postsArray])

    if (!authStatus){
        
    }

    // Get Post Date Method
    const getDate = (documnet) => {
        const createdAt = new Date(documnet.$createdAt)
        const date = createdAt.getDate()
        const month = createdAt.toLocaleString('default', {month: 'long'}).slice(0,3).toUpperCase()
        const year = createdAt.getFullYear()        
        return `${date} ${month}, ${year}`
    }

    return (loading || !posts) ?  <Loader /> : (
        posts ?
        (<div className="py-8">
            <Container>
                <Heading text="BLOGS"/>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
                    {
                        posts.map(post => (
                            <div key={post.$id} className="p-2">
                                {/* Just Cards within a Link */}
                                <PostCard date={getDate(post)} {...post}/> 
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>) : ""
    )
}