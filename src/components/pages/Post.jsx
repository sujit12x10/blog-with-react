import { IoTrashOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container, Loader, GoBack } from "../index"
import parse from "html-react-parser"
import { useSelector } from "react-redux";
import authService from "../../appwrite/auth";

export const Post = () => {
    const [comments, setComments] = useState(null)
    const [commentEdit, setCommentEdit] = useState({
        status: false,
        id: null,
        content: null
    })
    const [post, setPost] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const slug = useParams()
    const navigate = useNavigate()

    // authService.getUserName("67b45a7500006cbe898d").then(user => console.log(user))

    // Check Owner of the Post
    useEffect(() => {
        authService.getCurrentUser()
        .then(data => {
            setCurrentUser(data)
            if (post && data.$id === post.userId) setIsOwner(true)
        })
    }, [post])

    // Get Post
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

    // Delete Post
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
        const createdAt = new Date(documnet)
        const date = createdAt.getDate()
        const month = createdAt.toLocaleString('default', {month: 'long'}).slice(0,3)
        const year = createdAt.getFullYear()        
        return `${date} ${month}, ${year}`
    }

    const getuserName = (userId) => {
        authService.getUserName("67b45a7500006cbe898d")
    }

    // Getting Comments
    useEffect(() => {
        post && appwriteService.getComments(post.$id).then(data => setComments(data.documents))
    }, [post])

    // Create Comment
    const createComment = (event) => {
        event.preventDefault()
        appwriteService.createComment({
            postId:post.$id,
            userId:currentUser.$id,
            content:event.target["comment"].value
        })
        content:event.target["comment"].value = ""
    }

    // Update Comment
    const updateComment = (event) => {
        event.preventDefault()
        appwriteService.updateComment(commentEdit.id, commentEdit.content)
        setCommentEdit({
            status: false,
            id: null,
            content: null
        })
    }

    // Delete Comments
    const deleteComment = (id) => {
        appwriteService.deleteComment(id)
    }
    
    return post ? (
        <>
            <div id="modelConfirm" className={`fixed ${isModalOpen ? "" : "hidden"} z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
                <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

                <div className="flex justify-end p-2">
                    <button type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg onClick={() => setIsModalOpen(false)} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>

                <div className="p-6 pt-0 text-center">
                    <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this post?</h3>
                    <button href="#" 
                        onClick={deletePost}
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                        Yes, I'm sure
                    </button>
                    <button href="#"
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                        data-modal-toggle="delete-user-modal">
                        No, cancel
                    </button>
                </div>

                </div>
            </div>
            <div className="px-1 py-7">
                <Container>
                    <div className="w-full flex flex-col py-3 px-3 bg-white">
                        <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className=""/>
                        <div className="w-full mb-6 mt-6 px-4">
                            <h2 className="text-2xl font-bold text-center">{post.title}</h2>
                            <div className="browser-css mt-2">
                                {parse(post.content)}
                            </div>
                        </div>

                    {
                        isOwner && (
                            <div className="px-4 space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="bg-[#333] rounded p-1 px-2 text-sm text-white">EDIT</button>
                                </Link>
                                <button className="bg-red-600 rounded p-1 px-2 text-sm text-white" onClick={() => setIsModalOpen(true)}>
                                    DELETE
                                </button>
                            </div>
                        )
                    }

                    </div>
                </Container>
            </div>

            <div className="space-y-4 p-6 pt-0">
                {/* Add Comment Form */}
                { !commentEdit.status &&
                <form method="post" onSubmit={createComment} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">Comment</label>
                        <textarea id="comment" name="comment" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Post Comment
                    </button>
                </form>
                }
                {   comments && comments.slice(0).reverse().map(comment => (
                    <div key={comment.$id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center mb-2">
                            {/* <img src="https://via.placeholder.com/40" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" /> */}
                            <div>
                                <h3 className="font-semibold">John Doe</h3>
                                <p className="text-sm text-gray-500">{getDate(comment.$createdAt)}</p>
                            </div>
                        </div>
                        {   commentEdit.id === comment.$id ?
                            <form onSubmit={updateComment} method="post" className="">
                                <div>
                                    <textarea className="bg-slate-200 p-2 text-sm rounded resize-none" type="text" value={commentEdit.content} onChange={() => setCommentEdit(prev => ({
                                        ...prev,
                                        content:event.target.value
                                    }))}/>
                                </div>
                                <button type="submit" className="bg-[#333] rounded p-1 px-2 text-sm text-white uppercase">update</button>
                            </form>

                            :<p className="text-gray-700">{comment.content}</p>
                        }
                        { currentUser && currentUser.$id === comment.userId &&
                            <div className="flex items-center mt-2">
                                <button onClick={() => deleteComment(comment.$id)} className="hover:text-red-600 mr-2">
                                    <IoTrashOutline size={15}/>
                                </button>
                                <button 
                                    onClick={() => setCommentEdit({
                                        status: true,
                                        id: comment.$id,
                                        content:comment.content
                                    })}
                                    className="hover:text-green-400 mr-2">
                                    <CiEdit size={18}/>
                                </button>
                            </div>
                        }
                    </div>
                ))
                }
            </div>
        </>
    ) : <Loader />
}