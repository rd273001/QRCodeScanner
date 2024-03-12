import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../utils/CommonStyles';

const CustomLinearGradient = ( props ) => {
  return (
    <LinearGradient
      start={ { x: 0, y: 0.5 } }
      end={ { x: 1, y: 0.5 } }
      colors={ [Colors.primaryColor1, Colors.primaryColor3] }
      { ...props }
    >
      { props.children }
    </LinearGradient>
  );
};

export { CustomLinearGradient as LinearGradient };