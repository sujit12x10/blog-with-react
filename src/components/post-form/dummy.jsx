import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index"
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PostForm = ({post}) => {

    const [postDetail, setPostDetail] = useState({})
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async(data) => {
        // Updating Post
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
            
            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }

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
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
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
                    value={post && post.title}
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                {/* Post slug */}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    value={post && post.slug}
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
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
                <Button type="submit" bgColor={post ? "bg-gray-800" : undefined} className="w-full mt-4 text-white py-2">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

// content: "<p>Hello <strong>Guys post</strong>!</p>"
// featuredImage: "673efd7000353d34f61a"
// image: FileList {0: File, length: 1}
// slug: "hello-guys"
// status: "active"
// title: "Hello Guys"