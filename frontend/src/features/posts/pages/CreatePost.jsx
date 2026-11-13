import React, { useState,useRef } from 'react'
import '../style/createpost.scss'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'


const CreatePost = () => {

    const navigate  = useNavigate()

    const {loading , handelCreatePost} = usePost();

    const [caption , setCaption] = useState("")
    // to perform 2 way binding in  file input field we have to use useRef 
    const postImageInputFieldRef = useRef(null);

 async function handelSubmit (e){
    e.preventDefault();
    // postImageInputFieldRef mai se aapni file ko nikal ne k liye 
    const file = postImageInputFieldRef.current.files[0]

    await handelCreatePost(file,caption)

   navigate('/')

  
 }
   if(loading){
        return (
            <main>
                <h2>loading...</h2>
            </main>
        )
    }
  return (
   <main className='create-post-page'>
    <div className="form-container">
        <h2>Create post</h2>
        <form onSubmit={handelSubmit}>
            <label className='post-image-label' htmlFor="postImage">Select post Image</label>
              <input ref={postImageInputFieldRef} type="file"  hidden name='postImage' id='postImage'/>
              <input
              value={caption}
              onInput={(e)=>{setCaption(e.target.value)}}
               type="text" 
               placeholder='Enetr Caption'
                name='caption'  id='caption' />
              <button className='button primary-button'> Create</button>
        </form>
    </div>
   </main>
  )
}

export default CreatePost
