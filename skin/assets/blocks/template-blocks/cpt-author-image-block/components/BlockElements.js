import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import MediaElement from '../../../elements/MediaElement';

function BlockElements(props) {
  const {
    attributes: {
      title,
      id,
      url,
      alt,
    },
    dispatchAttributesStore: {
      handleOnSelectMedia,
    },
  } = props;

  const imageElement = (
    <MediaElement
      className="authors-image-element"
      mediaTitle={title}
      mediaId={id}
      mediaUrl={url}
      mediaAlt={alt}
      onSelectMedia={handleOnSelectMedia}
    />
  );


  return (
    <Fragment>
      <div className="authors-label">
        <div className="authors-label--title">
          {__('Image', 'quizess')}
        </div>
        <div className="authors-label--description">
          {__('Author\'s profile image', 'quizess')}
        </div>
      </div>
      <div className="authors-image">
        {imageElement}
      </div>
    </Fragment>
  );
}

export default BlockElements;
