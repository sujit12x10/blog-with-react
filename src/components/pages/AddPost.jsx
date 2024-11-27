import { Container, PostForm, Heading } from "../index"


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