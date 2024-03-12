import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Router from './src/route_stacks/Router';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/contexts/AuthProvider';

const App = () => {

  useEffect( () => {
    SplashScreen.hide();
  }, [] );

  return (
    <AuthProvider>
      <Router />
      <Toast />
    </AuthProvider>
  );
};

export default App;