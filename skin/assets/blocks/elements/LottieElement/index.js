import {__} from '@wordpress/i18n';
import {Fragment} from '@wordpress/element';
import {IconButton, Toolbar} from '@wordpress/components';
import {BlockControls, MediaPlaceholder, MediaUpload} from '@wordpress/editor';
import LottieControl from './LottieControl';

const LottieElement = (props) => {
  const {
    placeholderTitle = __('Lottie area', 'quizess'),
    preview = false,
    className = 'lottie-element-class',
    autoplay = true,
    loop = false,
    controls = true,
    mediaUrl,
    mediaId,
    onSelectMedia,
  } = props;

  const ALLOWED_MEDIA_TYPES = ['application/json'];

  const renderToolbarEditButton = (
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


  const renderLottie = () => {
    return (
      <Fragment>
        {(!preview) && renderToolbarEditButton}
        <LottieControl
          mediaUrl={mediaUrl}
          autoplay={autoplay}
          loop={loop}
          controls={controls}
          className={className}
        />
      </Fragment>
    );
  };

  const renderPlaceholder = () => {
    return (
      <MediaPlaceholder
        icon="format-image"
        labels={{
          title: placeholderTitle,
        }}
        onSelect={onSelectMedia}
        accept="application/json"
        allowedTypes={ALLOWED_MEDIA_TYPES}
      />
    );
  };

  if (mediaUrl) {
    return renderLottie();
  }
  if (!preview) {
    return renderPlaceholder();
  }
};

export default LottieElement;
