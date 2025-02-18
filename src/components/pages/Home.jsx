import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../store/postSlice.js"
import appwriteService from "../../appwrite/config";
import { Container, PostCard, Logo, Loader, Heading } from "../index"

export const Home = () => {

    const [posts, setPosts] = useState(null)
    
    // Get Post Date Method
    const getDate = (documnet) => {
        const createdAt = new Date(documnet.$createdAt)
        const date = createdAt.getDate()
        const month = createdAt.toLocaleString('default', {month: 'long'}).slice(0,3).toUpperCase()
        const year = createdAt.getFullYear()        
        return `${date} ${month}, ${year}`
    }

    useEffect(() => {
        appwriteService.getPosts().then((data) => {
          setPosts(data.documents)
        })
    }, []) 

    return (
        posts && <div className="p-8">
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
        </div>
    )
}