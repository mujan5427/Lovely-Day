import { connect } from 'react-redux';
import Search from '../components/layout/Search';


function mapStateToProps(state) {
  return {
    hasLoggedIn: state.hasLoggedIn,
    displayFilterPickerRegion: state.displaySearch.displayFilterPickerRegion,
    displayFilterPickerType:state.displaySearch.displayFilterPickerType,
    displayDialogFilter: state.displaySearch.displayDialogFilter
  };
}

const ContainerSearch = connect(
  mapStateToProps
)(Search);

export default ContainerSearch;
