import { combineReducers } from 'redux';
import { FETCH_PAGE_INDEX_EXPERIENCE } from '../actions/action';


function entityExperiences(state = {}, action) {
  switch(action.type) {
    case 'FETCH_PAGE_INDEX_EXPERIENCE':
      return {
        experiences: action.entityExperienceList
      };

    default:
      return state;
  }
}

function pageIndexExperienceList(state = {}, action) {
  switch(action.type) {
    case 'FETCH_PAGE_INDEX_EXPERIENCE':
      return {
        experienceList: action.pageIndexExperienceList
      };

    default:
      return state;
  }
}

const reducer = combineReducers({
  entities: entityExperiences,
  pageIndex: pageIndexExperienceList
});

export default reducer;
