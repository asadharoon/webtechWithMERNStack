import React from 'react';
const ProductsList = (props) => {
    const lists = [
        { name: 'Asad', age: 10 },
        { name: 'Asad', age: 10 },
        {name:'Asad',age:10}
    ]
    function handleClick() {
        
        props.history.replace('/');
    }
    const keys=[1,2,3,4]
    return ( 
       
        <div className="ProductsList">
        {console.log(props)}
            {console.log("hello its productslists")}
            <ul>
                {lists.map((li,index) =>
                    <li key={index}>{li.name}</li>
                )}
            </ul>
            <button onClick={handleClick}>Yes Click Me</button>
        </div>
     );
}
 
export default ProductsList;