import { connect } from 'react-redux';
import ExperienceList from '../components/ExperienceList';


function getExperienceList(state) {
  if(!isEmpty(state.entities.experiences) && !isEmpty(state.pageIndex.experienceList.items)) {
    const entityExperience = state.entities.experiences;
    const seletedItem      = state.pageIndex.experienceList.items;

    return seletedItem.map(item => ({
      id: entityExperience[item].id,
      title: entityExperience[item].title,
      image: entityExperience[item].images[0],
      price: entityExperience[item].price,
      favorited: entityExperience[item].favorited
    }));

  } else {
    return {};

  }
}

function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
    needUpdate: !isEmpty(state.pageIndex) ? state.pageIndex.experienceList.needUpdate : false,
    experiences: getExperienceList(state)
  };
}

const FilteredExperienceList = connect(
  mapStateToProps
)(ExperienceList);

export default FilteredExperienceList;
