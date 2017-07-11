import fetch from 'isomorphic-fetch';

export const FETCH_PAGE_INDEX_EXPERIENCE = 'FETCH_PAGE_INDEX_EXPERIENCE';

const mock_entity_experience = {
  1: {
    id: 1,
    title: '遙望福爾摩沙的純粹，獨木舟敞洋忘憂藍海',
    image: '/assets/product1.jpg',
    price: 1599,
    favorited: false,
    host: 1
  },
  2: {
    id: 2,
    title: '遙望福爾摩沙的純粹，獨木舟敞洋忘憂藍海',
    image: '/assets/product1.jpg',
    price: 1599,
    favorited: false,
    host: 1
  },
  3: {
    id: 3,
    title: '遙望福爾摩沙的純粹，獨木舟敞洋忘憂藍海',
    image: '/assets/product1.jpg',
    price: 1599,
    favorited: false,
    host: 1
  }
};

const mock_page_index_items = {
  items: [1, 2, 3]
};


/* * * * * * * * * * * * *
 *                       *
 *    Action Creators    *
 *                       *
 * * * * * * * * * * * * */

export function fetchExperience() {
  return {
    type: FETCH_PAGE_INDEX_EXPERIENCE,
    entityExperienceList: mock_entity_experience,
    pageIndexExperienceList: mock_page_index_items
  };
}
