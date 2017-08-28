import { connect } from 'react-redux';
import Index from '../components/layout/Index';


function getExperienceList(state) {
  if(!isEmpty(state.entities.experiences) && !isEmpty(state.pageIndex.experienceList.items)) {
    const experience          = state.entities.experiences;
    const experienceListIndex = state.pageIndex.experienceList.items;

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
    needUpdate: !isEmpty(state.pageIndex.experienceList) ? state.pageIndex.experienceList.needUpdate : false,
    experienceList: getExperienceList(state)
  };
}

const ContainerIndex = connect(
  mapStateToProps
)(Index);

export default ContainerIndex;
