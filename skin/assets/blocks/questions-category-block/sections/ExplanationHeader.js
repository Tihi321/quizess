import {RawHTML} from '@wordpress/element';
import {__} from '@wordpress/i18n';

const ExplanationHeader = (props) => {
  const {
    children,
  } = props;

  return (
    <div className="explanation__header">
      <h4 className="explanation__title">{__('Explanation', 'quizess')}</h4>
      {(children) && <RawHTML className="explanation__text">{children}</RawHTML>}
    </div>
  );
};

export default ExplanationHeader;
