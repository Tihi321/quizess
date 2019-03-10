import {__} from '@wordpress/i18n';
import {Fragment} from '@wordpress/element';
import {IconButton, Toolbar} from '@wordpress/components';
import {BlockControls, MediaPlaceholder, MediaUpload} from '@wordpress/editor';

const MediaElement = (props) => {
  const {
    placeholderTitle = __('Media area', 'design-islands'),
    showToolbar = true,
    toolbarOnTop = true,
    mediaAlt,
    mediaTitle,
    mediaUrl,
    mediaId,
    className,
    onSelectMedia,
  } = props;

  const ALLOWED_MEDIA_TYPES = ['image'];

  const mediaUpload = (
    <MediaUpload
      onSelect={onSelectMedia}
      allowedTypes={ALLOWED_MEDIA_TYPES}
      value={mediaId}
      render={({open}) => (
        <IconButton
          className="components-toolbar__control"
          label={__('Edit Media', 'design-islands')}
          icon="edit"
          onClick={open}
        />
      )}
    />
  );

  const renderToolbarEditButton = () => {
    if (toolbarOnTop) {
      return (
        <BlockControls>
          <Toolbar>
            {mediaUpload}
          </Toolbar>
        </BlockControls>
      );
    }
    return (
      <Fragment>
        {mediaUpload}
      </Fragment>
    );
  };


  const renderImage = () => {
    const alt = (mediaAlt) || mediaTitle;
    return (
      <Fragment>
        {(showToolbar) && renderToolbarEditButton()}
        <figure className={className}>
          <img className="media-image-class" src={mediaUrl} alt={alt} />
        </figure>
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
        accept="image/*"
        allowedTypes={ALLOWED_MEDIA_TYPES}
      />
    );
  };

  if (mediaUrl) {
    return renderImage();
  }

  return renderPlaceholder();
};

export default MediaElement;
