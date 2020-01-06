import React, { useEffect } from 'react';
const MainPage = (props) => {
    useEffect(() => {
        console.log(props);
        props.history.push('/')
    }, []);
   
    return ( 
    
        <React.Fragment>
            
            <h1>Hello Welcome to HomePage</h1>
        </React.Fragment>
        
     );
}

export default MainPage;