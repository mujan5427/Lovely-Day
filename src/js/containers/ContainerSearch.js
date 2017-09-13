import { connect } from 'react-redux';
import { hasPropertyInDeep } from '../helpers/object';
import Search from '../components/layout/Search';


function getExperienceList(state) {
  if(!isEmpty(state.entities.experiences) && hasPropertyInDeep(state.pageSearch, 'experienceList.items')) {
    const experience          = state.entities.experiences;
    const experienceListIndex = state.pageSearch.experienceList.items;

    return experienceListIndex.map(item => ({
      id: experience[item].id,
      title: experience[item].title,
      image: experience[item].images[0],
      price: experience[item].price,
      favorited: experience[item].favorited
    }));

  }

  return undefined;
}

function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
    displayFilterPickerRegion: state.displaySearch.displayFilterPickerRegion,
    displayFilterPickerType:state.displaySearch.displayFilterPickerType,
    displayDialogFilter: state.displaySearch.displayDialogFilter,
    needUpdate: !isEmpty(state.pageSearch.experienceList) ? state.pageSearch.experienceList.needUpdate : false,
    isThisLastPage: !isEmpty(state.pageSearch.experienceList) ? state.pageSearch.experienceList.isThisLastPage : undefined,
    currentPage: state.pageSearch.currentPage,
    experienceList: getExperienceList(state)
  };
}

const ContainerSearch = connect(
  mapStateToProps
)(Search);

export default ContainerSearch;
