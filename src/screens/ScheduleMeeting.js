import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, KeyboardAvoidingView, Alert, ScrollView } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
} from 'react-native-popup-dialog';
import { EvilIcons } from '@expo/vector-icons';
// import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import Header from '../components/Header';
// import SchoolData from '../components/SchoolData';
import InvitedCounselorsData from '../components/InvitedCounselorsData';
import Button from '../components/Button';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  principal: {
    flex: 1,
    backgroundColor: 'white',
  },

  icon: {
    marginRight: 15,
  },

  button: {
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: 10,
    backgroundColor: '#FF9500',
    justifyContent: 'flex-end',
  },

  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },

  content: {
    marginBottom: 9,
    flex: 6,
    flexDirection: 'column',
  },

  Container: {
    marginTop: 15,
    marginHorizontal: 20,
  },

  Picker: {
    marginHorizontal: 15,
    width: '95%',
  },

  popUp: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },

  popUpText: {
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 20,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    height: height * 0.25,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: width * 0.05,
    textAlignVertical: 'top',
  },

  textBox: {
    margin: 1.5,
    paddingLeft: 2,
    justifyContent: 'flex-start',
  },

  text: {
    fontSize: 15,
    paddingVertical: 3,
  },

  textBoxDescription: {
    marginTop: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
  },

  textDescription: {
    marginTop: 20,
    marginLeft: 25,
    fontSize: 15,
  },

  listRegisters: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 7,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
  },

  invitedList: {
    borderColor: 'black',
    height: 250,
    borderWidth: 1.5,
    padding: 1,
    marginHorizontal: 20,
    borderRadius: 5,
  },

  dialogButtonStyle: {
    marginVertical: -16,
  },

  footerPopUp: {
    backgroundColor: '#F9F9FB',
    borderColor: '#DAD9DC',
    borderTopWidth: 0.5,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  TopListText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
  },

});

