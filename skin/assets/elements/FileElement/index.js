import {__} from '@wordpress/i18n';
import {Fragment} from '@wordpress/element';
import {IconButton, Toolbar} from '@wordpress/components';
import {BlockControls, MediaPlaceholder, MediaUpload} from '@wordpress/editor';

const FileElement = (props) => {
  const {
    className = '',
    fileUrl = '',
    fileId,
    fileTitle = __('Download', 'quizess'),
    onSelectFile,
    types = {
      media: ['application', 'image', 'document', 'video', 'audio'],
      upload: 'image/*,video/*,audio/*,document/*',
    },
    render,
  } = props;


  const renderToolbarEditButton = () => {
    return (
      <BlockControls>
        <Toolbar>
          <MediaUpload
            onSelect={onSelectFile}
            allowedTypes={types.media}
            value={fileId}
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

  const renderFileElement = (
    <div className={className}>
      <a href={fileUrl}>{fileTitle}</a>
    </div>
  );

  const renderFileElements = () => {
    return (
      <Fragment>
        {renderToolbarEditButton()}
        {(!render) ? renderFileElement : render}
      </Fragment>
    );
  };

  const renderPlaceholder = () => {
    return (
      <MediaPlaceholder
        icon="format-image"
        labels={{
          title: __('Media area', 'quizess'),
        }}
        onSelect={onSelectFile}
        accept={types.upload}
        allowedTypes={types.media}
      />
    );
  };

  if (fileId) {
    return renderFileElements();
  }

  return renderPlaceholder();
};

export default FileElement;
