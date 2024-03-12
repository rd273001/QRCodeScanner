import React from 'react';
import { View, Modal, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Styles, Colors, Fonts } from '../utils/CommonStyles';
import { LinearGradient } from './LinearGradient';

const { height, width } = Dimensions.get( 'window' );

const LoadingIndicator = ( { visible } ) => {
  return (
    <Modal visible={ visible } transparent>
      <View style={ styles.modalView }>
        <LinearGradient style={ styles.loadingContainer }>
          <ActivityIndicator size={ Fonts.extraLarge } color={ Colors.primaryColor4 } />
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create( {
  modalView: {
    ...Styles.flexRowCenter,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingContainer: {
    width: width * 0.24,
    height: width * 0.24,
    borderRadius: width,
    justifyContent: 'center',
  },
} );

export default LoadingIndicator;