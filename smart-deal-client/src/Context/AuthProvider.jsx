import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, } from 'firebase/auth';
import { auth } from '../firebase.init';




const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // create user or signUp
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth ,email, password);
    } 


    // login or signin
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    // Google Signin
    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }


    // logout or signout
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }


    // observer user
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return()=>{
            unsubscribe();
        }
    }, [])


    const authInfo = {
        createUser,
        signInUser,
        googleSignIn,
        signOutUser,
        user,
        setUser,
        loading,
    }

    return (
        <div>
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;







// import React, { useEffect, useState } from 'react';
// import { AuthContext } from './AuthContext';
// import { 
//   createUserWithEmailAndPassword, 
//   GoogleAuthProvider, 
//   onAuthStateChanged, 
//   signInWithEmailAndPassword, 
//   signInWithPopup 
// } from 'firebase/auth';
// import { auth } from '../firebase.init';

// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signInUser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const googleSignIn = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const authInfo = {
//     createUser,
//     signInUser,
//     googleSignIn,
//     user,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
