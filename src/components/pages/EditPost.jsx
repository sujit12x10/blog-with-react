import { useState, useEffect } from "react"
import appwriteService from "../../appwrite/config"
import { Container, PostForm, Heading } from "../index"
import { useNavigate, useParams } from "react-router-dom"

export const EditPost = () => {
    const [post, setPost] = useState([])
    const slug = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug.documentId)
            .then(data => {
                if (data){
                    setPost(data)
                } else {
                    navigate("/")
                }
            })
            // .catch(error => {})
        }
    }, [slug, navigate])

    return post ? 
        (<div className="py-8">
            <Heading text="Edit Post"/>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>)
    : null
}