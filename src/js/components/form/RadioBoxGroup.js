import React from 'react';
import RadioBox from './RadioBox';


class RadioBoxGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  generateRadioboxList(type, selected, errorMessage) {
    var valueMappingList     = ['junior', 'senior', 'bachelor', 'master', 'doctor'];
    var characterMappingList = ['國中', '高中', '大學', '碩士', '博士'];
    var Radioboxlist         = [];

    Radioboxlist = valueMappingList.map((id, index) => {
      return <RadioBox
               type={ type }
               id={ id }
               content={ characterMappingList[index] }
               selected={ id === selected ? true : false }
               errorMessage={ errorMessage }
             />
    });

    return Radioboxlist;
  }

  render() {
    const { type, selected, errorMessage } = this.props;

    return (
      <div className='profile-form-component-group'>
        { this.generateRadioboxList(type, selected, errorMessage) }
      </div>
    );
  }
}

export default RadioBoxGroup;
