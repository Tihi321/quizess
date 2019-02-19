import {RawHTML} from '@wordpress/element';
import {__} from '@wordpress/i18n';

const ExplanationHeader = (props) => {
  const {
    children,
  } = props;

  return (
    <div className="explanation__header">
      <div className="explanation__title">{__('Explanation', 'quizess')}</div>
      {(children) && <RawHTML className="explanation__text">{children}</RawHTML>}
    </div>
  );
};

export default ExplanationHeader;
