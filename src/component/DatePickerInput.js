import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styleSheet from '../assets/constants/styleSheet';

const DatePickerInput = props => {
  const [birthdate, setbirthdate] = useState('');
  const [Calendarvisiblity, setCalendarvisiblity] = useState(false);

  const handleDateSelected = date => {
    var selected =
      date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    console.log('Date Selected is: ', selected);
    setCalendarvisiblity(false);
    setbirthdate(selected.toString());
  };
  return (
    <TouchableOpacity
      style={{flex: 1, width: '100%'}}
      onPress={() => setCalendarvisiblity(true)}>
      <View>
        <TextInput
          editable={false}
          value={birthdate}
          onChangeText={props.onChangeText}
          label={props.label}
          right={
            <TextInput.Icon
              name={() => (
                <TouchableOpacity
                  style={{flex: 1, width: '100%'}}
                  onPress={() => setCalendarvisiblity(true)}>
                  <Icon name={props.icon} size={20} color={colors.primary} />
                </TouchableOpacity>
              )}
            />
          }
          style={{fontWeight: 'bold'}}
          keyboardType="email-address"
          theme={{
            colors: {primary: 'grey', text: 'black', background: 'transparent'},
          }}></TextInput>
      </View>
      <DateTimePickerModal
        isVisible={Calendarvisiblity}
        onConfirm={date => handleDateSelected(date)}
        onDateChange={date => handleDateSelected(date)}
        onCancel={() => setCalendarvisiblity(false)}></DateTimePickerModal>
    </TouchableOpacity>
  );
};

export default DatePickerInput;
