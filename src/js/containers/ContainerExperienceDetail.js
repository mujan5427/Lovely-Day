import { connect } from 'react-redux';
import ExperienceDetail from '../components/layout/ExperienceDetail';


function mapStateToProps(state) {
  return {
    displayContent: state.pageExperienceDetail.displayContent,
    displayBrief: state.pageExperienceDetail.displayBrief,
    displayCancelMethod: state.pageExperienceDetail.displayCancelMethod
  };
}

const ContainerExperienceDetail = connect(
  mapStateToProps
)(ExperienceDetail);

export default ContainerExperienceDetail;
