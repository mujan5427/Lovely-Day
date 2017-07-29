import { connect } from 'react-redux';
import ExperienceList from '../components/ExperienceList';


const getFilteredExperienceList = (entityExperience, seletedItem) => {
  return seletedItem.map(item => ({
    id: entityExperience[item].id,
    title: entityExperience[item].title,
    image: entityExperience[item].image,
    price: entityExperience[item].price,
    favorited: entityExperience[item].favorited
  }));
};

function mapStateToProps(state) {
  return {
    experiences: !isEmpty(state.entities) && !isEmpty(state.pageIndex) ? getFilteredExperienceList(state.entities.experiences, state.pageIndex.experienceList.items) :
    {}
  };
}

const FilteredExperienceList = connect(
  mapStateToProps
)(ExperienceList);

export default FilteredExperienceList;
