import {RawHTML} from '@wordpress/element';

const ExplanationText = (props) => {
  const {
    children,
  } = props;

  return (
    (children) && <div className="explanation-text">
      <RawHTML>
        {children}
      </RawHTML>
    </div>
  );
};

export default ExplanationText;
