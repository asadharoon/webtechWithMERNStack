import React from 'react';

const LoginForm = (props) => {
    return ( 
        <div>
            <form>
                <div className="form-group"><label htmlFor="">Username</label><input type="text" className="form-control"/></div>
                <div className="form-group"><label htmlFor="">Password</label><input type="text" className="form-control"/></div>
                <button className='btn btn-primary'>Click Me</button>
            </form>
        </div>
     );
}
 
export default LoginForm;