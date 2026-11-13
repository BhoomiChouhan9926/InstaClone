import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials :true
})

export async function getFeed(){
    const response = await api.get('/post/feed')
    return response.data
}

export async function createPost(imageFile , caption){
   const formData = new FormData();
   formData.append("imageUrl",imageFile)
   formData.append("caption",caption)
    //imageUrl
    const response = await api.post('/post',formData)
    return response.data


}

export async function likePost(postId) {
    const response = await  api.post('/post/like/'+postId)
    return response.data
    
}

export async function unLikePost(postId) {
    const response = await  api.post('/post/unlike/'+postId)
    return response.data
    
}

// here is the function to get followers
// /user/follow/username
export async function follower(username){
    const response = await api.post("/user/follow/" + username)
    return response.data
}