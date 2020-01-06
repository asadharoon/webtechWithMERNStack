import React, { Component } from 'react';
// const RouteParams = (props) => {
//     const [a, setA] = React.useState(props.value);
//     const [counter, setCounter] = React.useState(0);

//     return ( 
//         <div>
        
//         </div>
//      );
// }
 
// export default RouteParams;

// class RouteParams extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {  
//             a: props.value,
//             list:[]
//         }
//         var i = 0;    
//     }
    
    
//     render() { 
//         return (
//             <div>
//                 {this.abc}
//                 <ul>
//                 {lists.map((li,index) =>
//                     <li key={index}>{li.name}</li>
//                 )}
//                     </ul>
                    
               
//            </div>
//        )
        
//     }
//     abc=()=> {
//         var i = [];
//         for (var j = 0; j < this.state.a; j++){
//             i.push(j);
//         }
//         this.setState({ list: i });
//         console.log("list is " + this.state.list);
//     }

// }
 
// export default RouteParams;
const RouteParams = (props) => {
    const a = props.value;
    var i = [];
    // const a = props.value;
    return (
        <div>
            {console.log(a)}
            {ac()}
            {
                i.map((li, index) =>
                    <li key={index}>{li}</li>
                )
            }
        </div>

    );
    function ac() {
        for (var j = 0; j < a; j++){
            i.push(j);
        }
    }
   
}

 
export default RouteParams;