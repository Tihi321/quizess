import {RawHTML} from '@wordpress/element';

const MainQuestion = (props) => {

  return (
    <div className="main-question">
      <RawHTML>
        {props.children}
      </RawHTML>
    </div>
  );
};

export default MainQuestion;
