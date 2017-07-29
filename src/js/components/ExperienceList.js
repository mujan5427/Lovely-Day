import React from 'react';
import Experience from './Experience';
import { fetchExperience } from '../actions/action';


class ExperienceList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(fetchExperience());
  }

  render() {
    const { experiences } = this.props;

    return (
      <div className='experience-list'>
        {!isEmpty(experiences) &&
          experiences.map(experience =>
            <Experience
              key={ experience.id }
              id={ experience.id }
              image={ experience.image }
              title={ experience.title }
              price={ experience.price }
              favorited={ experience.favorited }
            />
          )
        }
      </div>
    );
  }
}

export default ExperienceList;
