import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../assets/constants/colors';

const ButtonComp = props => {
  const [textColor, setTextColor] = useState(null);
  const [BGColor, setBGColor] = useState(null);
  const [fontSize, setFontSize] = useState(null);
  const [fontWeight, setfontWeight] = useState(null);
  const [padding, setpadding] = useState(null);
  const [paddingBottom, setpaddingBottom] = useState(null);
  const [paddingTop, setpaddingTop] = useState(null);
  const [paddingLeft, setpaddingLeft] = useState(null);
  const [paddingRight, setpaddingRight] = useState(null);

  const [width, setWidth] = useState('100%');

  useEffect(() => {
    if (props.type == 'normal-circle') {
      setTextColor('black');
      setBGColor(colors.primary);
      setFontSize(12);
      setfontWeight('900');
      setWidth(120);
      setpadding(3);
    } else if (props.type == 'circle') {
      if (props.textColor != undefined) {
        setTextColor(props.textColor);
      } else {
        setTextColor('black');
      }
      setBGColor(colors.primary);
      setFontSize(16);
      setpadding(13);
      setfontWeight('900');
      setWidth(240);
    } else if (props.type == 'small') {
      setTextColor('black');
      setBGColor(colors.primary);
      setFontSize(12);
      setfontWeight('900');
      setWidth(60);
      setpadding(1);
    } else if (props.type == 'white') {
      setTextColor(colors.primary);
      setBGColor('white');
      setFontSize(16);
      setfontWeight('bold');
      setWidth(180);
      setpadding(12);
    } else {
      setTextColor('#ffffff');
      setBGColor('#fc941d');
      setFontSize(20);
      setfontWeight('600');
    }
  }, []);

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          backgroundColor: BGColor,
          flexDirection: 'row',
          width: width,
          padding: padding,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: colors.primary,
          borderWidth: 2,
        }}>
        {props.icon ? (
          <Icon name={props.icon} style={{paddingRight: 20}} size={20} />
        ) : null}

        {props.loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={{
              color: textColor,
              textAlign: 'center',
              fontSize: fontSize,
              fontWeight: fontWeight,
            }}>
            {props.title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonComp;
