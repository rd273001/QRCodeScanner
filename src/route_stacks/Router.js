import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '../route_stacks/AuthStack';
import HomeStack from './HomeStack';
import { useAuth } from '../contexts/AuthProvider';

const Router = () => {
  const { userAuth } = useAuth();
  console.log( 'Router userAuth => ', userAuth );

  return (
    <NavigationContainer>

      {/* if uid exists then user is authenticated */}
      { userAuth?.uid ? <HomeStack /> : <AuthStack /> }
      
    </NavigationContainer>
  );
};

export default Router;