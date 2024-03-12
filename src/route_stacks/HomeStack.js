import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Home from '../screens/Home';
import { Colors, Fonts } from '../utils/CommonStyles';
import { Dimensions } from 'react-native';
import { Icon } from '@rneui/themed';
import { useAuth } from '../contexts/AuthProvider';

const Stack = createStackNavigator();
const { height, width } = Dimensions.get( 'window' );

const HomeStack = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  return (
    <Stack.Navigator screenOptions={ { headerStyle: { backgroundColor: Colors.primaryColor2 }, headerShadowVisible: false } }>
      <Stack.Screen
        name='Home'
        component={ Home }
        options={ {
          title: 'QRCodeScanner',
          headerTintColor: Colors.primaryWhite,
          headerRight: () => (
            <Icon
              name='logout'
              type='material-community'
              onPress={ logout }
              size={ Fonts.medium }
              color={ Colors.primaryWhite }
              style={ { marginRight: width * 0.015, padding: width * 0.012 } }
            /> ),
          headerTitleStyle: { fontSize: Fonts.medium, textShadowColor: `${ Colors.primaryColor4 }`, textShadowRadius: 7, textShadowOffset: { height: 2, width: 2 } }
        } } />
    </Stack.Navigator>
  );
};

export default HomeStack;