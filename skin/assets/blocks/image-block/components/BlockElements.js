import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import MediaElement from '../../elements/MediaElement';

function BlockElements(props) {
  const {
    attributes: {
      mediaUrl,
      mediaId,
      mediaAlt,
      mediaTitle,
    },
    dispatchAttributesStore: {
      handleOnSelectMedia,
    },
  } = props;

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

  return (
    <Fragment>
      <div className="image-component">{imageElement}</div>
    </Fragment>
  );
}

export default BlockElements;
