import { connect } from 'react-redux';
import Profile from '../components/layout/Profile';


function getSpecifiedProps(pageProfileOfState, specifiedProps) {
  if (!isEmpty(pageProfileOfState) && !isEmpty(pageProfileOfState.content[specifiedProps])) {
    return pageProfileOfState.content[specifiedProps];
  }

  return undefined;
}

function mapStateToProps(state) {
  const { pageProfile } = state;

  return {
    hasLoggedIn: state.hasLoggedIn,
    firstname: getSpecifiedProps(pageProfile, 'first_name'),
    lastname: getSpecifiedProps(pageProfile, 'last_name'),
    gender: getSpecifiedProps(pageProfile, 'gender'),
    birthday: getSpecifiedProps(pageProfile, 'birthday'),
    email: getSpecifiedProps(pageProfile, 'email'),
    language: getSpecifiedProps(pageProfile, 'language'),
    educationLevel: getSpecifiedProps(pageProfile, 'education_level'),
    interest: getSpecifiedProps(pageProfile, 'interest')
  };
}

const ContainerProfile = connect(
  mapStateToProps
)(Profile);

export default ContainerProfile;
