import { connect } from 'react-redux';
import Profile from '../components/layout/Profile';


function getSpecifiedProps(pageProfileOfState, specifiedProps) {
  if (!isEmpty(pageProfileOfState) && !isEmpty(pageProfileOfState.content)) {
    return !isEmpty(pageProfileOfState.content[specifiedProps]) ?
    pageProfileOfState.content[specifiedProps] :
    '';
  }

  return '';
}

function getSpecifiedPartOfBirthday(birthday, specifiedProperty) {
  const year  = birthday.split('-')[0];
  const month = birthday.split('-')[1];
  const day   = birthday.split('-')[2];

  switch(specifiedProperty) {
    case 'year':
      return year;

    case 'month':
      return month;

    case 'day':
      return day;
  }
}

function getSpecifiedPartOfInterest(interest, specifiedProperty) {
  const indexOfSearchResult = interest.indexOf(specifiedProperty);

  if(indexOfSearchResult !== -1) {
    return true;
  }

  return false;
}

function mapStateToProps(state) {
  const { pageProfile } = state;

  return {
    hasLoggedIn: state.hasLoggedIn,
    firstname: getSpecifiedProps(pageProfile, 'first_name'),
    lastname: getSpecifiedProps(pageProfile, 'last_name'),
    gender: getSpecifiedProps(pageProfile, 'gender'),
    year: !isEmpty(getSpecifiedProps(pageProfile, 'birthday')) ?
    getSpecifiedPartOfBirthday(getSpecifiedProps(pageProfile, 'birthday'), 'year') :
    '',
    month: !isEmpty(getSpecifiedProps(pageProfile, 'birthday')) ?
    getSpecifiedPartOfBirthday(getSpecifiedProps(pageProfile, 'birthday'), 'month') :
    '',
    day: !isEmpty(getSpecifiedProps(pageProfile, 'birthday')) ?
    getSpecifiedPartOfBirthday(getSpecifiedProps(pageProfile, 'birthday'), 'day') :
    '',
    email: getSpecifiedProps(pageProfile, 'email'),
    language: getSpecifiedProps(pageProfile, 'language'),
    educationLevel: getSpecifiedProps(pageProfile, 'education_level'),
    sport: !isEmpty(getSpecifiedProps(pageProfile, 'interest')) ?
    getSpecifiedPartOfInterest(getSpecifiedProps(pageProfile, 'interest'), 'sport') :
    false,
    handmade: !isEmpty(getSpecifiedProps(pageProfile, 'interest')) ?
    getSpecifiedPartOfInterest(getSpecifiedProps(pageProfile, 'interest'), 'hand_made') :
    false,
    baking: !isEmpty(getSpecifiedProps(pageProfile, 'interest')) ?
    getSpecifiedPartOfInterest(getSpecifiedProps(pageProfile, 'interest'), 'baking') :
    false,
    art: !isEmpty(getSpecifiedProps(pageProfile, 'interest')) ?
    getSpecifiedPartOfInterest(getSpecifiedProps(pageProfile, 'interest'), 'art') :
    false,
    history: !isEmpty(getSpecifiedProps(pageProfile, 'interest')) ?
    getSpecifiedPartOfInterest(getSpecifiedProps(pageProfile, 'interest'), 'history') :
    false
  };
}

const ContainerProfile = connect(
  mapStateToProps
)(Profile);

export default ContainerProfile;
