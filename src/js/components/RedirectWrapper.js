import React from 'react';
import { Redirect } from 'react-router-dom';
import ContainerProfile from '../containers/ContainerProfile';


/* Why we need this wrapper component ?
 *
 * Because, we want to use `hasLoggedIn` of application state.
 *
 * And, we can decide what we want display by using the state.
 */

class RedirectWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hasLoggedIn } = this.props;

    if(hasLoggedIn) {
      return (
        <ContainerProfile />
      );
    } else {

      // You can place Error Page in this line
      // or
      // Redirection to specified url directly
      return (
        <Redirect to='/' />
      );
    }

  }
}

export default RedirectWrapper;
