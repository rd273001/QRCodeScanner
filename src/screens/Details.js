import React, { useRef, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import { Colors, Styles } from '../utils/CommonStyles';
import LoadingIndicator from '../components/LoadingIndicator';
import { LinearGradient } from '../components/LinearGradient';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../contexts/AuthProvider';

const { height, width } = Dimensions.get( 'window' );

const Details = ( props ) => {
    const uid = props.route.params.uid;
    const [userData, setUserData] = useState( {
        name: '',
        email: '',
    } );
    const [error, setError] = useState( {
        nameError: '',
        emailError: '',
    } );
    const inputRefs = useRef( {
        name: null,
        email: null,
    } );
    const [loading, setLoading] = useState( false );
    const { saveDataToStorage, onAuth } = useAuth();

    // destructuring userData and error objects
    const { name, email } = userData;
    const { nameError, emailError } = error;

    const toastAlert = ( type, text1, props ) => {
        Toast.show( { type, text1, ...props } );
    };

    const handleInputChange = ( key, value ) => {
        setUserData( prev => ( { ...prev, [key]: value } ) );
    };

    const handleInputValidation = () => {
        if ( !isNameValid( name ) ) {
            inputRefs.current.name.shake();
            setError( prev => ( { ...prev, nameError: 'Please enter your name!' } ) );
        } else {
            setError( prev => ( { ...prev, nameError: '' } ) );
        }
        if ( !isEmailValid( email ) ) {
            inputRefs.current.email.shake();
            setError( prev => ( { ...prev, emailError: 'Please enter correct email address!' } ) );
            return false;
        } else {
            setError( prev => ( { ...prev, emailError: '' } ) );
        }
        return true;
    };

    const isNameValid = ( name ) => {
        return String( name ).trim() !== '';
    };
    const isEmailValid = ( email ) => {
        return /\S+@\S+\.\S+/.test( email );
    };

    const handleSubmit = () => {
        if ( !handleInputValidation() )
            return;

        setLoading( true );
        auth().currentUser.updateProfile( { displayName: name } )
            .then( () => {
                toastAlert( 'success', 'Profile details updated successfully.' );
                // navigating directly to Main screen after Registering or we can also redirect to login screen after Signup & then login
                console.log( 'User details updated.  Name = ', auth().currentUser.displayName, '  Phone No. = ', auth().currentUser.phoneNumber );
                // Navigate to Home screen by updating userAuth state through saveDataToStorage(uid, data) from Context's state...
                onAuth( uid );
                saveDataToStorage( uid, { name, email } );
            } )
            .catch( ( error ) => {
                Toast.show( { text1: 'Error occurred!', text2: error.message, type: 'error' } );
                console.log( error );
            } ).finally( () => {
                setLoading( false );
            } );
    };

    return (
        <ScrollView style={ { flexGrow: 1 } }>
            <LinearGradient style={ styles.container } colors={ [Colors.primaryColor4, Colors.primaryBackgroundColor1] } useAngle>

                <Text h2 style={ { marginBottom: height * 0.07, color: Colors.primaryColor1 } }>Details</Text>

                <Input
                    value={ name }
                    onChangeText={ name => handleInputChange( 'name', name ) }
                    errorMessage={ nameError }
                    ref={ ref => inputRefs.current.name = ref }
                    placeholder='Enter your name'
                    containerStyle={ { marginBottom: height * 0.01 } }
                    label='Name'
                    labelStyle={ { color: Colors.primaryBlack } }
                    leftIcon={ { type: 'material-community', name: 'account', color: Colors.primaryBlack } }
                />
                <Input
                    value={ email }
                    onChangeText={ email => handleInputChange( 'email', email ) }
                    errorMessage={ emailError }
                    ref={ ref => inputRefs.current.email = ref }
                    placeholder='Enter your email'
                    containerStyle={ { marginBottom: height * 0.01 } }
                    label='Email'
                    labelStyle={ { color: Colors.primaryBlack } }
                    leftIcon={ { type: 'material-community', name: 'email', color: Colors.primaryBlack } }
                />

                <Button
                    title='Submit'
                    onPress={ handleSubmit }
                    ViewComponent={ LinearGradient }
                    linearGradientProps={ { colors: [Colors.primaryColor1, Colors.primaryColor3] } }
                    radius='md'
                    buttonStyle={ styles.submitBtn }
                />

                <LoadingIndicator visible={ loading } />
            
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create( {
    container: {
        ...Styles.flexRowCenter,
        minHeight: height,
        padding: width * 0.03,
    },
    containerStyle: {
        height: height * 0.085,
        borderRadius: width * 0.5,
        borderWidth: width * 0.01,
        borderColor: '#bbb',
    },
    textContainerStyle: {
        paddingTop: 1,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        paddingBottom: 1,
    },
    submitBtn: {
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

export default Details;