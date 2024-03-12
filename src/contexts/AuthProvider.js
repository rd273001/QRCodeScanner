import React, { createContext, useState, useContext, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';

const storage = new MMKV();
const AuthContext = createContext();

const AuthProvider = ( { children } ) => {
  const [userAuth, setUserAuth] = useState( null );   // accessible through the App by using useAuth()

  useEffect( () => {
    // get the data from  Storage
    let storedAuth = storage.getString( `chatapp_user_id` );
    console.log( 'Stored Local User Auth  => ', storedAuth );
    if ( !storedAuth )
      return;
    storedAuth = JSON.parse( storedAuth );
    // If data exists already then update the authData state
    setUserAuth( { uid: storedAuth } );
    let storedData = storage.getString( `${ storedAuth }-data` );
    if ( !storedData )
      return;
    storedData = JSON.parse( storedData );
    console.log( 'Stored Local User Data  => ', storedData );
    setUserAuth( { uid: storedAuth, data: storedData } );
  }, [] );

  const onAuth = ( uid ) => {
    setUserAuth( prev => ( { ...prev, uid } ) );
    console.log( 'onAuth() => Storing UID => ', uid );
    storage.set( `chatapp_user_id`, JSON.stringify( uid ) );
  };

  const logout = () => {
    auth().signOut();
    Toast.show( { text1: 'Logged out', type: 'info' } );
    // Removing the data from mmkv storage so that it would not be retrieved when App restarts & get authenticated
    storage.delete( `chatapp_user_id` );
    // Remove data from context so that App can be notified & send user to AuthStack(Login/Singup)
    setUserAuth( null );
  };

  const saveDataToStorage = ( uid, data ) => {
    setUserAuth( prev => ( { ...prev, data } ) );
    console.log( 'saveDataToStorage() => Saving User Data => ', data, '  UID passed => ', uid );
    storage.set( `${ uid }-data`, JSON.stringify( data ) );
  };

  return (
    // all components will have access to the Context
    <AuthContext.Provider value={ { userAuth, onAuth, logout, saveDataToStorage } }>
      { children }
    </AuthContext.Provider>
  );
};

// custom hook to provide access to AuthContext & permit components to subscribe to AuthContext updates
const useAuth = () => {
  const context = useContext( AuthContext );
  if ( !context ) {
    throw new Error( 'useAuth must be used within an AuthProvider!' );
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };