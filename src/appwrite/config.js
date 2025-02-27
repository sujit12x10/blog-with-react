import conf from "../conf/conf"; // appwrite config keys
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

class AppwriteService {
    client = new Client()
    databases
    bucket

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // Create Post
    async createPost({title, category, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                { title, category, slug, content, featuredImage, status, userId }
            )
        } catch (error){
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    // Update Post
    async updatePost(id, { title, category, slug, content, featuredImage, status }){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id, // Document Id
                { title, category, slug, content, featuredImage, status}
            )
        } catch (error){
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // Delete Post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error){
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    // Get Single Post
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error){
            console.log("Appwrite service :: getPost :: error", error)
            return false
        }
    }

    // Get All Posts
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error){
            console.log("Appwrite service :: getPosts :: error", error)
            return false
        }
    }

    // File Services
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error){
            console.log("Appwrite service :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(file){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                file
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error){
            return "Appwrite service :: getFilePreview :: error", error
        }
    }

    // Get Comment
    async getComments(postId){
        const queries = [Query.equal("postId", postId)]
        
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                queries
            )
        } catch (error){
            console.log("Appwrite service :: getComments :: error", error)
            return false
        }
    }

    // Create Comment
    async createComment({postId, userId, content}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                ID.unique(),
                {postId, userId, content}
            )
        } catch (error){
            console.log("Appwrite service :: createComment :: error", error)
        }
    }

    // Update Comment
    async updateComment(id, content){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                id, // Documnet Id
                {content}
            )
        } catch (error){
            console.log("Appwrite service :: updateComment :: error", error)
        }
    }

    // Delete Comments
    async deleteComment(documentId){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                documentId
            )
        } catch (error){
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }
}

const appwriteService = new AppwriteService()
export default appwriteService