import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import './App.css';
import Login from "./Components/Login";
import Feeds from "./Components/Feeds";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import React, { useContext ,useState ,useEffect} from "react";
import {firebaseAuth} from './Config/firebase';

export const AuthContext = React.createContext();

export function App() {

  let [user,setuser] = useState(null);

  let [users,su] = useState([]);
  function login(email,pass){
      return firebaseAuth.signInWithEmailAndPassword(email,pass);
  }

  function signout(){
      return firebaseAuth.signOut();
  }

  function signin(email,pass){
      return firebaseAuth.createUserWithEmailAndPassword(email,pass);
  }

  useEffect(()=>{
    firebaseAuth.onAuthStateChanged(user1 => {
        
        setuser(user1);
        
      })
  } , [user])

  let value = {
    user : user,
    login : login,
    signin : signin,
    signout : signout
  }
  return (
    <AuthContext.Provider value={value}>
      <Router>
          <Switch>
            <Route path="/login" exact render={props=>{ return <Login user={user} {...props} />}}>
            </Route>
            <Route path="/signup" component={Signup} exact></Route>
            <Route path="/profile" component={Profile} exact></Route>
            <PrivateRoute path="/" comp={Feeds} user={user} ></PrivateRoute>
            {/* <PrivateRoute path="/profile" comp={Profile} user={user}></PrivateRoute> */}
            
          </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

function PrivateRoute(props){
  let {comp , path,user} = props;
  
  // console.log(props);
  return user ? <Route path={path} component={comp} exact></Route> : <Redirect to="/login"></Redirect>
}

export default App;
