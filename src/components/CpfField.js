import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../Styles/GeneralStyles';


export default class CpfField extends React.Component {
  state = {
    valid: true,
  };

  validateCpf = (cpf, callback) => {
    const cpfRegex = /[0-9]{11}/g;
    const validCpf = cpf.replace(/[^0-9]/g, '');
    callback(validCpf);
    const valid = cpfRegex.test(cpf);
    if (this.state.valid !== valid) this.setState({ valid });
    if (!valid) {
      // // refactor, should be in callback
      // error = true;
      // errorMessage += 'CPF inválido.\n';
    }
  };

  render() {
    const { value, callback } = this.props;
    return (
      <View style={styles.InputFieldStyle}>
        <FontAwesome name="user-circle" style={styles.icon} size={26} color="black" />
        <TextInput
          style={ this.state.valid ? styles.InputStyle : styles.inputErrorStyle }
          placeholder="Digite o seu CPF"
          placeholderTextColor="#95a5a6"
          underlineColorAndroid="transparent"
          returnKeyLabel={'next'}
          maxLength={11}
          keyboardType={'numeric'}
          onChangeText={cpf => this.validateCpf(cpf, this.props.callback)}
          value={value}
        />
      </View>
    );
  }
}

CpfField.propTypes = {
  value: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

