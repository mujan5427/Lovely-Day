import { connect } from 'react-redux';
import ExperienceDetail from '../components/layout/ExperienceDetail';


function getSpecifiedEntity(state, propertyOfEntity) {
  const entity               = state.entities.experiences;
  const selectedExperienceId = state.pageExperienceDetail.selected;

  if(!isEmpty(selectedExperienceId) && !isEmpty(entity)) {
    return entity[selectedExperienceId][propertyOfEntity];
  }

  return undefined;
}

function mapStateToProps(state) {
  return {
    displayContent: state.pageExperienceDetail.displayContent,
    displayBrief: state.pageExperienceDetail.displayBrief,
    displayCancelMethod: state.pageExperienceDetail.displayCancelMethod,
    title: getSpecifiedEntity(state, 'title'),
    price: getSpecifiedEntity(state, 'price'),
    content: getSpecifiedEntity(state, 'content'),
    brief: getSpecifiedEntity(state, 'brief'),
    cancelMethod: getSpecifiedEntity(state, 'cancel_method'),
    images: getSpecifiedEntity(state, 'images'),
    host: getSpecifiedEntity(state, 'host'),
    favorited: getSpecifiedEntity(state, 'favorited')
  };
}

const ContainerExperienceDetail = connect(
  mapStateToProps
)(ExperienceDetail);

export default ContainerExperienceDetail;
