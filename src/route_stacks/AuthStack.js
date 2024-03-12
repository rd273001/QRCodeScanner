import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Details from '../screens/Details';

const Stack = createStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator screenOptions={ { headerShown: false } }>
      <Stack.Screen name='Login' component={ Login } />
      <Stack.Screen name='Details' component={ Details } />
    </Stack.Navigator>
  );
};

export default AuthStack;