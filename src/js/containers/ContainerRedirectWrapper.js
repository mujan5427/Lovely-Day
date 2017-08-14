import { connect } from 'react-redux';
import RedirectWrapper from '../components/RedirectWrapper';


function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn
  };
}

const ContainerRedirectWrapper = connect(
  mapStateToProps
)(RedirectWrapper);

export default ContainerRedirectWrapper;
