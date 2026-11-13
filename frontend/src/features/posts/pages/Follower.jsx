import React from 'react'
import '../style/follow.scss'
import { usePost } from '../hooks/usePost'
import { useEffect } from 'react';
const Follower = ({handelFollow}) => {
    
  return (

    <div className="follower-conatiner">
        <h2>Follower</h2>
        <div className="single-user">
            <div className="img-wrapper">
                 <img src='https://plus.unsplash.com/premium_photo-1792478411583-a6d16411c976?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'></img>

            </div>
           
            <p>Username</p>

        </div>
    </div>


  )
}

export default Follower
