import React from 'react';
import Experience from './Experience';
import { fetchData, GROUP_PAGE_INDEX_EXPERIENCE_LIST } from '../actions/action';


class ExperienceList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(fetchData(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
  }

  // 透過這個生命週期階段，判斷「登入狀態」，做相對應的資料更新
  componentWillUpdate(nextProps) {
    const { dispatch, needUpdate } = nextProps;

    if (needUpdate) {
      dispatch(fetchData(GROUP_PAGE_INDEX_EXPERIENCE_LIST));
    }
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
