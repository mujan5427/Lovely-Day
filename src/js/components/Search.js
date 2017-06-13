import React from 'react';
import Experience from './Experience';
import Filter from './Filter';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='content'>
        <section>
          <Experience />
        </section>
        <Filter />
      </div>
    );
  }
}

export default Search;