export default class ScheduleMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting: {
        date: '',
        time: '',
        listOfInvitees: this.props.listOfInvitees,
      },
    };
  }

  componentWillMount() {
    this.props.asyncGetCounselorFromGroup(this.props.counselor.profile.CAE,
      this.props.counselor.profile.cpf);
  }

  changeStyleAccordingToInput(counselor) {
    if (this.props.listOfInviteesWithCounselorInformations[counselor.nuvemCode] !== undefined) {
      return [styles.listRegisters, { borderColor: '#FF9500' }];
    }
    return styles.listRegisters;
  }

  cancelInviteList() {
    const newLists = {
      newListWithInformations: {},
      newList: {},
    };

    this.props.setNewLists(newLists);

    this.popupDialogCounselor.dismiss();
  }

  manageInvitedListState(counselor) {
    const newLists = {
      newListWithInformations: this.props.listOfInviteesWithCounselorInformations,
      newList: this.state.meeting.listOfInvitees,
    };
    // If the counselor is not at the list (undefined),
    // we will add him to the list, where its key is the counselor's nuvemCode
    if (newLists.newListWithInformations[counselor.nuvemCode] === undefined) {
      newLists.newListWithInformations[counselor.nuvemCode] = counselor;
      newLists.newList[counselor.nuvemCode] = {
        nuvemCode: counselor.nuvemCode,
        confirmed: false,
      };
      this.props.setNewLists(newLists);
    } else {
      delete newLists.newListWithInformations[counselor.nuvemCode];
      delete newLists.newList[counselor.nuvemCode];
      this.props.setNewLists(newLists);
    }
    this.forceUpdate();
  }

  deleteSpecificCounselor(counselorNuvemCode) {
    const newLists = {
      newListWithInformations: this.props.listOfInviteesWithCounselorInformations,
      newList: this.state.meeting.listOfInvitees,
    };

    delete newLists.newListWithInformations[counselorNuvemCode];
    delete newLists.newList[counselorNuvemCode];

    this.props.setNewLists(newLists);

    this.forceUpdate();
  }

  showInvitedList() {
    // Check if the Object is empty
    if (Object.keys(this.props.listOfInviteesWithCounselorInformations)
      .length !== 0) {
      return (
        <View>
          <Text style={styles.TopListText}>Lista de conselheiros convidados</Text>
          <View style={styles.invitedList}>
            <ScrollView>
              {
                Object.entries(this.props.listOfInviteesWithCounselorInformations)
                  .map(counselor => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <InvitedCounselorsData
                        key={counselor[0]}
                        {...counselor[1]}
                      />
                      <TouchableOpacity
                        onPress={() => this.deleteSpecificCounselor(counselor[0])}
                      >
                        <EvilIcons name="close" style={styles.icon} size={26} color="red" />
                      </TouchableOpacity>
                    </View>
                  ))
              }
            </ScrollView>
          </View>
        </View>
      );
    }
    return null;
  }

  renderCounselorList() {
    return (
      this.props.listOfCounselorsInAGroup.map(counselor => (
        <View style={this.changeStyleAccordingToInput(counselor)} key={counselor.nuvemCode}>
          <TouchableOpacity
            onPress={() => this.manageInvitedListState(counselor)}
          >
            <View style={styles.textBox}>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Nome: </Text>
                {counselor.name}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>CPF: </Text>
                {counselor.cpf}
              </Text>
              <Text style={styles.text}>
                <Text style={{ fontWeight: 'bold' }}>Telefone: </Text>
                {counselor.phone}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))
    );
  }


  render() {
    return (
      <View style={styles.principal}>
        <Header
          title={'AGENDAR'}
          subTitle={'REUNIÃO'}
          backButton
        />

        <PopupDialog
          ref={(popupDialogCounselor) => {
            this.popupDialogCounselor = popupDialogCounselor;
          }}
          dialogTitle={<DialogTitle title="Escolha quem deseja convidar" />}
          overlayPointerEvents="none"
          height="80%"
          width="85%"
          actions={[
            <View style={styles.footerPopUp}>
              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                text="ACEITAR"
                onPress={() => this.popupDialogCounselor.dismiss()}
                key="dialogButton1"
              />
              <DialogButton
                buttonStyle={styles.dialogButtonStyle}
                text="CANCELAR"
                onPress={() => this.cancelInviteList()}
                key="dialogButton2"
              />
            </View>,
          ]}
        >
          <ScrollView key="showInviteCounselorList">
            {this.renderCounselorList()}
          </ScrollView>
        </PopupDialog>

        <KeyboardAvoidingView style={styles.content} behavior="padding">
          <ScrollView>
            <View>
              <View style={styles.Container}>
                <TouchableOpacity
                  key="searchLocation"
                  style={styles.button}
                  onPress={() => Alert.alert('pesquisando')}
                >
                  <Text style={styles.buttonText}>Escolher Localização</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.Container, { marginVertical: 10 }]}>
                <DatePicker
                  style={styles.Picker}
                  placeholder="Data"
                  date={this.state.meeting.date}
                  mode="date"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  customStyles={{
                    dateInput: {
                      borderRadius: 7,
                    },
                  }}
                  onDateChange={date => this.setState({ meeting: { ...this.state.meeting, date } })}
                />
              </View>

              <View style={styles.Container}>
                <DatePicker
                  style={styles.Picker}
                  placeholder="Horário"
                  date={this.state.meeting.time}
                  mode="time"
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  customStyles={{
                    dateInput: {
                      borderRadius: 7,
                    },
                  }}
                  onDateChange={time => this.setState({ meeting: { ...this.state.meeting, time } })}
                />
              </View>

              <View style={styles.Container}>
                <TouchableOpacity
                  key="searchCounselorButton"
                  style={styles.button}
                  onPress={() => this.popupDialogCounselor.show()}
                >
                  <Text style={styles.buttonText}>Convidar Conselheiros</Text>
                </TouchableOpacity>
              </View>

              {this.showInvitedList()}

              <View behavior="padding">
                <Text style={styles.textDescription}>Descrição da reunião</Text>
                <View style={styles.textBoxDescription}>
                  <TextInput
                    // onChangeText={text => this.props.setFoodStockObservation(text)}
                    style={styles.textInput}
                    // value={this.props.observation}
                    multiline
                    underlineColorAndroid="transparent"
                    placeholder="opcional"
                  />
                </View>
              </View>

              <View>
                <Button
                  enabled
                  key="scheduleMeetingButton"
                  text="Agendar"
                  onPress={() => {
                    Alert.alert(
                      'Agendamento Realizado',
                      'O agendamento foi realizado com sucesso! Caso tenha convidado um agente, seu aplicativo de email abrirá.',
                      [
                        { text: 'Ok', onPress: () => Alert.alert('Agendando'), style: 'cancel' },
                      ],
                      { cancelable: false });
                  }}
                />

                {/* <Button
                  enabled={false}
                  text="Agendar"
                  key="scheduleMeetingButtonDisabled"
                  onPress={() => ({})}
                  disabled
                /> */}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const { shape, string, number, func, bool } = PropTypes;

ScheduleMeeting.propTypes = {
  asyncGetCounselorFromGroup: func.isRequired,
  setNewLists: func.isRequired,
  counselor: shape({
    token: string.isRequired,
    nuvemCode: number.isRequired,
  }).isRequired,
  listOfCounselorsInAGroup: PropTypes.arrayOf(PropTypes.shape({
    name: string.isRequired,
    cpf: string.isRequired,
    phone: string.isRequired,
  })).isRequired,
  listOfInviteesWithCounselorInformations: shape({
    nuvemCode: number.isRequired,
    name: string.isRequired,
    cpf: string.isRequired,
    phone: string.isRequired,
  }).isRequired,
  listOfInvitees: shape({
    nuvemCode: number.isRequired,
    confirmed: bool.isRequired,
  }).isRequired,
};
