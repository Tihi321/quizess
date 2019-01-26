import {__} from '@wordpress/i18n';
import {Component} from 'react';
import ResponsiveEmbed from 'react-responsive-embed';
import {Fragment} from '@wordpress/element';
import {IconButton, Toolbar, Button, Placeholder} from '@wordpress/components';
import {BlockControls, BlockIcon} from '@wordpress/editor';
import icon from './icon';
import helpers from './../Helper/Helper';

class YoutubeElement extends Component {
  constructor(props) {
    super(props);
    const {onEmbed} = props;

    this.state = {
      validId: true,
    };

    this.onEmbed = onEmbed;
    this.renderToolbarEditButton = this.renderToolbarEditButton.bind(this);
    this.renderPlaceholder = this.renderPlaceholder.bind(this);
    this.renderIframe = this.renderIframe.bind(this);
  }

  renderToolbarEditButton() {
    return (
      <BlockControls>
        <Toolbar>
          <IconButton
            className="components-toolbar__control"
            label={__('Edit Media', 'quizess')}
            icon="edit"
            onClick={() => {
              this.onEmbed(false);
            }}
          />
        </Toolbar>
      </BlockControls>
    );
  }

  renderIframe() {
    const {youtubeID} = this.props;
    return <Fragment>
      {this.renderToolbarEditButton()}
      <ResponsiveEmbed src={`https://www.youtube.com/embed/${youtubeID}`} allowFullScreen />
    </Fragment>;
  }

  renderPlaceholder() {
    const {youtubeUrl, onUrlChange} = this.props;
    return (
      <Placeholder
        icon={<BlockIcon icon={icon.default} showColors />}
        label="Youtube URL"
        className="wp-block-embed">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const youtubeId = helpers.youTubeGetID(youtubeUrl);
            if (youtubeId) {
              this.setState({
                validId: true,
              });
              this.onEmbed(youtubeId);
            } else {
              this.setState({
                validId: false,
              });
            }
          }}>
          <input
            type="url"
            value={youtubeUrl}
            className="components-placeholder__input"
            placeholder={__('Enter URL to embed here…', 'quizess')}
            onChange={(e) => {
              onUrlChange(e.currentTarget.value);
            }}
          />
          <Button isLarge type="submit">
            {__('Embed', 'quizess')}
          </Button>
          {!this.state.validId &&
          <p className="components-placeholder__error">{__('Sorry, we could not embed that content.', 'quizess')}</p>
          }
        </form>
      </Placeholder>
    );
  }

  render() {
    const {youtubeID, showEmbed} = this.props;
    if (showEmbed && youtubeID) {
      return this.renderIframe();
    }

    return this.renderPlaceholder();
  }
}

export default YoutubeElement;
