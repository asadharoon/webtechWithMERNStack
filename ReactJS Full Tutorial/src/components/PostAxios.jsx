import React from 'react';
import axios from 'axios';
const PostAxios = (props) => {
    const [userId, setuserId] = React.useState(0);
    const [id, setid] = React.useState(0);
    const [title, settitle] = React.useState(0);
    const [body, setBody] = React.useState(null);
    const PostMethod = async () => {
        var i = { userId: userId, id: id, title: title, body: body };

        console.log(i);
        await axios.post('https://jsonplaceholder.typicode.com/posts', {userId,body,id,title}).then(
            console.log("successfully added")
        ).catch(err => console.log(err));
    };
    return ( 
        <div>
         
                <input name='userId' placeholder="Enter the name" onChange={e=>setuserId(e.target.value)}></input>
                <input name="body" placeholder="Enter the body" onChange={e => setBody(e.target.value)}></input>
                <input name="title" placeholder="Enter the title" onChange={e => settitle(e.target.value)}></input>
                <input name="id" placeholder="Enter the id" onChange={e=>setid(e.target.value)}></input>
                <button onClick={PostMethod}></button>
            
        </div>
     );
}
 
export default PostAxios;   