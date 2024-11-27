import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container, Loader } from "../index"
import parse from "html-react-parser"
import { useSelector } from "react-redux";

export const Post = () => {
    const [post, setPost] = useState(null)
    const slug = useParams()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const isAuthor = post &&  userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug.slug)
            .then(data => {
                if (data){ 
                    setPost(data)
                }
                else navigate("/")
            })
        } else navigate("/")
    }, [slug, post])

    const deletePost = () => {
        appwriteService.deletePost(post.$id)
        .then(status => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage)
                navigate("/")
            }
        })
    }

    const getDate = (documnet) => {
        const createdAt = new Date(documnet.$createdAt)
        const date = createdAt.getDate()
        const month = createdAt.toLocaleString('default', {month: 'long'}).slice(0,3)
        const year = createdAt.getFullYear()        
        return `${date} ${month}, ${year}`
    }


    return post ? (
        <div className="px-1 py-7">
            <Container>
                <div className="w-full flex flex-col py-3 px-3 bg-white">
                    <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className=""/>
                    <div className="w-full mb-6 mt-6 px-4">
                        <h2 className="text-2xl font-bold font-racing text-center">{post.title}</h2>
                        <div className="browser-css mt-2">
                            {parse(post.content)}
                        </div>
                    </div>
                

                {
                    isAuthor && (
                        <div className="px-4">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-gray-800 text-white" className="mr-5 px-4 py-0">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-gray-800 text-white" className="px-4 py-0" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )
                }

                </div>
            </Container>
        </div>
    ) : <Loader />
}