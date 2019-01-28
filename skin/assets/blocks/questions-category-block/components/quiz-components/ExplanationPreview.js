import {__} from '@wordpress/i18n';
import ResponsiveEmbed from 'react-responsive-embed';
import LottieControl from '../../../elements/LottieElement/LottieControl';


const ExplanationPreview = (props) => {
  const {
    explanationType: {
      value,
    },
    children: {
      url,
      alt,
      id,
    },
  } = props;

  const imageElement = (
    <figure className="image-preview">
      <img className="media-image-class" src={url} alt={alt} />
    </figure>
  );

  const videoElement = (
    <figure className="video-preview">
      <video className="media-video-class" controls>
        <source src={url} />
        {__('Your browser does not support the video tag.', 'quizess')}
      </video>
    </figure>
  );

  const lottieElement = (
    <LottieControl
      mediaUrl={url}
      autoplay={true}
      loop={false}
      controls={false}
      className="lottie-preview"
    />
  );

  const youtubeElement = (
    <ResponsiveEmbed src={`https://www.youtube.com/embed/${id}`} allowFullScreen />
  );

  const previewElement = () => {
    switch (value) {
      case 'video':
        return videoElement;
      case 'youtube':
        return youtubeElement;
      case 'lottie':
        return lottieElement;
      default:
        return imageElement;
    }
  };

  return (
    <div className="explanation-preview">
      {previewElement()}
    </div>
  );
};

export default ExplanationPreview;
