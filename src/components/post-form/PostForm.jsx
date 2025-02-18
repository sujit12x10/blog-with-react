import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index"
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";

export const PostForm = ({post}) => {
    const [loading, setLoading] = useState(true)
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)


    useEffect(() => {
        authService.getCurrentUser()
        .then(data => setUser(data))
        .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (post){
            const array = ["title", "slug", "content", "status"]
            array.map((value) => setValue(value, post[value]))
        }
    }, [post])


    const handleChange = (event) => {
        const {name, value, type, checked} = event.target
        setPostDetail((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const submit = async(data) => {
        // Updating Post
        
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            
            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }

            data.slug = slugTransform(data.title)
            const dbPost = await appwriteService.updatePost(
                post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                },
            )
            
            if (dbPost){
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            // Creating Post        
            const file = await appwriteService.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                data.slug = slugTransform(data.title)
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: user.$id,
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    // Generating Slug
    const slugTransform = useCallback((value) => {
        if (value) {
            value = value.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
            value = value.toLowerCase(); // convert string to lowercase
            value = value.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-'); // remove consecutive hyphens
            return value;
        }
    }, [])


    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title, {shouldValidate: true}))
            }
        })

        return () => subscription.unsubscribe()

    }, [watch, slugTransform, setValue])

  
    return (
        <form onSubmit={handleSubmit(submit)} className="px-10">
            {/* Content Section */}
            <div className="">
                {/* Post title */}
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                {/* Post content */}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* Image Section */}
            <div className="">
                {/* Post Featured Image */}
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full"
                        />
                    </div>
                )}
                {/* Post status */}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <button type="submit" className="w-full mt-4 text-white py-2 bg-[#333] rounded uppercase">
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    )
}