import {__} from '@wordpress/i18n';
import {Fragment} from '@wordpress/element';
import {IconButton, Toolbar} from '@wordpress/components';
import {BlockControls, MediaPlaceholder, MediaUpload} from '@wordpress/editor';

const VideoElement = (props) => {
  const {
    mediaUrl,
    mediaId,
    className,
    onSelectMedia,
  } = props;

  const ALLOWED_MEDIA_TYPES = ['video'];

  const renderToolbarEditButton = () => {
    return (
      <BlockControls>
        <Toolbar>
          <MediaUpload
            onSelect={onSelectMedia}
            allowedTypes={ALLOWED_MEDIA_TYPES}
            value={mediaId}
            render={({open}) => (
              <IconButton
                className="components-toolbar__control"
                label={__('Edit Media', 'quizess')}
                icon="edit"
                onClick={open}
              />
            )}
          />
        </Toolbar>
      </BlockControls>
    );
  };

  const renderVideo = () => {
    return (
      <Fragment>
        {renderToolbarEditButton()}
        <figure className={className}>
          <video className="media-video-class" controls>
            <source src={mediaUrl} />
            {__('Your browser does not support the video tag.', 'quizess')}
          </video>
        </figure>
      </Fragment>
    );
  };

  const renderPlaceholder = () => {
    return (
      <MediaPlaceholder
        icon="format-video"
        labels={{
          title: __('Media area', 'quizess'),
        }}
        onSelect={onSelectMedia}
        accept="video/*"
        allowedTypes={ALLOWED_MEDIA_TYPES}
      />
    );
  };

  if (mediaUrl) {
    return renderVideo();
  }

  return renderPlaceholder();
};

export default VideoElement;
