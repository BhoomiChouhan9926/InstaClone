import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/components/Nav'
import Follower from './Follower'

const Feed = () => {
  const {loading , feed,handelGetFeed,handelLike,handelUnLike,handelFollow} = usePost();

  useEffect(()=>{
    handelGetFeed()
  },[])

  if(loading || !feed){
    return (
      <main>
        <h1>Feed is loading</h1>
      </main>
    )
  }
  console.log(feed)
  return (
 <main className='feed-page'>
 <Nav/>
 <div className="feed-follow">
 <Follower handelFollow ={handelFollow} />
   <div className="feed">
        <div className="posts">
          {feed.map((post)=>{
             return <Post key={post._id} user={post.user} post={post} loading = {loading}  handelLike={handelLike}  handelUnLike={handelUnLike}/>
          })}   
        </div>
    </div>

 </div>
   

 </main>

  )
}

export default Feed
