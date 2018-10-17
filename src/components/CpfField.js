import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/GeneralStyles';

const validateCpf = require('validar-cpf');

export default class CpfField extends React.Component {
  state = {
    isValid: false,
    focused: false,
    errorMessage: '',
  };

  setStyle() {
    const style = [styles.InputFieldStyle];
    if (this.state.focused) {
      if (this.state.isValid) {
        style.push(styles.inputFieldValidStyle);
      } else {
        style.push(styles.inputFieldErrorStyle);
      }
    }
    return style;
  }

  validateCpf = (cpf, callback) => {
    const validCpf = cpf.replace(/[^0-9]/g, '');
    const valid = validateCpf(validCpf);
    if (this.state.isValid !== valid) {
      this.setState({ isValid: valid });
    }

    if (!valid) {
      this.state.errorMessage = 'CPF inválido.\n';
    }
    callback(validCpf, valid);
  };
  render() {
    const { value, callback } = this.props;
    return (
      <View>
        <View style={this.setStyle()} >
          <FontAwesome name="user-circle" style={styles.icon} size={26} color="black" />
          <TextInput
            style={styles.InputStyle}
            placeholder="Digite o seu CPF"
            placeholderTextColor="#95a5a6"
            underlineColorAndroid="transparent"
            returnKeyLabel={'next'}
            maxLength={11}
            keyboardType={'numeric'}
            onChangeText={cpf => this.validateCpf(cpf, this.props.callback)}
            value={value}
            onFocus={() => this.setState({ focused: true })}
          />
        </View>

        <View style={{ opacity: !this.state.isValid ? 100 : 0 }}>
          <Text>{this.state.errorMessage}</Text>
        </View>
      </View>
    );
  }
}
CpfField.propTypes = {
  value: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
