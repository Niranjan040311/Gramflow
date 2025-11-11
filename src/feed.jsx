import React from 'react'
import Posts from './Posts';
import Stories from './Stories';
function Feed()
{
    return(
        <div>
            <div ><Stories/></div>
           <div><Posts/></div>
        </div>
    )

}
export default Feed;