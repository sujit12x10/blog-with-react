import { Container, PostForm, Heading } from "../index"
import authService from "../../appwrite/auth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const AddPost = () => {

    return (
        <div className="py-8">
            <Heading text="Create Blog"/>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}