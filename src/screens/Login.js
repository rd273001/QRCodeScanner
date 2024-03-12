import React, { useRef, useState } from 'react';
import { StyleSheet, Dimensions, Image, ScrollView, View } from 'react-native'
import { Input, Button, Text } from '@rneui/themed';
import PhoneInput from 'react-native-phone-number-input';
import { Colors, Fonts } from '../utils/CommonStyles';
import LoadingIndicator from '../components/LoadingIndicator';
import { LinearGradient } from '../components/LinearGradient';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { useAuth } from '../contexts/AuthProvider';

const { width, height } = Dimensions.get( 'window' );

const Login = ( { navigation } ) => {
  const [credentials, setCredentials] = useState( {
    phoneNum: '',
    formattedPhoneNum: '',
    otp: ''
  } );
  const [showOtpInput, setShowOtpInput] = useState( false );
  const inputRefs = useRef( {
    phoneNum: null,
    otp: null,
  } );
  const [loading, setLoading] = useState( false );
  const { onAuth } = useAuth();

  // destructured credentials and error objects
  const { phoneNum, formattedPhoneNum, otp } = credentials;

  const handleInputChange = ( key, value ) => {
    setCredentials( prev => ( { ...prev, [key]: value } ) );
  };

  const toastAlert = ( type, text1, props ) => {
    Toast.show( { type, text1, ...props } );
  };

  const handleErrorMessage = ( error ) => {
    // Validate email
    if ( error.code === 'auth/invalid-phone-number' ) {
      toastAlert( 'error', 'Phone no. is invalid! Please enter valid phone no.' );
    }
    // Account disabled/blocked temporarily due to trying to login multiple times with wrong crdentials
    else if ( error.code === 'auth/invalid-verification-code' ) {
      toastAlert( 'error', 'Invalid code! Please enter correct verification code.' );
    }
    // validation for different errors
    else if ( error.code !== '' ) {
      toastAlert( 'error', 'Error occurred! Please try again...' );
      console.log( 'Error : ', error.message );
    }
  };

  const handleLogin = async () => {
    try {
      const phoneNumString = String( phoneNum ).trim();
      const otpSring = String( otp ).trim();
      if ( phoneNumString === '' ) {
        phoneNumString === '' && toastAlert( 'error', 'Please enter the correct Phone number!' );
        return;
      }
      setLoading( true );
      const confirmation = await auth().signInWithPhoneNumber( formattedPhoneNum, true );
      setShowOtpInput( true );
      const confirm = confirmation && otpSring !== '' && auth.PhoneAuthProvider.credential( confirmation.verificationId, otp );
      if ( !confirm )
        return;
      console.log( 'Secret from CONFIRM => ', confirm );
      const verify = await confirmation.confirm( confirm.secret );
      if ( !verify )
        return;
      console.log( 'Logged in => ', verify.user.phoneNumber, '  Name => ', verify.user.displayName, '  UID => ', verify.user.uid );
      toastAlert( 'success', 'Logged in successfully.' );
      // Navigating to Details screen only if user details are not filled
      if ( verify.user.phoneNumber && ( !verify.user.displayName ) ) {
        navigation.navigate( 'Details', { uid: verify.user.uid } );
        return;
      }
      // Updating auth state using context to login & navigate to HomeStack
      onAuth( verify.user.uid );
    } catch ( err ) {
      console.log( err );
      handleErrorMessage( err );
    }
    finally {
      setLoading( false );
    }
  };

  return (
    <ScrollView>
      <LinearGradient style={ styles.container } colors={ [Colors.primaryColor4, Colors.primaryBackgroundColor1] } useAngle>

        <View style={ styles.appLogoContainer }>
          <Text style={ styles.appLogoTxt }>QRCodeScanner</Text>
          <Image source={ require( '../assets/app_logo.jpg' ) } style={ styles.appLogo } />
        </View>
        
        <PhoneInput
          ref={ ref => inputRefs.current.phoneNum = ref }
          defaultValue={ phoneNum }
          defaultCode='IN'
          layout='first'
          onChangeText={ phoneNum => handleInputChange( 'phoneNum', phoneNum ) }
          onChangeFormattedText={ formattedPhoneNum => handleInputChange( 'formattedPhoneNum', formattedPhoneNum ) }
          countryPickerButtonStyle={ styles.countryPicker }
          codeTextStyle={ styles.codeTxt }
          textInputStyle={ styles.textInput }
          containerStyle={ styles.containerStyle }
          textContainerStyle={ styles.textContainerStyle }
        />

        {
          showOtpInput &&
          <Input
            value={ otp }
            onChangeText={ otp => handleInputChange( 'otp', otp ) }
            ref={ ref => inputRefs.current.otp = ref }
            placeholder='Enter OTP received'
            label='OTP'
            labelStyle={ { color: Colors.primaryBlack } }
            containerStyle={ { marginBottom: height * 0.04, width: '98%' } }
            leftIcon={ { type: 'material-community', name: 'lock', color: Colors.primaryBlack } }
          />
        }

        <Button
          title={ !showOtpInput ? 'LOG IN' : 'Confirm' }
          onPress={ handleLogin }
          ViewComponent={ LinearGradient }
          linearGradientProps={ { colors: [Colors.primaryColor1, Colors.primaryColor3] } }
          radius='md'
          buttonStyle={ styles.loginBtn }
          icon={ {
            name: 'login',
            type: 'material-community',
            color: Colors.primaryWhite,
          } }
        />

        <LoadingIndicator visible={ loading } />

      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  container: {
    minHeight: height,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.03,
  },
  appLogoContainer: {
    position: 'absolute',
    top: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: width * 0.13,
    marginBottom: height * 0.07
  },
  appLogoTxt: {
    color: Colors.primaryColor1,
    fontSize: Fonts.large+5,
    marginRight: width * 0.015,
    fontWeight: 'bold'
  },
  appLogo: {
    width: width * 0.13,
    resizeMode: 'cover',
    aspectRatio: 1,
    borderRadius: width
  },
  containerStyle: {
    height: height * 0.07,
    width: '98%',
    borderRadius: width * 0.5,
    borderWidth: width * 0.008,
    borderColor: Colors.primaryColor3,
    marginBottom: height * 0.05
  },
  countryPicker: {
    height: height * 0.06,
    alignSelf: 'center',
    borderTopLeftRadius: width,
    borderBottomLeftRadius: width
  },
  codeTxt: {
    height: height * 0.06,
    textAlignVertical: 'center',
    fontSize: width * 0.047
  },
  textInput: {
    height: height * 0.06,
    marginLeft: -5,
    fontSize: width * 0.04,
    textAlignVertical: 'center'
  },
  textContainerStyle: {
    borderTopRightRadius: width,
    borderBottomRightRadius: width
  },
  loginBtn: {
    width: width * 0.7,
    marginTop: height * 0.03,
    paddingVertical: height * 0.012,
    marginBottom: height * 0.03
  },
  btnText: {
    color: Colors.primaryColor2,
    textDecorationLine: 'underline'
  }
} );

export default Login;