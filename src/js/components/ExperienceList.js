import React from 'react';
import Experience from './Experience';

class ExperienceList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchExperienceList } = this.props;
    
    fetchExperienceList();
  }

  render() {
    const { experiences } = this.props;

    return (
      <div className='experience-list'>
        {!isEmpty(experiences) &&
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
