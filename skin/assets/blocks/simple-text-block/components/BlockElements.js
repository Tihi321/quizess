import {Fragment} from '@wordpress/element';
import TextElement from '../../elements/TextElement';

function BlockElements(props) {
  const {
    attributes: {content, title},
    dispatchAttributesStore: {
      handleBodyOnChange,
      handleTitleOnChange,
    },
  } = props;

  const bodyElement = (
    <TextElement
      className="simple-body-class"
      value={content}
      onChange={(content) => handleBodyOnChange(content)}
      maxChars={300}
      maxRows={4}
      single={false}
      tagName="p"
    />
  );
  /* eslint-disable */
  const titleElement = (
    <TextElement
      className="simple-title-class"
      value={title}
      onChange={(title) => handleTitleOnChange(title)}
      maxChars={100}
      maxRows={2}
      single={false}
      tagName="h1"
      init={{
        selection_toolbar: 'bold italic underline | removeformat | forecolor | alignleft aligncenter alignright | link unlink',
        insert_toolbar: false,
      }}
    />
  );
  /* eslint-enable */
  return (
    <Fragment>
      <div className="body-text-item title-component">{titleElement}</div>
      <div className="body-text-item body-component">{bodyElement}</div>
    </Fragment>
  );
}

export default BlockElements;
