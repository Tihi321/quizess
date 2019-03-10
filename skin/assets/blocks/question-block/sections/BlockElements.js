import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import TextElement from '../../../elements/TextElement';
import AnswersElement from './AnswersElement';
import MediaElement from '../../../elements/MediaElement';
import VideoElement from '../../../elements/VideoElement';
import YoutubeElement from '../../../elements/YoutubeElement';
import LottieElement from '../../../elements/LottieElement';
import helpers from './../../../elements/Helper/Helper';
import {BlockConsumer} from '../containers/BlockContext';

function BlockElementsConsumer(props) {
  const {
    values: {
      question,
      showExplanation,
      explanation,
      explanationMedia,
      explanationType,
      templateBlock,
      embed,
      title,
      handleQuestionChange,
      handleExplanationChange,
      handleOnSelectImage,
      handleOnSelectVideo,
      handleYoutubeChange,
      handleOnSelectLottie,
      handleEmbed,
    },
  } = props;

  const typeValue = (explanationType) ? JSON.parse(explanationType).value : '';
  const showPreview = typeof showExplanation !== 'undefined' && showExplanation;

  let explanationMediaJson = {
    url: '',
    id: '',
    alt: '',
  };

  if (explanationMedia) {
    explanationMediaJson = (typeof explanationMedia === 'string') ? JSON.parse(explanationMedia) : explanationMedia;
  }



  /* eslint-disable */
  const questionElement = (
    <TextElement
      className="body-bottom-element"
      value={question}
      outputType="text"
      onChange={(question) => handleQuestionChange(question)}
      maxChars={350}
      single={false}
      tagName="p"
      init={{
        selection_toolbar:
          'bold italic underline uppercase | removeformat | forecolor | alignleft aligncenter alignright | link unlink',
        insert_toolbar: false,
      }}
    />
  );
  const explanationElement = (
    <div className="explanation__header">
      <div className="explanation__title">{__('Explanation', 'quizess')}</div>
      <TextElement
        value={explanation}
        outputType="text"
        onChange={(explanation) => handleExplanationChange(explanation)}
        maxChars={350}
        single={false}
        tagName="p"
        init={{
          selection_toolbar:
            'bold italic underline uppercase | removeformat | forecolor | alignleft aligncenter alignright | link unlink',
          insert_toolbar: false,
        }}
      />
    </div>
  );
  /* eslint-enable */

  const imageElement = (
    <MediaElement
      className="preview-media__image"
      mediaId={explanationMediaJson.id}
      mediaUrl={explanationMediaJson.url}
      mediaAlt={explanationMediaJson.alt}
      onSelectMedia={handleOnSelectImage}
    />
  );

  const youtubeElement = (
    <YoutubeElement
      youtubeUrl={explanationMediaJson.url}
      youtubeID={explanationMediaJson.id}
      showEmbed={embed}
      onUrlChange={handleYoutubeChange}
      onEmbed={handleEmbed}
    />
  );

  const videoElement = (
    <VideoElement
      className="preview-media__video"
      mediaId={explanationMediaJson.id}
      mediaUrl={explanationMediaJson.url}
      onSelectMedia={handleOnSelectVideo}
    />
  );

  const lottieElement = (
    <LottieElement
      className="preview-media__lottie"
      mediaId={explanationMediaJson.id}
      mediaUrl={explanationMediaJson.url}
      onSelectMedia={handleOnSelectLottie}
      loop={false}
    />
  );

  const titleElement = (
    <div
      className="question__title"
    >
      {helpers.setContent(title, 'text')}
    </div>
  );

  const getPreviewElement = () => {
    let output;
    switch (typeValue) {
      case 'image':
        output = imageElement;
        break;
      case 'youtube':
        output = youtubeElement;
        break;
      case 'video':
        output = videoElement;
        break;
      case 'lottie':
        output = lottieElement;
        break;
      default:
        break;
    }

    return (
      <div className="preview-media">
        {output}
      </div>
    );
  };


  return (
    <Fragment>
      {(!templateBlock && title) && titleElement}
      {questionElement}
      <AnswersElement />
      {(showPreview) && explanationElement}
      {(showPreview && (typeValue && typeValue !== 'none')) && getPreviewElement()}
    </Fragment>
  );
}


const BlockElements = () => (
  <BlockConsumer>
    {(value) => {
      const {
        values: {
          attributes: {
            question,
            showExplanation,
            explanation,
            explanationMedia,
            explanationType,
            embed,
            templateBlock,
            title,
          },
        },
        attributesStore: {
          handleQuestionChange,
          handleExplanationChange,
          handleOnSelectImage,
          handleOnSelectVideo,
          handleYoutubeChange,
          handleEmbed,
          handleOnSelectLottie,
        },
      } = value;
      return (
        <BlockElementsConsumer
          values={{
            question,
            showExplanation,
            explanation,
            explanationMedia,
            explanationType,
            embed,
            templateBlock,
            title,
            handleQuestionChange,
            handleExplanationChange,
            handleOnSelectImage,
            handleOnSelectVideo,
            handleYoutubeChange,
            handleEmbed,
            handleOnSelectLottie,
          }}
        />
      );
    }}
  </BlockConsumer>
);

export default BlockElements;
