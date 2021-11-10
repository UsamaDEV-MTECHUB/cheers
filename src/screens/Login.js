import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, ActivityIndicator} from 'react-native';
import colors from '../assets//constants/colors';
import styleSheet from '../assets/constants/styleSheet';
import ButtonComp from '../component/ButtonComp';
import InputComp from '../component/InputComp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AccountFooter from '../component/AccountFooter';
import LogoContainer from '../component/LogoContainer';
import {useFetch} from '../hooks';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';

const baseUrl = 'https://secure-shelf-42764.herokuapp.com/auth/login/user';

const Login = props => {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setpasswordError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    axios
      .post(baseUrl, {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data.error) {
          setError(response.data.error);
          setLoading(false);
          console.log('Response Error is:', response.data);
        } else {
          setData(response.data);
          login();
          setLoading(false);
          console.log('Response Data is:', response.data);
        }
      })
      .catch(function (error) {
        console.log('Error is:', error);
        setError(error);
        setLoading(false);
      });
  };

  function validateEmail(value) {
    if (value.length == 0) setEmailError('Email required');
    else if (!(value.includes('@') && value.includes('.com')))
      setEmailError('Invalid Email');
    else {
      setEmailError(null);
      setEmail(value);
    }
  }
  function validatePassword(value) {
    if (value.length == 0) setpasswordError('Password required');
    else {
      setpasswordError(null);
      setPassword(value);
    }
  }

  const Login = () => {
    fetchData();
    data
      ? props.navigation.navigate('BottomNavigation')
      : console.log('No data Available', error);
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          padding: 20,
          alignItems: 'center',
        }}>
        <LogoContainer />
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
          }}>
          <Text style={styleSheet.heading}>Hello</Text>
          <Text style={{color: 'grey', fontSize: 17}}>
            Please login to your account
          </Text>

          <InputComp
            label="Email Address"
            icon="envelope"
            keyboardType="email-address"
            error={emailError}
            onChangeText={value => validateEmail(value)}
          />

          <InputComp
            label="Password"
            secureTextEntry={true}
            isPassword={true}
            icon="eye"
            error={passwordError}
            onChangeText={value => validatePassword(value)}
          />

          <View
            style={{marginBottom: 30, width: '100%', alignItems: 'flex-end'}}>
            <Text style={{color: colors.primary}}>Forgot Password?</Text>
            {error ? (
              <Text style={{color: '#FF002E', marginTop: 10}}>{error}</Text>
            ) : null}
          </View>

          <ButtonComp
            title="LOGIN"
            type="circle"
            loading={loading}
            onPress={() => Login()}
          />

          <View
            style={{
              marginTop: 30,
              marginBottom: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <Text style={{marginBottom: 15, fontSize: 14, fontWeight: '700'}}>
              Or Login using social media
            </Text>
            <Icon name="google" color={colors.primary} size={30} />
          </View>
        </View>

        <AccountFooter
          isLoginScreen={true}
          onPress={() => props.navigation.navigate('Signup')}
        />
      </View>
    </ScrollView>
  );
};

export default Login;
