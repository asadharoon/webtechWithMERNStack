import React from 'react';
import axios from 'axios';
const GetRequest =props => {
    var [users, setUsers] = React.useState([]);
    var error;
    React.useEffect(() => {
        console.log("Mounted");
        params();
    },[]);
    const loadData = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(
            res => setUsers(res.data)
        ).catch(err => (error = err))
    }
    const params = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts/', {
            params: {
                userId: 1
            }
        }).then(res => setUsers(res.data));
    }
    return ( 
        <div className="getRequest">
            {console.log(users)}
            <ul>
                {users.map((li,index) =>
                    <li key={index}>{li.body}</li>
                )}
            </ul>
        </div>
     );
}
 
export default GetRequest;