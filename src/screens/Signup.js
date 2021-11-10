import React, {useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import colors from '../assets//constants/colors';
import styleSheet from '../assets/constants/styleSheet';
import ButtonComp from '../component/ButtonComp';
import InputComp from '../component/InputComp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AccountFooter from '../component/AccountFooter';
import LogoContainer from '../component/LogoContainer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePickerInput from '../component/DatePickerInput';
import {useAuth} from '../context/AuthContext';
import axios from 'axios';

const Signup = props => {
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [birthdateError, setbirthdateError] = useState(null);
  const [userIdError, setuserIdError] = useState(null);
  const [passwordError, setpasswordError] = useState(null);
  const [addressError, setaddressError] = useState(null);
  const [fullname, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userid, setuserid] = useState('');
  const [dob, setDOB] = useState('');
  const [address, setAddress] = useState('');
  const {login} = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = 'https://secure-shelf-42764.herokuapp.com/auth/register/user';

  const fetchData = async () => {
    setLoading(true);
    axios
      .post(baseUrl, {
        FullName: fullname,
        email: email,
        password: password,
        UserId: userid,
        DateOfBirth: '3/7/8',
        Address: address,
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
        setError('Fill Correct Information');
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
  function validateName(value) {
    if (value.length == 0) setNameError('Name required');
    else {
      setNameError(null);
      setFullName(value);
    }
  }
  function validateBirthdate(value) {
    if (value.length == 0) setbirthdateError('Birthdate required');
    else {
      setbirthdateError(null);
    }
  }
  function validateUserId(value) {
    if (value.length == 0) setuserIdError('Id required');
    else {
      setuserIdError(null);
      setuserid(value);
    }
  }
  function validateAddress(value) {
    if (value.length == 0) setaddressError('Address required');
    else {
      setaddressError(null);
      setAddress(value);
    }
  }

  const SignUp = () => {
    fetchData();
    data
      ? props.navigation.navigate('AccountCreated')
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
          <Text style={styleSheet.heading}>Welcome</Text>
          <Text style={{fontSize: 17, color: 'grey'}}>
            create your New account
          </Text>

          <InputComp
            label="Full Name"
            icon="user-alt"
            error={nameError}
            onChangeText={value => validateName(value)}
          />

          <InputComp
            label="Email Address"
            icon="envelope"
            keyboardType="email-address"
            error={emailError}
            onChangeText={value => validateEmail(value)}
          />

          <InputComp
            label="Password"
            isPassword={true}
            icon="eye"
            error={passwordError}
            onChangeText={value => validatePassword(value)}
          />

          <DatePickerInput
            label="Date of Birth"
            icon="calendar"
            error={birthdateError}
            onChangeText={value => validateBirthdate(value)}
          />

          <InputComp
            label="User Id"
            icon="id-badge"
            keyboardType="number-pad"
            error={userIdError}
            onChangeText={value => validateUserId(value)}
          />

          <InputComp
            label="Address"
            icon="map-marker-alt"
            error={addressError}
            onChangeText={value => validateAddress(value)}
          />
          {error ? (
            <View
              style={{marginTop: 30, width: '100%', alignItems: 'flex-end'}}>
              <Text style={{color: '#FF002E'}}>{error}</Text>
            </View>
          ) : null}

          <View style={{marginTop: 20}}>
            <ButtonComp
              title="SIGNUP"
              type="circle"
              loading={loading}
              onPress={() => SignUp()}
            />
          </View>

          <View
            style={{
              marginTop: 30,
              marginBottom: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{flex: 2, alignItems: 'flex-end', paddingLeft: 9}}>
              <Text style={{marginBottom: 15, fontSize: 14, fontWeight: '700'}}>
                Or Login using social media
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
              <Icon name="google" color={colors.primary} size={30} />
            </View>
          </View>
        </View>

        <AccountFooter
          isLoginScreen={false}
          onPress={() => props.navigation.navigate('Login')}
        />
      </View>
    </ScrollView>
  );
};

export default Signup;
