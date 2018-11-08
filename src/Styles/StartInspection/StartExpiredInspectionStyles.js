import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    principal: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingTop: 6,
      backgroundColor: 'white',
    },
});
  
const buttonBox = StyleSheet.create({
    design: {
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 7,
      backgroundColor: '#DEDEDE',
      padding: 8,
      justifyContent: 'center',
      marginRight: 13,
    },
    text: {
      fontSize: 12,
      textAlign: 'center',
    },
});

export default styles;
export default buttonBox;