import {__} from '@wordpress/i18n';
import {Spinner} from '@wordpress/components';
import {Fragment} from '@wordpress/element';
import icon from './icon';
import styles from './styles';

const PlaceholderElement = (props) => {
  const {
    title = __('Placeholder text', 'quizess'),
    spinner = false,
  } = props;

  const renderPlaceholder = () => {
    return (
      <Fragment>
        <div className="block-placeholder" style={styles.wrapper}>
          <div style={styles.backgroundSvg}>
            {icon.default}
          </div>
          <div style={styles.title}>
            {title}
          </div>
          {(spinner) && <Spinner />}
        </div>
      </Fragment>
    );
  };

  return renderPlaceholder();
};

export default PlaceholderElement;
