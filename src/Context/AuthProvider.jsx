import React, { Children, useEffect, useState } from 'react';
import {firebaseAuth} from '../Config/firebase';

export const AuthContext = React.createContext();

export function AuthProvider({children}){

    const [user,setuser] = useState(null);

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
        firebaseAuth.onAuthStateChanged(user => {
            console.log(user);
            setuser(user);
        })
    } , [])

    let value = {
        user : user,
        login : login,
        signin : signin,
        signout : signout
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}