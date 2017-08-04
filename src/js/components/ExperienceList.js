import React from 'react';
import Experience from './Experience';
import { fetchData, addFavourite, deleteFavourite, GROUP_PAGE_INDEX_EXPERIENCE_LIST } from '../actions/action';


class ExperienceList extends React.Component {
  constructor(props) {
    super(props);

    this.toggleFavorite = this.toggleFavorite.bind(this);
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

  toggleFavorite(experienceId, favorited) {
    const { dispatch, hasLoggedIn } = this.props;

    if (!hasLoggedIn) {

      // This can be replace by using Dialog Message component
      console.log(`此操作需要先登入帳號 !`);

    } else {

      // If `favorited` is `true` executes deleteFavourite，otherwise executes addFavourite
      if (favorited) {
        dispatch(deleteFavourite(experienceId));
      } else {
        dispatch(addFavourite(experienceId));
      }
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
              toggleFavorite={ this.toggleFavorite }
            />
          )
        }
      </div>
    );
  }
}

export default ExperienceList;
