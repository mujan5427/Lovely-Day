import React from 'react';
import Experience from './Experience';

class ExperienceList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { experiences } = this.props;

    return (
      <div className='experience-list'>
        {
          experiences.map(experience =>
            <Experience
              key={ experience.id }
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
