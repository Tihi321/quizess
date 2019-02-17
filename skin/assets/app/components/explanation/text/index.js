import {RawHTML} from '@wordpress/element';
import {__} from '@wordpress/i18n';

const ExplanationText = (props) => {
  const {
    children,
  } = props;

  return (
    <div className="explanation__header">
      <div className="explanation__title">{__('Explanation', 'quizess')}</div>
      {(children) && <div className="explanation__text">
        <RawHTML>
          {children}
        </RawHTML>
      </div>}
    </div>
  );
};

export default ExplanationText;
