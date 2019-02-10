import {RawHTML} from '@wordpress/element';

const MainQuestion = (props) => {

  return (
    <div className="question__text">
      <RawHTML>
        {props.children}
      </RawHTML>
    </div>
  );
};

export default MainQuestion;
