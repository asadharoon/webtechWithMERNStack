// import all actions as actions
import * as actions from '../actions/all_actions';
const initialState = 0;
const counterReducer = (state = 0, action,error)=>{
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            {
                return state - 1;
            }
       
        default:
            return state;
    }
}
export default counterReducer;
