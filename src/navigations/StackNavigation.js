import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import AccountCreated from '../screens/AccountCreated';
import Profile from '../screens/Profile';
import Checkout from '../screens/Checkout';
import BottomNavigation from './BottomNavigation';
import WishList from '../screens/WishList';
import Categories from '../screens/Categories';
import {useAuth} from '../context/AuthContext';

export default function StackNavigation() {
  const navigation = createStackNavigator();
  const {status} = useAuth();
  return (
    <>
      <navigation.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        {status === 'signOut' ? (
          <>
            <navigation.Screen
              name="Login"
              component={Login}></navigation.Screen>
            <navigation.Screen
              name="Signup"
              component={Signup}></navigation.Screen>
          </>
        ) : (
          <>
            <navigation.Screen
              name="BottomNavigation"
              component={BottomNavigation}></navigation.Screen>
            <navigation.Screen
              name="AccountCreated"
              component={AccountCreated}></navigation.Screen>
            <navigation.Screen
              name="Profile"
              component={Profile}></navigation.Screen>
            <navigation.Screen
              name="Categories"
              component={Categories}></navigation.Screen>
          </>
        )}
      </navigation.Navigator>
    </>
  );
}
