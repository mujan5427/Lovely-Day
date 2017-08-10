import React from 'react';
import ContainerLogin from '../containers/ContainerLogin';
import ContainerSignup from '../containers/ContainerSignup';


/* Why we need this wrapper component ?
 *
 * Because, we want to use `componentWillUnmount` of life cycle method in some component itself.
 * But, the only way can trigger the method is removed the component from DOM.
 *
 *
 * Notes: Return `null` or `false` can't trigger the method in some render function of component.
 */

class DialogWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { displayDialogAccount } = this.props;

    if (displayDialogAccount.displayDialogSignup) {
      return (
        <ContainerSignup />
      );
    } else if (displayDialogAccount.displayDialogLogin) {
      return (
        <ContainerLogin />
      );
    } else {
      return null;
    }

  }
}

export default DialogWrapper;
