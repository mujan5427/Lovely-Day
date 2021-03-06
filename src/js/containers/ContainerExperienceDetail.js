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

function getRecommendationListByType(state, currentType) {
  const navigationList = state.headerNavigation.navigationList;
  const entity         = state.entities.experiences;
  var recommendationListIndex, recommendationList;

  if(!isEmpty(currentType) && !isEmpty(navigationList) && !isEmpty(entity)) {
    switch(currentType) {
      case 'outdoor':
        recommendationListIndex = navigationList['summer_camp'];
        break;

      case 'summer_camp':
        recommendationListIndex = navigationList['baking'];
        break;

      case 'baking':
        recommendationListIndex = navigationList['lover'];
        break;

      case 'lover':
        recommendationListIndex = navigationList['group'];
        break;

      case 'group':
        recommendationListIndex = navigationList['play_with_child'];
        break;

      case 'play_with_child':
        recommendationListIndex = navigationList['hand_made'];
        break;

      case 'hand_made':
        recommendationListIndex = navigationList['outdoor'];
        break;

      default:
        break;
    }

    // remove the last element of recommendationListIndex
    recommendationListIndex = recommendationListIndex.filter((item, index) => index <= 2);
    recommendationList      = recommendationListIndex.map(item => entity[item]);

    return recommendationList;
  }

  return undefined;
}

function getCarouselData(images) {
  if(!isEmpty(images)) {
    return images.map(image => ({image: image}));
  }

  return undefined;
}

function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
    displayContent: state.displayExperienceDetail.displayContent,
    displayBrief: state.displayExperienceDetail.displayBrief,
    displayCancelMethod: state.displayExperienceDetail.displayCancelMethod,
    displayReservation: state.displayExperienceDetail.displayReservation,
    selectedExperienceId: !isEmpty(state.pageExperienceDetail.selected) ? state.pageExperienceDetail.selected : undefined,
    title: getSpecifiedEntity(state, 'title'),
    price: getSpecifiedEntity(state, 'price'),
    content: getSpecifiedEntity(state, 'content'),
    brief: getSpecifiedEntity(state, 'brief'),
    cancelMethod: getSpecifiedEntity(state, 'cancel_method'),
    host: getSpecifiedEntity(state, 'host'),
    favorited: getSpecifiedEntity(state, 'favorited'),
    carousel: getCarouselData(getSpecifiedEntity(state, 'images')),
    recommendationList: getRecommendationListByType(state, getSpecifiedEntity(state, 'type'))
  };
}

const ContainerExperienceDetail = connect(
  mapStateToProps
)(ExperienceDetail);

export default ContainerExperienceDetail;
