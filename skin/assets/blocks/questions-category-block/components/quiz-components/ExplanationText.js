import {RawHTML} from '@wordpress/element';
import {__} from '@wordpress/i18n';

const ExplanationText = (props) => {
  const {
    children,
  } = props;

  return (
    <div className="explanation-header">
      <div className="explanation-title">{__('Explanation', 'quizess')}</div>
      {(children) && <div className="explanation-text">
        <RawHTML>
          {children}
        </RawHTML>
      </div>}
    </div>
  );
};

export default ExplanationText;
