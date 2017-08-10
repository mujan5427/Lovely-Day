import { connect } from 'react-redux';
import DialogWrapper from '../components/DialogWrapper';


function mapStateToProps(state) {
  return {
    displayDialogAccount: state.displayDialogAccount
  };
}

const ContainerDialogWrapper = connect(
  mapStateToProps
)(DialogWrapper);

export default ContainerDialogWrapper;
