
import React, { Component } from 'react';
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                {console.log(this.props.children)}
                <h1>This is admin page</h1>
            </div>
         );
    }
}
 
export default Admin;
// const Admin = (props) => {
    
    
// }
 
// export default Admin;