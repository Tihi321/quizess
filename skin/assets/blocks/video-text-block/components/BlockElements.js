import VideoElement from '../../elements/VideoElement';
import YoutubeElement from '../../elements/YoutubeElement';
import TextElement from '../../elements/TextElement';

function BlockElements(props) {
  const {
    attributes: {
      mediaId,
      mediaUrl,
      title,
      titleChecked,
      bodyContent,
      bodyContentChecked,
      sourceType,
      youtubeUrl,
      showEmbed,
      youtubeID,
    },
    dispatchAttributesStore: {
      handleOnSelectMedia,
      handleTitleOnChange,
      handleBodyOnChange,
      handleYoutubeUrlChange,
      handleShowEmbed,
    },
  } = props;

  /* eslint-disable */
  const bodyElement = (
    <TextElement
      className="body-element"
      value={bodyContent}
      onChange={(content) => handleBodyOnChange(content)}
      maxChars={350}
      single={false}
      tagName="p"
      init={{
        selection_toolbar:
        'bold italic underline | removeformat | alignleft aligncenter alignright | bullist numlist | link unlink',
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
      tagName="h1"
      init={{
        selection_toolbar:
          'bold italic underline | removeformat | alignleft aligncenter alignright | link unlink',
        insert_toolbar: false,
      }}
    />
  );
  /* eslint-enable */

  const videoElement = (
    <VideoElement
      className="media-video-parent-class"
      mediaId={mediaId}
      mediaUrl={mediaUrl}
      onSelectMedia={handleOnSelectMedia}
    />
  );

  const youtubeElement = (
    <YoutubeElement
      youtubeUrl={youtubeUrl}
      youtubeID={youtubeID}
      showEmbed={showEmbed}
      onUrlChange={handleYoutubeUrlChange}
      onEmbed={handleShowEmbed}
    />
  );

  return (
    <div className="video-block-elements">
      {(titleChecked) && (
        <div className="title-component">
          {titleElement}
        </div>
      )}
      {(sourceType === 'type-file') ? videoElement : youtubeElement}
      {(bodyContentChecked) && (
        <div className="body-component">
          {bodyElement}
        </div>
      )}
    </div>
  );
}

export default BlockElements;
