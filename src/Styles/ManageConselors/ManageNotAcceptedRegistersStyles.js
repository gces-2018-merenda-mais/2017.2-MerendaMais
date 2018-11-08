import { StyleSheet } from 'react-native';

const buttonBoxGreen = StyleSheet.create({
    design: {
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 7,
      backgroundColor: '#4CD964',
      padding: 8,
      justifyContent: 'center',
      marginRight: 13,
    },
    text: {
      fontSize: 12,
      textAlign: 'center',
    },
});
  
  const buttonBoxRed = StyleSheet.create({
    design: {
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 7,
      backgroundColor: '#FF3B30',
      padding: 8,
      justifyContent: 'center',
      marginRight: 13,
    },
    text: {
      fontSize: 12,
      textAlign: 'center',
    },
});

export default buttonBoxGreen;
export default buttonBoxRed;