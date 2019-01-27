import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import TextElement from '../../../elements/TextElement';

function BlockElements(props) {
  const {
    attributes: {
      link,
    },
    dispatchAttributesStore: {
      handleLinkOnChange,
    },
  } = props;

  /* eslint-disable */
  const linkElement = (
    <TextElement
      styleReset={true}
      className="qz-input-mce-class"
      value={link}
      onChange={(link) => handleLinkOnChange(link)}
      maxChars={30}
      maxRows={1}
      warning={false}
      single={true}
      init={{
        selection_toolbar: false,
        insert_toolbar: false,
      }}
    />
  );
  /* eslint-enable */

  return (
    <Fragment>
      <div className="social">
        <div className="social-label">
          <h4 className="social-label--title">{__('Social Link', 'quizess')}</h4>
          <p className="social-label--description">{__('Link to author\'s Dribble, Behance etc. profile', 'quizess')}</p>
        </div>
        {linkElement}
      </div>
    </Fragment>
  );
}

export default BlockElements;
