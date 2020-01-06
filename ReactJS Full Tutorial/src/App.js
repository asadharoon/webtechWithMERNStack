import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Switch,Route, Link, Redirect} from 'react-router-dom';
import DefComponent from './DefComponent';
import ProductsList from './components/ProductsList';
import MainPage from './components/MainPage';
import RouteParams from './components/RouteinProps';
import Login from './components/PropsChild';
import Admin from './components/Admin';
import LoginForm from './components/FormLogin';
import GetRequest from './components/GetAxios';
import PostAxios from './components/PostAxios';

function App() {
  return (
    <Router>
      <div className="App">
        
        <div className="bars">
            <ul>
            <Link to="/"> <li>Home</li></Link>
            <Link to="/products"><li>Products</li></Link>
            <Link to="/products/new"><li>Products New </li></Link>
            <Link to='/def'><li>Def Component Child props</li></Link>
            <Link to='/form'><li>React Forms</li></Link>
            <Link to='/getReq'><li>React AXIOS GET</li></Link>
            <Link to='/postReq'><li>React AXIOS POST</li></Link>
            </ul>
        </div>
        <Switch>
          <Route path='/postReq' component={PostAxios}></Route>
          <Route path='/getReq' component={GetRequest}></Route>
        <Route path='/def' component={DefComponent}></Route>
         <Route path='/form' component={LoginForm} ></Route>
          <Route path="/products/new" component={newproducts}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/redirect'><Redirect to='/'></Redirect></Route>
          <Route path="/products" component={ProductsList}></Route>
          <Route path='/p/:id' render={(props)=><RouteParams value={props.match.params.id}></RouteParams>}></Route>
          <Route path="/"   component={MainPage}></Route>
          
        </Switch>
      </div>
      </Router>
  );
}
function newproducts() {
  return <h1>Welcome in New products</h1>
}
function another() {
  return <h1>Another function dummy in / route.</h1>
}
function notfound() {
  return <h1>Not Found</h1>
}
function admin() {
  
  return <h1>Welcome Admin</h1>
}
export default App;
