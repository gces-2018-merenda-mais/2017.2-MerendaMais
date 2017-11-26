import { connect } from 'react-redux';
import ScheduleMeeting from '../screens/ScheduleMeeting';
import asyncSchedulingMeeting from '../actions/schedulingMeetingActions';
import { asyncGetCounselorFromGroup, setMeetingNewLists } from '../actions/listActions';

const mapStateToProps = state => ({
  listOfCounselorsInAGroup: state.list.listOfCounselorsInAGroup,
  meetingListOfInviteesWithCounselorInformations:
    state.list.meetingListOfInviteesWithCounselorInformations,
  meetingListOfInvitees: state.list.meetingListOfInvitees,
  counselor: state.counselor,
  schedule: state.schedule,
});

const mapDispatchToProps = dispatch => ({
  asyncGetCounselorFromGroup: (CAE, CPF) => dispatch(asyncGetCounselorFromGroup(CAE, CPF)),

  asyncSchedulingMeeting: meetingData => dispatch(asyncSchedulingMeeting(meetingData)),

  setMeetingNewLists: meetingNewListWithInformations =>
    dispatch(setMeetingNewLists(meetingNewListWithInformations)),
});

const ScheduleMeetingContainer = connect(mapStateToProps, mapDispatchToProps)(ScheduleMeeting);

export default ScheduleMeetingContainer;