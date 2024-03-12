import { Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get( 'window' );

const Styles = StyleSheet.create( {
  flexRowCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
} );

const Colors = {
  primaryBackgroundColor1: '#F5F5F5',
  primaryBackgroundColor2: '#DBD1FF',
  primaryColor1: '#491389',
  primaryColor2: '#6211C8',
  primaryColor3: '#742DDD',
  primaryColor4: '#C2A9FA',
  primaryBlack: '#333333',
  secondaryBlack: '#000',
  primaryWhite: '#FFFFFF'
};

const Fonts = {
  small: width * 0.04,
  medium: width * 0.06,
  large: width * 0.07,
  extraLarge: width * 0.14,
}

export { Styles, Colors, Fonts };