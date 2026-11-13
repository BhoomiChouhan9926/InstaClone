import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { getFeed ,createPost , likePost,unLikePost,follower } from "../service/post.api";



export const usePost = ()=>{
   const context = useContext(PostContext);
   const{loading,setLoading,post,setPost,feed,setFeed}  = context

   const handelGetFeed = async ()=>{
      setLoading(true)
      const data = await getFeed()
      setFeed(data.posts)
      setLoading(false)
   }
   const handelCreatePost = async(imageFile,caption) =>{
      setLoading(true)
      const data = await createPost(imageFile,caption)
      setFeed([data.post,...feed])
      setLoading(false)

   }

   const handelLike = async (postId)=>{
      
      const data = await likePost(postId)
       console.log("triged")
      await handelGetFeed()
   }
     const handelUnLike = async (postId)=>{
      
      const data = await unLikePost(postId)
      console.log("triged")
      await handelGetFeed()
   }

   const handelFollow = async (username)=>{
      const data = await follower(username)
      console.log(data)
   }

   useEffect(()=>{
      handelGetFeed()
   },[])


   return {loading , feed,post,handelGetFeed,handelCreatePost,handelLike,handelUnLike,handelFollow}
}