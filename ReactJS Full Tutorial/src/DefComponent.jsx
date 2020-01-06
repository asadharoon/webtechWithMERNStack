import React, { Component } from 'react';
class DefComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        console.log(props);
    }
    
    render() { 
        return (
            
            <div>
                {console.log(this.props.children)}
                <h1>This is def component child props</h1>
            </div>
       )
    }
}
 
export default DefComponent;