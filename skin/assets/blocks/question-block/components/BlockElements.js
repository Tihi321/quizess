import {Fragment} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import TextElement from '../../elements/TextElement';
import AnswersElement from './AnswersElement';
import MediaElement from '../../elements/MediaElement';
import VideoElement from '../../elements/VideoElement';
import YoutubeElement from '../../elements/YoutubeElement';
import LottieElement from '../../elements/LottieElement';
import helpers from './../../elements/Helper/Helper';
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

  const type = (explanationType) ? JSON.parse(explanationType).value : '';

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
    <div className="explanation-header">
      <div className="explanation-title">{__('Explanation', 'quizess')}</div>
      <TextElement
        className="body-bottom-element"
        value={explanation}
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
      className="image-preview"
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
      className="video-preview"
      mediaId={explanationMediaJson.id}
      mediaUrl={explanationMediaJson.url}
      onSelectMedia={handleOnSelectVideo}
    />
  );

  const lottieElement = (
    <LottieElement
      className="lottie-preview"
      mediaId={explanationMediaJson.id}
      mediaUrl={explanationMediaJson.url}
      onSelectMedia={handleOnSelectLottie}
      loop={false}
    />
  );

  const titleElement = (
    <div
      className="question-title-block"
    >
      {helpers.setContent(title, 'text')}
    </div>
  );

  const getPreviewElement = () => {
    let output;
    switch (type) {
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
      <div className="explanation-preview">
        {output}
      </div>
    );
  };


  return (
    <Fragment>
      {(!templateBlock && title) && titleElement}
      {questionElement}
      <AnswersElement />
      {(showExplanation) && explanationElement}
      {(showExplanation) && getPreviewElement()}
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
