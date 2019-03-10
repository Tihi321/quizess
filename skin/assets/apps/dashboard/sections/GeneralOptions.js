import {__} from '@wordpress/i18n';
import {Fragment} from 'react';
import {Spinner} from '@wordpress/components';
import {DashboardConsumer} from '../containers/DashboardContext';
import {
  ToggleSwitch,
  InputRow,
  DashboardButton,
  RowContainer,
} from '../components';
import {
  MediaElement,
  TextElement,
} from '../../../elements';

const GeneralOptionsConsumer = (props) => {
  const {
    dataLoaded,
    useCustomStyle,
    handleUseCustomChange,
    handleOnSave,
    logo: {
      id,
      title,
      url,
    },
    handleOnSelectMedia,
    copyright,
    facebook,
    twitter,
    linkedIn,
    instagram,
    showGithub,
    handleCopyrightChange,
    handleFacebookChange,
    handleTwitterChange,
    handleLinkedInChange,
    handleInstagramChange,
    handleShowGithubChange,
  } = props;

  const useCustomElement = (
    <InputRow
      className="options__row"
    >
      <ToggleSwitch
        labelClass="options__label"
        idName="custom-slides"
        label={__('Use custom styles', 'quizess')}
        checked={useCustomStyle}
        onChange={handleUseCustomChange}
      />
    </InputRow>
  );

  const showGithubElement = (
    <InputRow
      className="options__row"
    >
      <ToggleSwitch
        labelClass="options__label"
        idName="custom-slides"
        label={__('Show github', 'quizess')}
        checked={showGithub}
        onChange={handleShowGithubChange}
      />
    </InputRow>
  );

  const saveButtonElement = (
    <RowContainer>
      <DashboardButton
        onClick={handleOnSave}
        size="big"
      >
        {__('Save', 'quizess')}
      </DashboardButton>
    </RowContainer>
  );

  const logoElement = (
    <InputRow
      className="options__row"
    >
      <div
        className="options__label"
      >
        {__('Logo', 'quizess')}
      </div>
      <div
        className="options__logo-wrap"
      >
        <MediaElement
          className="options__logo-element"
          mediaTitle={title}
          toolbarOnTop={false}
          mediaId={id}
          mediaUrl={url}
          onSelectMedia={handleOnSelectMedia}
        />
      </div>
    </InputRow>
  );

  /* eslint-disable */
    const footerCopyrightElement = (
      <InputRow
        className="options__row"
        >
        <div className="options__label">
          {__('Copyright', 'quizess')}
        </div>
        <div className="options__input-wrap">
          <TextElement
              styleReset={true}
              outputType='text'
              className="qz-input-mce-class"
              value={copyright}
              onChange={(text) => handleCopyrightChange(text)}
              maxChars={50}
              maxRows={1}
              warning={false}
              single={true}
              init={{
                selection_toolbar:false,
                insert_toolbar: false,
              }}
            />
        </div>
      </InputRow>
    );
    const facebookElement = (
      <InputRow
        className="options__row"
        >
        <div className="options__label">
          {__('Facebook', 'quizess')}
        </div>
        <div className="options__input-wrap">
          <TextElement
              styleReset={true}
              outputType='text'
              className="qz-input-mce-class"
              value={facebook}
              onChange={(text) => handleFacebookChange(text)}
              maxChars={50}
              maxRows={1}
              warning={false}
              single={true}
              init={{
                selection_toolbar:false,
                insert_toolbar: false,
              }}
            />
        </div>
      </InputRow>
    );
    const twitterElement = (
      <InputRow
        className="options__row"
        >
        <div className="options__label">
          {__('Twitter', 'quizess')}
        </div>
        <div className="options__input-wrap">
          <TextElement
              styleReset={true}
              outputType='text'
              className="qz-input-mce-class"
              value={twitter}
              onChange={(text) => handleTwitterChange(text)}
              maxChars={50}
              maxRows={1}
              warning={false}
              single={true}
              init={{
                selection_toolbar:false,
                insert_toolbar: false,
              }}
            />
        </div>
      </InputRow>
    );
    const linkedInElement = (
      <InputRow
        className="options__row"
        >
        <div className="options__label">
          {__('LinkedIn', 'quizess')}
        </div>
        <div className="options__input-wrap">
          <TextElement
              styleReset={true}
              outputType='text'
              className="qz-input-mce-class"
              value={linkedIn}
              onChange={(text) => handleLinkedInChange(text)}
              maxChars={50}
              maxRows={1}
              warning={false}
              single={true}
              init={{
                selection_toolbar:false,
                insert_toolbar: false,
              }}
            />
        </div>
      </InputRow>
    );
    const instagramElement = (
      <InputRow
        className="options__row"
        >
        <div className="options__label">
          {__('Instagram', 'quizess')}
        </div>
        <div className="options__input-wrap">
          <TextElement
              styleReset={true}
              outputType='text'
              className="qz-input-mce-class"
              value={instagram}
              onChange={(text) => handleInstagramChange(text)}
              maxChars={50}
              maxRows={1}
              warning={false}
              single={true}
              init={{
                selection_toolbar:false,
                insert_toolbar: false,
              }}
            />
        </div>
      </InputRow>
    );
  /* eslint-enable */

  const optionsElements = (
    <Fragment>
      <div
        className="options__general--top"
      >
        {useCustomElement}
        {showGithubElement}
        {logoElement}
        {footerCopyrightElement}
        {facebookElement}
        {twitterElement}
        {linkedInElement}
        {instagramElement}
      </div>
      <div
        className="options__general--bottom"
      >
        {saveButtonElement}
      </div>
    </Fragment>
  );

  return (
    <div
      className="options"
    >
      {(!dataLoaded) ? <Spinner /> : optionsElements}
    </div>
  );
};

const GeneralOptions = () => (
  <DashboardConsumer>
    {(value) => {
      const {
        values: {
          dataLoaded,
          useCustomStyle,
          showGithub,
          logo,
          copyright,
          facebook,
          twitter,
          linkedIn,
          instagram,
        },
        dataStore: {
          handleUseCustomChange,
          handleOnSave,
          handleOnSelectMedia,
          handleCopyrightChange,
          handleFacebookChange,
          handleTwitterChange,
          handleLinkedInChange,
          handleInstagramChange,
          handleShowGithubChange,
        },
      } = value;
      return (
        <GeneralOptionsConsumer
          dataLoaded={dataLoaded}
          logo={logo}
          facebook={facebook}
          twitter={twitter}
          linkedIn={linkedIn}
          instagram={instagram}
          copyright={copyright}
          useCustomStyle={useCustomStyle}
          showGithub={showGithub}
          handleUseCustomChange={handleUseCustomChange}
          handleOnSave={handleOnSave}
          handleOnSelectMedia={handleOnSelectMedia}
          handleCopyrightChange={handleCopyrightChange}
          handleFacebookChange={handleFacebookChange}
          handleTwitterChange={handleTwitterChange}
          handleLinkedInChange={handleLinkedInChange}
          handleInstagramChange={handleInstagramChange}
          handleShowGithubChange={handleShowGithubChange}
        />
      );
    }}
  </DashboardConsumer>
);

export default GeneralOptions;
