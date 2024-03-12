import React, { useCallback, useState } from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { Icon } from '@rneui/themed';
import { Colors, Fonts } from '../utils/CommonStyles';

const { width, height } = Dimensions.get( 'window' );

const Home = ( { navigation } ) => {

  return (
      
    <Text style={ { textAlign: 'center' } }>
      HOME APP
    </Text>

  );
};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: Colors.primaryColor2
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: height * 0.01
  },
  tabLabel: {
    color: Colors.primaryWhite,
    fontSize: Fonts.small,
    fontWeight: 'bold'
  },
  indicatorStyle: {
    backgroundColor: Colors.primaryWhite,
    height: height * 0.003
  }
} );

export default Home;