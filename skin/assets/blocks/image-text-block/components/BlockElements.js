import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import MediaElement from '../../elements/MediaElement';
import TextElement from '../../elements/TextElement';
import icons from '../icons';

function BlockElements(props) {
  const {
    attributes: {
      mediaUrl,
      mediaId,
      mediaAlt,
      mediaTitle,
      title,
      bodyContent,
      bodyContentChecked,
      bottomContent,
      bottomContentChecked,
      hoursWorked,
      hoursChecked,
      fontsUsed,
      fontsChecked,
    },
    dispatchAttributesStore: {
      handleOnSelectMedia,
      handleTitleOnChange,
      handleBodyOnChange,
      handleBottomOnChange,
    },
  } = props;

  const bodyElement = (
    <TextElement
      className="body-center-element"
      value={bodyContent}
      onChange={(content) => handleBodyOnChange(content)}
      maxChars={350}
      single={false}
      tagName="p"
    />
  );

  /* eslint-disable */
  const bottomElement = (
    <TextElement
      className="body-bottom-element"
      value={bottomContent}
      onChange={(content) => handleBottomOnChange(content)}
      maxChars={110}
      single={true}
      init={{
        selection_toolbar:
          'bold italic underline | removeformat | forecolor | alignleft aligncenter alignright | link unlink',
        insert_toolbar: false,
      }}
    />
  );

  const titleElement = (
    <TextElement
      className="title-element"
      value={title}
      onChange={(title) => handleTitleOnChange(title)}
      maxChars={100}
      maxRows={2}
      single={false}
      required={true}
      tagName="h1"
      init={{
        selection_toolbar:
          'bold italic underline | removeformat | forecolor | alignleft aligncenter alignright | link unlink',
        insert_toolbar: false,
      }}
    />
  );
  /* eslint-enable */

  const imageElement = (
    <MediaElement
      className="media-image-parent-class"
      mediaTitle={mediaTitle}
      mediaId={mediaId}
      mediaUrl={mediaUrl}
      mediaAlt={mediaAlt}
      onSelectMedia={handleOnSelectMedia}
    />
  );


  const hoursWorkedElement = (
    <div className="hours-worked-element">
      {icons.hours}
      <div className="hours-title">
        {__('Time spent', 'quizess')}
      </div>
      <div className="hours-time">
        {`${hoursWorked} ${__('hours', 'quizess')}`}
      </div>
    </div>
  );

  const fontsUsedElement = (
    <div className="fonts-used-element">
      {icons.fonts}
      <div className="fonts-title">
        {__('Fonts in use', 'quizess')}
      </div>
      <div className="fonts-used">
        {fontsUsed}
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className="body-image-item image-component">{imageElement}</div>
      <div className="body-image-item body-component">
        {titleElement}
        {(hoursChecked) && hoursWorkedElement}
        {(fontsChecked) && fontsUsedElement}
        {(bodyContentChecked) && bodyElement}
        {(bottomContentChecked) && (
          <div className="bottom-item">
            {bottomElement}
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default BlockElements;
